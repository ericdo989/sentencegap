import { useState } from 'react';
import { AlertCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import {
  type CaseProfile,
  offenseTypes,
  districts,
  races,
  lawyerTypes,
  pleaTypes,
  predictSentence,
} from '../data/mockData';

export function Simulator() {
  const [profile, setProfile] = useState<CaseProfile>({
    offense: 'drug-trafficking',
    criminalHistory: 2,
    age: 28,
    race: 'white',
    gender: 'male',
    district: 'ny-southern',
    lawyerType: 'private',
    pleaType: 'plea',
  });

  const prediction = predictSentence(profile);

  const updateProfile = (field: keyof CaseProfile, value: string | number) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Justice Simulator</h1>
          <p className="text-gray-600">
            Change one variable at a time and watch how sentence predictions change
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Case Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Offense Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Offense Type
                </label>
                <select
                  value={profile.offense}
                  onChange={(e) => updateProfile('offense', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {offenseTypes.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Criminal History */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Criminal History Points: {profile.criminalHistory}
                </label>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="1"
                  value={profile.criminalHistory}
                  onChange={(e) => updateProfile('criminalHistory', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0 (None)</span>
                  <span>6 (Extensive)</span>
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age: {profile.age}
                </label>
                <input
                  type="range"
                  min="18"
                  max="70"
                  step="1"
                  value={profile.age}
                  onChange={(e) => updateProfile('age', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>18</span>
                  <span>70</span>
                </div>
              </div>

              {/* Race */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Race
                </label>
                <select
                  value={profile.race}
                  onChange={(e) => updateProfile('race', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {races.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={profile.gender}
                  onChange={(e) => updateProfile('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Federal District
                </label>
                <select
                  value={profile.district}
                  onChange={(e) => updateProfile('district', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {districts.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lawyer Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Legal Representation
                </label>
                <select
                  value={profile.lawyerType}
                  onChange={(e) => updateProfile('lawyerType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {lawyerTypes.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Plea Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolution Type
                </label>
                <select
                  value={profile.pleaType}
                  onChange={(e) => updateProfile('pleaType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {pleaTypes.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Prediction Output */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Prediction</h2>

              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-1">Predicted Sentence</div>
                <div className="text-4xl font-bold text-gray-900">
                  {prediction.predictedMonths} <span className="text-xl">months</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  ({(prediction.predictedMonths / 12).toFixed(1)} years)
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="text-sm text-gray-600 mb-1">Similar-Case Median</div>
                <div className="text-2xl font-semibold text-gray-700">
                  {prediction.similarCaseMedian} months
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Sentencing Gap</span>
                  <div className="flex items-center gap-1">
                    {prediction.gap > 0 ? (
                      <TrendingUp className="w-4 h-4 text-red-600" />
                    ) : prediction.gap < 0 ? (
                      <TrendingDown className="w-4 h-4 text-green-600" />
                    ) : (
                      <Minus className="w-4 h-4 text-gray-400" />
                    )}
                    <span
                      className={`text-lg font-semibold ${
                        prediction.gap > 0
                          ? 'text-red-600'
                          : prediction.gap < 0
                          ? 'text-green-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {prediction.gap > 0 ? '+' : ''}
                      {prediction.gap} months
                    </span>
                  </div>
                </div>

                <div
                  className={`mt-4 p-3 rounded-lg ${
                    prediction.disparity === 'high'
                      ? 'bg-red-50 border border-red-200'
                      : prediction.disparity === 'moderate'
                      ? 'bg-orange-50 border border-orange-200'
                      : 'bg-green-50 border border-green-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle
                      className={`w-5 h-5 mt-0.5 ${
                        prediction.disparity === 'high'
                          ? 'text-red-600'
                          : prediction.disparity === 'moderate'
                          ? 'text-orange-600'
                          : 'text-green-600'
                      }`}
                    />
                    <div>
                      <div className="font-semibold text-sm mb-1">
                        {prediction.disparity === 'high'
                          ? 'High Disparity Detected'
                          : prediction.disparity === 'moderate'
                          ? 'Moderate Disparity'
                          : 'Low Disparity'}
                      </div>
                      <div className="text-xs text-gray-700">
                        {prediction.disparity === 'high'
                          ? 'This profile shows significant sentencing differences compared to similar cases.'
                          : prediction.disparity === 'moderate'
                          ? 'Notable differences exist compared to the median for similar cases.'
                          : 'Predicted sentence is close to the median for similar cases.'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experiment Suggestions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Try This</h3>
          <p className="text-sm text-blue-800">
            Change only the <strong>race</strong> or <strong>district</strong> and watch how the predicted sentence changes.
            This is the core insight of SentenceGap: revealing how identical cases can receive different outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}
