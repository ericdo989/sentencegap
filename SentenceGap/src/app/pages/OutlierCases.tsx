import { useState } from 'react';
import { AlertCircle, ArrowUpDown, Calendar, Scale, TrendingUp, Filter } from 'lucide-react';
import { generateOutlierCases, getDaysUntilDeadline, prioritizeCases, type OutlierCase } from '../data/outlierDetection';
import { CaseDetailModal } from '../components/CaseDetailModal';

export function OutlierCases() {
  const [cases] = useState<OutlierCase[]>(prioritizeCases(generateOutlierCases()));
  const [selectedCase, setSelectedCase] = useState<OutlierCase | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filteredCases = cases.filter((c) => {
    if (filterStatus !== 'all' && c.status !== filterStatus) return false;
    if (filterSeverity !== 'all' && c.outlierSeverity !== filterSeverity) return false;
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'extreme':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'identified':
        return 'bg-blue-100 text-blue-800';
      case 'reviewed':
        return 'bg-purple-100 text-purple-800';
      case 'referred':
        return 'bg-indigo-100 text-indigo-800';
      case 'in-progress':
        return 'bg-green-100 text-green-800';
      case 'appealed':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAppealPotentialColor = (score: number) => {
    if (score >= 85) return 'text-green-700 font-semibold';
    if (score >= 75) return 'text-blue-700 font-semibold';
    return 'text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Scale className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Outlier Cases</h1>
          </div>
          <p className="text-gray-600">
            Statistically anomalous sentences identified for NPO review and pro bono appeals
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600 mb-1">Total Outliers</div>
            <div className="text-2xl font-bold text-gray-900">{cases.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600 mb-1">Extreme Severity</div>
            <div className="text-2xl font-bold text-red-600">
              {cases.filter((c) => c.outlierSeverity === 'extreme').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600 mb-1">In Progress</div>
            <div className="text-2xl font-bold text-green-600">
              {cases.filter((c) => c.status === 'in-progress' || c.status === 'appealed').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm text-gray-600 mb-1">Urgent ({"<"}120 days)</div>
            <div className="text-2xl font-bold text-orange-600">
              {cases.filter((c) => getDaysUntilDeadline(c.appealDeadline) < 120).length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="font-semibold text-sm">Filters</span>
          </div>
          <div className="flex gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All</option>
                <option value="identified">Identified</option>
                <option value="reviewed">Reviewed</option>
                <option value="referred">Referred</option>
                <option value="in-progress">In Progress</option>
                <option value="appealed">Appealed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Severity</label>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All</option>
                <option value="extreme">Extreme</option>
                <option value="high">High</option>
                <option value="moderate">Moderate</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cases Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Case
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Sentence Gap
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Appeal Score
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCases.map((case_) => {
                  const daysLeft = getDaysUntilDeadline(case_.appealDeadline);
                  const isUrgent = daysLeft < 120;

                  return (
                    <tr key={case_.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{case_.defendantName}</div>
                        <div className="text-xs text-gray-500">{case_.docketNumber}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(
                            case_.outlierSeverity
                          )}`}
                        >
                          <AlertCircle className="w-3 h-3" />
                          {case_.outlierSeverity}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">Z-score: {case_.zScore.toFixed(1)}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-red-600" />
                          <span className="font-semibold text-red-700">+{case_.deviation} mo</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {case_.actualSentenceMonths} vs {case_.predictedMonths} expected
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`text-lg font-bold ${getAppealPotentialColor(case_.appealPotential)}`}>
                          {case_.appealPotential}
                          <span className="text-xs text-gray-500">/100</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-500" />
                          <span className={`text-sm ${isUrgent ? 'text-orange-700 font-semibold' : 'text-gray-700'}`}>
                            {daysLeft} days
                          </span>
                        </div>
                        {isUrgent && (
                          <span className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 bg-orange-100 text-orange-800 rounded text-xs font-medium">
                            Urgent
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                          {case_.status}
                        </span>
                        {case_.assignedNPO && (
                          <div className="text-xs text-gray-600 mt-1">{case_.assignedNPO}</div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedCase(case_)}
                          className="px-3 py-1.5 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">How Outlier Detection Works</h3>
          <p className="text-sm text-blue-800 mb-3">
            Our system identifies cases where the actual sentence significantly exceeds the predicted
            sentence based on offense type, criminal history, and other legally relevant factors.
          </p>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>
              <strong>Z-score ≥ 3.0:</strong> Extreme outlier (3+ standard deviations above expected)
            </li>
            <li>
              <strong>Z-score 2.5-3.0:</strong> High outlier (significant deviation)
            </li>
            <li>
              <strong>Appeal Potential:</strong> Combines statistical severity, trial penalty, representation
              type, and demographic factors to estimate appeal viability
            </li>
          </ul>
        </div>
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <CaseDetailModal case_={selectedCase} onClose={() => setSelectedCase(null)} />
      )}
    </div>
  );
}
