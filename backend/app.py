from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from google import genai
import os
import random

load_dotenv()

app = Flask(__name__)
CORS(app)

mongo_client = MongoClient(os.getenv("MONGO_URI"))
db = mongo_client[os.getenv("DB_NAME")]
cases_collection = db["cases"]

gemini_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

offense_types = {
    "drug-trafficking": 60,
    "fraud": 24,
    "assault": 36,
    "theft": 18,
    "weapons": 48,
}

district_multipliers = {
    "ny-southern": 1.2,
    "ca-northern": 0.9,
    "tx-western": 1.4,
    "fl-southern": 1.1,
    "il-northern": 1.0,
}

race_multipliers = {
    "white": 0.85,
    "black": 1.25,
    "hispanic": 1.15,
    "asian": 0.9,
    "other": 1.0,
}

lawyer_multipliers = {
    "private": 0.8,
    "public": 1.15,
    "court-appointed": 1.1,
}

plea_multipliers = {
    "plea": 0.7,
    "trial": 1.3,
}


def calculate_prediction(profile):
    base = offense_types.get(profile["offense"], 36)

    base *= district_multipliers.get(profile["district"], 1)
    base *= race_multipliers.get(profile["race"], 1)
    base *= lawyer_multipliers.get(profile["lawyerType"], 1)
    base *= plea_multipliers.get(profile["pleaType"], 1)

    base += profile["criminalHistory"] * 6

    if profile["age"] < 25:
        base *= 1.05

    if profile["age"] > 50:
        base *= 0.95

    if profile["gender"] == "female":
        base *= 0.85

    predicted = round(base)

    median = offense_types.get(profile["offense"], 36) + (
        profile["criminalHistory"] * 6
    )

    gap = predicted - median

    if abs(gap) < 6:
        disparity = "low"
    elif abs(gap) < 15:
        disparity = "moderate"
    else:
        disparity = "high"

    return {
        "predictedMonths": predicted,
        "similarCaseMedian": median,
        "gap": gap,
        "disparity": disparity,
    }


@app.route("/")
def home():
    return jsonify({"message": "SentenceGap backend running"})


@app.route("/api/predict", methods=["POST"])
def predict():
    profile = request.json

    prediction = calculate_prediction(profile)

    similar_cases = list(
        cases_collection.find(
            {
                "offense": profile["offense"],
                "district": profile["district"],
            },
            {"_id": 0},
        ).limit(10)
    )

    prompt = f"""
Explain this sentencing disparity in simple language.

Predicted sentence:
{prediction["predictedMonths"]} months

Similar case median:
{prediction["similarCaseMedian"]} months

Gap:
{prediction["gap"]} months

Disparity level:
{prediction["disparity"]}

Use neutral language.
Do not say discrimination is proven.
"""

    try:
        response = gemini_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )
        explanation = response.text
    except Exception:
        explanation = (
            "This analysis suggests a disparity pattern "
            "compared with similar cases."
        )

    return jsonify({
        **prediction,
        "aiExplanation": explanation,
        "casesFound": len(similar_cases),
        "similarCases": similar_cases,
    })


@app.route("/api/seed")
def seed():
    offenses = ["drug-trafficking", "fraud", "assault", "theft", "weapons"]
    districts = ["ny-southern", "ca-northern", "tx-western", "fl-southern", "il-northern"]
    races = ["white", "black", "hispanic", "asian", "other"]
    genders = ["male", "female"]
    lawyer_types = ["private", "public", "court-appointed"]
    plea_types = ["plea", "trial"]

    base_sentence = {
        "drug-trafficking": 60,
        "fraud": 24,
        "assault": 36,
        "theft": 18,
        "weapons": 48,
    }

    district_factor = {
        "ny-southern": 1.15,
        "ca-northern": 0.9,
        "tx-western": 1.35,
        "fl-southern": 1.1,
        "il-northern": 1.0,
    }

    race_factor = {
        "white": 0.9,
        "black": 1.25,
        "hispanic": 1.15,
        "asian": 0.85,
        "other": 1.0,
    }

    lawyer_factor = {
        "private": 0.8,
        "public": 1.18,
        "court-appointed": 1.1,
    }

    plea_factor = {
        "plea": 0.75,
        "trial": 1.3,
    }

    sample_cases = []

    for i in range(300):
        offense = random.choice(offenses)
        district = random.choice(districts)
        race = random.choice(races)
        gender = random.choice(genders)
        lawyer = random.choice(lawyer_types)
        plea = random.choice(plea_types)
        criminal_history = random.randint(0, 6)
        age = random.randint(18, 70)

        sentence = base_sentence[offense]
        sentence *= district_factor[district]
        sentence *= race_factor[race]
        sentence *= lawyer_factor[lawyer]
        sentence *= plea_factor[plea]
        sentence += criminal_history * 6

        if age < 25:
            sentence *= 1.05

        if age > 50:
            sentence *= 0.95

        if gender == "female":
            sentence *= 0.85

        sentence += random.randint(-8, 8)
        sentence = max(1, round(sentence))

        sample_cases.append({
            "caseId": f"SG-{i + 1:04d}",
            "offense": offense,
            "district": district,
            "race": race,
            "gender": gender,
            "lawyerType": lawyer,
            "pleaType": plea,
            "criminalHistory": criminal_history,
            "age": age,
            "sentenceMonths": sentence,
        })

    cases_collection.delete_many({})
    cases_collection.insert_many(sample_cases)

    return jsonify({
        "message": "MongoDB seeded successfully with expanded dataset",
        "inserted": len(sample_cases),
    })


@app.route("/api/insights")
def insights():
    all_cases = list(cases_collection.find({}, {"_id": 0}))

    if not all_cases:
        return jsonify({"error": "No cases found"})

    def average(items):
        return round(sum(items) / len(items), 1) if items else 0

    races = sorted(set(c["race"] for c in all_cases))
    districts = sorted(set(c["district"] for c in all_cases))
    lawyer_types = sorted(set(c["lawyerType"] for c in all_cases))
    plea_types = sorted(set(c["pleaType"] for c in all_cases))
    offenses = sorted(set(c["offense"] for c in all_cases))

    sentence_by_race = []
    for race in races:
        filtered = [c for c in all_cases if c["race"] == race]
        sentence_by_race.append({
            "race": race,
            "avgMonths": average([c["sentenceMonths"] for c in filtered]),
            "cases": len(filtered),
        })

    sentence_by_district = []
    for district in districts:
        filtered = [c for c in all_cases if c["district"] == district]
        sentence_by_district.append({
            "district": district,
            "avgMonths": average([c["sentenceMonths"] for c in filtered]),
            "cases": len(filtered),
        })

    sentence_by_lawyer = []
    for lawyer in lawyer_types:
        filtered = [c for c in all_cases if c["lawyerType"] == lawyer]
        sentence_by_lawyer.append({
            "lawyerType": lawyer,
            "avgMonths": average([c["sentenceMonths"] for c in filtered]),
            "cases": len(filtered),
        })

    plea_vs_trial = []
    for plea in plea_types:
        filtered = [c for c in all_cases if c["pleaType"] == plea]
        plea_vs_trial.append({
            "pleaType": plea,
            "avgMonths": average([c["sentenceMonths"] for c in filtered]),
            "cases": len(filtered),
        })

    offense_disparities = []
    for offense in offenses:
        filtered = [c for c in all_cases if c["offense"] == offense]

        white_cases = [c for c in filtered if c["race"] == "white"]
        black_cases = [c for c in filtered if c["race"] == "black"]
        hispanic_cases = [c for c in filtered if c["race"] == "hispanic"]

        offense_disparities.append({
            "offense": offense,
            "white": average([c["sentenceMonths"] for c in white_cases]),
            "black": average([c["sentenceMonths"] for c in black_cases]),
            "hispanic": average([c["sentenceMonths"] for c in hispanic_cases]),
        })

    highest_district = max(sentence_by_district, key=lambda x: x["avgMonths"])
    lowest_district = min(sentence_by_district, key=lambda x: x["avgMonths"])

    public_cases = [c for c in all_cases if c["lawyerType"] == "public"]
    private_cases = [c for c in all_cases if c["lawyerType"] == "private"]

    public_avg = average([c["sentenceMonths"] for c in public_cases])
    private_avg = average([c["sentenceMonths"] for c in private_cases])

    lawyer_gap = round(public_avg - private_avg, 1)

    return jsonify({
        "totalCases": len(all_cases),
        "sentenceByRace": sentence_by_race,
        "sentenceByDistrict": sentence_by_district,
        "sentenceByLawyer": sentence_by_lawyer,
        "pleaVsTrial": plea_vs_trial,
        "offenseDisparities": offense_disparities,
        "highestDistrict": highest_district,
        "lowestDistrict": lowest_district,
        "publicDefenderAverage": public_avg,
        "privateAttorneyAverage": private_avg,
        "lawyerGap": lawyer_gap,
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)