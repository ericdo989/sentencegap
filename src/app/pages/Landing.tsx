import { Link } from 'react-router';
import { ArrowRight, Scale, TrendingUp, AlertTriangle } from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Scale className="w-16 h-16 text-red-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Same crime. Different justice.
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            SentenceGap exposes sentencing inequality by comparing similar criminal cases
            and showing how outcomes change across race, income, location, and charge type.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/outliers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              View Outlier Cases
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/simulator"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Try Simulator
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <h3 className="text-lg font-semibold">38% Longer</h3>
            </div>
            <p className="text-gray-600">
              Average sentence increase for similar cases when comparing defendants from different racial backgrounds
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <h3 className="text-lg font-semibold">14 Months</h3>
            </div>
            <p className="text-gray-600">
              Median sentencing gap between defendants with private attorneys vs. public defenders
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-8 h-8 text-red-600" />
              <h3 className="text-lg font-semibold">2.8x Difference</h3>
            </div>
            <p className="text-gray-600">
              Sentencing multiplier when comparing trial outcomes to plea deals for identical offense levels
            </p>
          </div>
        </div>
      </div>

      {/* Tagline Section */}
      <div className="bg-red-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-3xl font-bold mb-4">
            Same charge. Same history. Different sentence.
          </p>
          <p className="text-lg opacity-90">
            The goal is not to replace lawyers or judges, but to expose patterns
            that are usually hidden inside court data.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="font-semibold mb-2">Enter Case Details</h3>
            <p className="text-gray-600">
              Input offense type, criminal history, demographics, and location
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="font-semibold mb-2">AI Prediction</h3>
            <p className="text-gray-600">
              Our model analyzes federal sentencing data to predict likely outcomes
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="font-semibold mb-2">See the Gap</h3>
            <p className="text-gray-600">
              Compare predictions and discover how changing one factor affects the outcome
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
