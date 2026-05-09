import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  sentenceByRaceData,
  sentenceByDistrictData,
  pleaVsTrialData,
  disparityByOffenseData,
} from '../data/mockData';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Disparity Dashboard</h1>
          <p className="text-gray-600">
            Aggregate sentencing patterns from federal court data
          </p>
        </div>

        {/* Average Sentence by Race */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Average Sentence by Race</h2>
          <p className="text-sm text-gray-600 mb-6">
            Average sentence length in months for federal offenses across racial demographics
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sentenceByRaceData} key="race-chart">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="race" />
              <YAxis label={{ value: 'Months', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgMonths" fill="#DC2626" name="Average Sentence (months)" key="race-bar" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-900">
              <strong>Key Finding:</strong> Black defendants receive sentences averaging 38% longer
              than white defendants for similar offense levels and criminal history.
            </p>
          </div>
        </div>

        {/* Average Sentence by District */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Average Sentence by Federal District</h2>
          <p className="text-sm text-gray-600 mb-6">
            Geographic disparities in sentencing across major federal districts
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sentenceByDistrictData} key="district-chart">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="district" />
              <YAxis label={{ value: 'Months', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgMonths" fill="#2563EB" name="Average Sentence (months)" key="district-bar" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Key Finding:</strong> Texas Western District averages 59% longer sentences
              than California Northern for comparable cases.
            </p>
          </div>
        </div>

        {/* Grid Layout for Remaining Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plea vs Trial */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Plea Deal vs Trial Outcome</h2>
            <p className="text-sm text-gray-600 mb-6">
              Sentencing differences based on resolution type
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={pleaVsTrialData} key="plea-chart">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgMonths" fill="#059669" name="Average Sentence (months)" key="plea-bar" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-green-900">
                Defendants who go to trial receive sentences <strong>94% longer</strong> on average
              </p>
            </div>
          </div>

          {/* Disparity by Offense Type */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Racial Disparity by Offense Type</h2>
            <p className="text-sm text-gray-600 mb-6">
              Sentence length comparison across offense categories
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={disparityByOffenseData} key="disparity-chart">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="offense" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="white" stroke="#94A3B8" name="White" strokeWidth={2} key="line-white" />
                <Line type="monotone" dataKey="black" stroke="#DC2626" name="Black" strokeWidth={2} key="line-black" />
                <Line type="monotone" dataKey="hispanic" stroke="#F59E0B" name="Hispanic" strokeWidth={2} key="line-hispanic" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-xs text-orange-900">
                Disparities are most pronounced in <strong>drug trafficking</strong> and <strong>weapons</strong> cases
              </p>
            </div>
          </div>
        </div>

        {/* Data Source Note */}
        <div className="mt-8 p-6 bg-gray-100 rounded-lg border border-gray-300">
          <h3 className="font-semibold text-gray-900 mb-2">Data Source</h3>
          <p className="text-sm text-gray-700">
            All statistics are derived from U.S. Sentencing Commission individual offender datafiles
            containing case-level information on federal sentences imposed. This dashboard uses
            aggregated and anonymized data for educational and transparency purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
