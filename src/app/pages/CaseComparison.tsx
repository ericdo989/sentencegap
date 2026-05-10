import { useState } from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  type CaseProfile,
  offenseTypes,
  districts,
  races,
  lawyerTypes,
  pleaTypes,
} from '../data/mockData';

type Prediction = {
  predictedMonths: number;
  similarCaseMedian: number;
  gap: number;
  disparity: 'low' | 'moderate' | 'high';
  aiExplanation?: string;
  casesFound?: number;
  similarCases?: any[];
};

export function CaseComparison() {
  const [caseA, setCaseA] = useState<CaseProfile>({
    offense: 'drug-trafficking',
    criminalHistory: 2,
    age: 28,
    race: 'white',
    gender: 'male',
    district: 'texas',
    lawyerType: 'private',
    pleaType: 'plea',
  });

  const [caseB, setCaseB] = useState<CaseProfile>({
    offense: 'drug-trafficking',
    criminalHistory: 2,
    age: 28,
    race: 'black',
    gender: 'male',
    district: 'texas',
    lawyerType: 'public',
    pleaType: 'plea',
  });

  const [predictionA, setPredictionA] = useState<Prediction | null>(null);
  const [predictionB, setPredictionB] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);

  const updateCaseA = (field: keyof CaseProfile, value: string | number) => {
    const updated = { ...caseA, [field]: value };
    setCaseA(updated);

    if (field === 'offense' || field === 'district' || field === 'criminalHistory' || field === 'age') {
      setCaseB({ ...caseB, [field]: value });
    }
  };

  const updateCaseB = (field: keyof CaseProfile, value: string | number) => {
    setCaseB({ ...caseB, [field]: value });
  };

  const fetchPrediction = async (profile: CaseProfile) => {
    const response = await fetch('http://localhost:5000/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch prediction');
    }

    return response.json();
  };

  const compareCases = async () => {
    setLoading(true);

    try {
      const [resultA, resultB] = await Promise.all([
        fetchPrediction(caseA),
        fetchPrediction(caseB),
      ]);

      setPredictionA(resultA);
      setPredictionB(resultB);
    } catch (error) {
      console.error('Comparison failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const sentenceGap =
    predictionA && predictionB
      ? predictionB.predictedMonths - predictionA.predictedMonths
      : 0;

  const gapPercent =
    predictionA && predictionB && predictionA.predictedMonths > 0
      ? Math.round((sentenceGap / predictionA.predictedMonths) * 100)
      : 0;

  const chartData =
    predictionA && predictionB
      ? [
          {
            name: 'Case A',
            sentence: predictionA.predictedMonths,
            median: predictionA.similarCaseMedian,
          },
          {
            name: 'Case B',
            sentence: predictionB.predictedMonths,
            median: predictionB.similarCaseMedian,
          },
        ]
      : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Case Comparison
          </h1>
          <p className="text-gray-600">
            Compare two similar cases and see how sentencing outcomes change when key variables shift.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-700" />
            <p className="text-sm text-yellow-900">
              SentenceGap identifies statistical patterns, not legal proof of discrimination.
              This tool is meant to highlight disparities that may deserve further investigation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-1">Case A</h2>
            <p className="text-sm text-gray-500 mb-6">
              Baseline comparison case
            </p>

            <FormFields profile={caseA} updateProfile={updateCaseA} />

            {predictionA && (
              <ResultCard title="Case A Prediction" prediction={predictionA} />
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-1">Case B</h2>
            <p className="text-sm text-gray-500 mb-6">
              Comparison profile
            </p>

            <FormFields profile={caseB} updateProfile={updateCaseB} />

            {predictionB && (
              <ResultCard title="Case B Prediction" prediction={predictionB} />
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={compareCases}
            disabled={loading}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-semibold shadow-sm flex items-center gap-2"
          >
            {loading ? 'Analyzing...' : 'Compare Cases'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {predictionA && predictionB && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sentencing Gap Detected
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 border rounded-lg p-4">
                <div className="text-sm text-gray-600">Case A Sentence</div>
                <div className="text-3xl font-bold text-gray-900">
                  {predictionA.predictedMonths}
                  <span className="text-lg"> months</span>
                </div>
              </div>

              <div className="bg-gray-50 border rounded-lg p-4">
                <div className="text-sm text-gray-600">Case B Sentence</div>
                <div className="text-3xl font-bold text-gray-900">
                  {predictionB.predictedMonths}
                  <span className="text-lg"> months</span>
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 ${
                  sentenceGap > 0
                    ? 'bg-red-50 border-red-200'
                    : 'bg-green-50 border-green-200'
                }`}
              >
                <div
                  className={`text-sm ${
                    sentenceGap > 0 ? 'text-red-700' : 'text-green-700'
                  }`}
                >
                  Difference
                </div>

                <div
                  className={`text-3xl font-bold ${
                    sentenceGap > 0 ? 'text-red-900' : 'text-green-900'
                  }`}
                >
                  {sentenceGap > 0 ? '+' : ''}
                  {sentenceGap}
                  <span className="text-lg"> months</span>
                </div>

                <div
                  className={`text-sm ${
                    sentenceGap > 0 ? 'text-red-700' : 'text-green-700'
                  }`}
                >
                  {gapPercent > 0 ? '+' : ''}
                  {gapPercent}% compared with Case A
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Sentence Comparison Chart
              </h3>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="sentence"
                    fill="#DC2626"
                    name="Predicted Sentence"
                  />
                  <Bar
                    dataKey="median"
                    fill="#94A3B8"
                    name="Similar-Case Median"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-red-900 mb-2">
                Key Difference
              </h3>
              <p className="text-sm text-red-900">
                These two cases keep the same offense, district, criminal history, and age.
                The sentencing difference comes from changed profile variables such as race,
                legal representation, gender, or plea status.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-emerald-900 mb-2">
                Live MongoDB Lookup
              </h3>
              <p className="text-sm text-emerald-900">
                Case A matched {predictionA.casesFound ?? 0} similar database records.
                Case B matched {predictionB.casesFound ?? 0} similar database records.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">
                Gemini Explanation
              </h3>
              <p className="text-sm text-purple-900">
                {predictionB.aiExplanation ||
                  'Gemini explanation will appear here when your API key is active.'}
              </p>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Powered by MongoDB Atlas + Gemini AI
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FormFields({
  profile,
  updateProfile,
}: {
  profile: CaseProfile;
  updateProfile: (field: keyof CaseProfile, value: string | number) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SelectField
        label="Offense"
        value={profile.offense}
        options={offenseTypes}
        onChange={(value) => updateProfile('offense', value)}
      />

      <SelectField
        label="Federal District"
        value={profile.district}
        options={districts}
        onChange={(value) => updateProfile('district', value)}
      />

      <SelectField
        label="Race"
        value={profile.race}
        options={races}
        onChange={(value) => updateProfile('race', value)}
      />

      <SelectField
        label="Legal Representation"
        value={profile.lawyerType}
        options={lawyerTypes}
        onChange={(value) => updateProfile('lawyerType', value)}
      />

      <SelectField
        label="Resolution Type"
        value={profile.pleaType}
        options={pleaTypes}
        onChange={(value) => updateProfile('pleaType', value)}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gender
        </label>
        <select
          value={profile.gender}
          onChange={(e) => updateProfile('gender', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Criminal History: {profile.criminalHistory}
        </label>
        <input
          type="range"
          min="0"
          max="6"
          value={profile.criminalHistory}
          onChange={(e) =>
            updateProfile('criminalHistory', parseInt(e.target.value))
          }
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Age: {profile.age}
        </label>
        <input
          type="range"
          min="18"
          max="70"
          value={profile.age}
          onChange={(e) => updateProfile('age', parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ResultCard({
  title,
  prediction,
}: {
  title: string;
  prediction: Prediction;
}) {
  return (
    <div className="mt-6 border-t border-gray-200 pt-4">
      <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500">Predicted Sentence</div>
          <div className="text-xl font-bold text-gray-900">
            {prediction.predictedMonths} months
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500">Similar Median</div>
          <div className="text-xl font-bold text-gray-900">
            {prediction.similarCaseMedian} months
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500">Gap</div>
          <div className="text-xl font-bold text-red-700">
            {prediction.gap > 0 ? '+' : ''}
            {prediction.gap} months
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500">MongoDB Cases</div>
          <div className="text-xl font-bold text-emerald-700">
            {prediction.casesFound ?? 0}
          </div>
        </div>
      </div>
    </div>
  );
}