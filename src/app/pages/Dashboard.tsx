import { useEffect, useState } from 'react';
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

import { DistrictDisparityMap } from '../components/DistrictDisparityMap';

type Insights = {
  totalCases: number;
  sentenceByRace: any[];
  sentenceByDistrict: any[];
  sentenceByLawyer: any[];
  pleaVsTrial: any[];
  offenseDisparities: any[];
  highestDistrict: any;
  lowestDistrict: any;
  publicDefenderAverage: number;
  privateAttorneyAverage: number;
  lawyerGap: number;
};

export function Dashboard() {
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/insights')
      .then((res) => res.json())
      .then((data) => {
        setInsights(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch dashboard insights:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !insights) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">
          Loading MongoDB analytics...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                National Sentencing Analytics Dashboard
              </h1>

              <p className="text-gray-600">
                Live sentencing disparity analysis powered by MongoDB Atlas
              </p>
            </div>

            <div className="bg-emerald-100 text-emerald-900 px-4 py-2 rounded-full text-sm font-semibold">
              {insights.totalCases} Live MongoDB Cases
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
            <div className="text-sm text-red-600 mb-1">
              Highest Sentencing District
            </div>

            <div className="text-2xl font-bold text-red-900">
              {insights.highestDistrict.district}
            </div>

            <div className="text-sm text-red-700 mt-1">
              {insights.highestDistrict.avgMonths} avg months
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-green-200 p-6">
            <div className="text-sm text-green-600 mb-1">
              Lowest Sentencing District
            </div>

            <div className="text-2xl font-bold text-green-900">
              {insights.lowestDistrict.district}
            </div>

            <div className="text-sm text-green-700 mt-1">
              {insights.lowestDistrict.avgMonths} avg months
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-orange-200 p-6">
            <div className="text-sm text-orange-600 mb-1">
              Public Defender Gap
            </div>

            <div className="text-2xl font-bold text-orange-900">
              +{insights.lawyerGap} months
            </div>

            <div className="text-sm text-orange-700 mt-1">
              Compared with private attorneys
            </div>
          </div>
        </div>

        {/* National Map */}
        <div className="mb-8">
          <DistrictDisparityMap />
        </div>

        {/* Average Sentence by Race */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Average Sentence by Race
          </h2>

          <p className="text-sm text-gray-600 mb-6">
            Live racial sentencing averages calculated from MongoDB records
          </p>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={insights.sentenceByRace}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="race" />
              <YAxis label={{ value: 'Months', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />

              <Bar
                dataKey="avgMonths"
                fill="#DC2626"
                name="Average Sentence (months)"
              />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-900">
              <strong>AI Insight:</strong> Sentence lengths vary significantly
              across demographic groups and federal districts.
            </p>
          </div>
        </div>

        {/* Average Sentence by District */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Average Sentence by Federal District
          </h2>

          <p className="text-sm text-gray-600 mb-6">
            Geographic disparities generated from live MongoDB analytics
          </p>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={insights.sentenceByDistrict}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="district" />
              <YAxis label={{ value: 'Months', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />

              <Bar
                dataKey="avgMonths"
                fill="#2563EB"
                name="Average Sentence (months)"
              />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              District-level disparities reveal major regional sentencing variation.
            </p>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Plea vs Trial */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">
              Plea Deal vs Trial Outcome
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Resolution-based sentencing differences
            </p>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={insights.pleaVsTrial}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="pleaType" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="avgMonths"
                  fill="#059669"
                  name="Average Sentence"
                />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-green-900">
                Trial outcomes consistently produce longer sentences.
              </p>
            </div>
          </div>

          {/* Offense Disparities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">
              Racial Disparity by Offense
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Sentence differences across offense categories
            </p>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={insights.offenseDisparities}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="offense" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="white"
                  stroke="#94A3B8"
                  name="White"
                  strokeWidth={2}
                />

                <Line
                  type="monotone"
                  dataKey="black"
                  stroke="#DC2626"
                  name="Black"
                  strokeWidth={2}
                />

                <Line
                  type="monotone"
                  dataKey="hispanic"
                  stroke="#F59E0B"
                  name="Hispanic"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-xs text-orange-900">
                Drug trafficking and weapons cases show the largest disparities.
              </p>
            </div>
          </div>
        </div>

        {/* Data Source */}
        <div className="mt-8 p-6 bg-gray-100 rounded-lg border border-gray-300">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Live Data Infrastructure
              </h3>

              <p className="text-sm text-gray-700">
                Dashboard analytics are dynamically generated from MongoDB Atlas
                sentencing records through a Flask API backend. Gemini AI generates
                natural-language sentencing analysis explanations.
              </p>
            </div>

            <div className="text-xs text-gray-500">
              Powered by MongoDB Atlas + Gemini AI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}