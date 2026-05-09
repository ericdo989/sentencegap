import { X, Calendar, AlertCircle, TrendingUp, MapPin, Scale, User, Briefcase } from 'lucide-react';
import { type OutlierCase, getDaysUntilDeadline } from '../data/outlierDetection';
import { offenseTypes } from '../data/mockData';

interface CaseDetailModalProps {
  case_: OutlierCase;
  onClose: () => void;
}

export function CaseDetailModal({ case_, onClose }: CaseDetailModalProps) {
  const daysLeft = getDaysUntilDeadline(case_.appealDeadline);
  const isUrgent = daysLeft < 120;

  const offenseLabel = offenseTypes.find((o) => o.value === case_.offense)?.label || case_.offense;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{case_.defendantName}</h2>
            <p className="text-sm text-gray-600">{case_.docketNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Appeal Urgency Banner */}
          {isUrgent && (
            <div className="mb-6 bg-orange-50 border-l-4 border-orange-600 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-orange-900">Urgent: Appeal Deadline Approaching</h3>
                  <p className="text-sm text-orange-800 mt-1">
                    Only <strong>{daysLeft} days</strong> remaining until appeal deadline ({case_.appealDeadline})
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-sm text-red-700 mb-1">Sentence Gap</div>
              <div className="text-3xl font-bold text-red-800">+{case_.deviation} mo</div>
              <div className="text-xs text-red-600 mt-1">
                {case_.actualSentenceMonths} actual vs {case_.predictedMonths} expected
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="text-sm text-purple-700 mb-1">Outlier Severity</div>
              <div className="text-3xl font-bold text-purple-800 capitalize">{case_.outlierSeverity}</div>
              <div className="text-xs text-purple-600 mt-1">Z-score: {case_.zScore.toFixed(2)}</div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-sm text-green-700 mb-1">Appeal Potential</div>
              <div className="text-3xl font-bold text-green-800">
                {case_.appealPotential}
                <span className="text-xl">/100</span>
              </div>
              <div className="text-xs text-green-600 mt-1">
                {case_.appealPotential >= 85 ? 'Very High' : case_.appealPotential >= 75 ? 'High' : 'Moderate'}
              </div>
            </div>
          </div>

          {/* Case Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Case Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Scale className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-600">Offense</div>
                  <div className="font-medium text-gray-900">{offenseLabel}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-600">District</div>
                  <div className="font-medium text-gray-900 capitalize">{case_.district.replace('-', ' ')}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-600">Demographics</div>
                  <div className="font-medium text-gray-900">
                    {case_.age} years old, {case_.race}, {case_.gender}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-600">Legal Representation</div>
                  <div className="font-medium text-gray-900 capitalize">{case_.lawyerType.replace('-', ' ')}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-600">Criminal History</div>
                  <div className="font-medium text-gray-900">{case_.criminalHistory} points</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-600">Sentence Date</div>
                  <div className="font-medium text-gray-900">{case_.sentenceDate}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Scale className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-600">Resolution Type</div>
                  <div className="font-medium text-gray-900 capitalize">{case_.pleaType}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-600">Appeal Deadline</div>
                  <div className={`font-medium ${isUrgent ? 'text-orange-700' : 'text-gray-900'}`}>
                    {case_.appealDeadline} ({daysLeft} days)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why This Case is an Outlier */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-blue-900 mb-3">Why This Case is an Outlier</h3>
            <p className="text-sm text-blue-800 mb-3">
              Based on similar cases with the same offense type ({offenseLabel}) and criminal history
              ({case_.criminalHistory} points), the expected sentence was approximately{' '}
              <strong>{case_.predictedMonths} months</strong>. However, {case_.defendantName} received{' '}
              <strong>{case_.actualSentenceMonths} months</strong> — a difference of{' '}
              <strong>+{case_.deviation} months</strong>.
            </p>
            <p className="text-sm text-blue-800">
              This represents a <strong>{case_.zScore.toFixed(1)} standard deviation</strong> from the expected
              outcome, making it a statistically significant outlier. Contributing factors may include:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-blue-800">
              {case_.pleaType === 'trial' && (
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>
                    <strong>Trial Penalty:</strong> Went to trial instead of accepting a plea deal, which
                    correlates with sentences ~94% longer
                  </span>
                </li>
              )}
              {(case_.race === 'black' || case_.race === 'hispanic') && (
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>
                    <strong>Demographic Disparity:</strong> {case_.race} defendants receive sentences averaging
                    38% longer than white defendants in similar cases
                  </span>
                </li>
              )}
              {(case_.lawyerType === 'public' || case_.lawyerType === 'court-appointed') && (
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>
                    <strong>Legal Representation:</strong> {case_.lawyerType === 'public' ? 'Public defender' : 'Court-appointed attorney'} representation
                    correlates with longer sentences vs. private counsel
                  </span>
                </li>
              )}
              {(case_.district === 'tx-western' || case_.district === 'fl-southern') && (
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>
                    <strong>Geographic Disparity:</strong> {case_.district.replace('-', ' ')} district
                    shows higher-than-average sentences for comparable cases
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Status & Assignment */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Status & Assignment</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Current Status: </span>
                <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                  {case_.status}
                </span>
              </div>
              {case_.assignedNPO && (
                <div>
                  <span className="text-sm text-gray-600">Assigned NPO: </span>
                  <span className="font-medium text-gray-900">{case_.assignedNPO}</span>
                </div>
              )}
              {case_.assignedLawyer && (
                <div>
                  <span className="text-sm text-gray-600">Assigned Attorney: </span>
                  <span className="font-medium text-gray-900">{case_.assignedLawyer}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              Refer to NPO
            </button>
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Match with Lawyer
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Add Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
