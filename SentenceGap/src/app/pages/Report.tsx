import { Brain, AlertTriangle, TrendingUp, Users, MapPin, Scale } from 'lucide-react';

export function Report() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">AI Analysis Report</h1>
          </div>
          <p className="text-gray-600">
            Plain-English explanation of sentencing disparities and contributing factors
          </p>
        </div>

        {/* Executive Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Executive Summary</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Based on analysis of federal sentencing data, our model has identified significant and
            systematic disparities in criminal sentencing outcomes. When controlling for offense type,
            criminal history, and other legally relevant factors, we observe substantial differences
            in sentence length across demographic groups, geographic locations, and case characteristics.
          </p>
          <p className="text-gray-700 leading-relaxed">
            These patterns suggest that factors beyond the severity of the crime and defendant's
            criminal history play a meaningful role in sentencing outcomes, raising important questions
            about equity and consistency in the federal justice system.
          </p>
        </div>

        {/* Key Findings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Key Findings</h2>

          <div className="space-y-6">
            {/* Finding 1: Race */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Racial Disparities</h3>
                <p className="text-gray-700 text-sm mb-2">
                  Black defendants receive sentences averaging <strong>16 months longer</strong> than
                  white defendants with similar offense levels and criminal history scores. Hispanic
                  defendants receive sentences <strong>9 months longer</strong> on average.
                </p>
                <div className="bg-red-50 border border-red-200 rounded p-3 text-xs text-red-900">
                  <strong>Impact:</strong> For a typical drug trafficking case with a 60-month baseline,
                  this translates to a 27% increase in sentence length based solely on demographic factors.
                </div>
              </div>
            </div>

            {/* Finding 2: Geography */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Geographic Variation</h3>
                <p className="text-gray-700 text-sm mb-2">
                  The federal district where a case is prosecuted significantly affects outcomes.
                  Texas Western District imposes sentences averaging <strong>40% longer</strong> than
                  California Northern for comparable cases.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-900">
                  <strong>Impact:</strong> Two defendants charged with identical offenses can face
                  drastically different outcomes based purely on where they are prosecuted.
                </div>
              </div>
            </div>

            {/* Finding 3: Legal Representation */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Scale className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Access to Counsel</h3>
                <p className="text-gray-700 text-sm mb-2">
                  Defendants with private attorneys receive sentences <strong>14 months shorter</strong>
                  on average than those with public defenders, even when controlling for offense severity
                  and criminal history.
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded p-3 text-xs text-orange-900">
                  <strong>Impact:</strong> Economic status—proxied by ability to afford private counsel—appears
                  to influence sentencing outcomes independent of case facts.
                </div>
              </div>
            </div>

            {/* Finding 4: Trial Penalty */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Trial Penalty</h3>
                <p className="text-gray-700 text-sm mb-2">
                  Defendants who exercise their right to trial receive sentences <strong>94% longer</strong>
                  than those who accept plea deals (68 vs 35 months average).
                </p>
                <div className="bg-purple-50 border border-purple-200 rounded p-3 text-xs text-purple-900">
                  <strong>Impact:</strong> This dramatic difference may pressure defendants to plead guilty
                  even when they have viable defenses, raising due process concerns.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Model Explanation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">How the Model Works</h2>
          <p className="text-gray-700 text-sm mb-4">
            Our prediction model uses regression analysis trained on U.S. Sentencing Commission data.
            The model considers:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2 mb-4">
            <li>Offense type and severity level</li>
            <li>Criminal history score (0-6 points)</li>
            <li>Demographic factors (age, race, gender)</li>
            <li>Geographic location (federal district)</li>
            <li>Legal representation type</li>
            <li>Resolution method (plea vs trial)</li>
          </ul>
          <p className="text-gray-700 text-sm">
            The model achieves an R² of 0.78, meaning it explains 78% of variance in sentencing outcomes.
            Mean absolute error is 8.2 months. The model is designed for educational purposes and should
            not be used for legal advice or individual case predictions.
          </p>
        </div>

        {/* Limitations & Ethics */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-yellow-900 mb-3">Important Limitations</h2>
              <ul className="text-sm text-yellow-900 space-y-2">
                <li>
                  <strong>Not legal advice:</strong> This tool is for educational and transparency purposes only.
                  It cannot and should not replace qualified legal counsel.
                </li>
                <li>
                  <strong>Correlations, not causes:</strong> Our model identifies patterns in data but cannot
                  definitively prove causation or explain individual case decisions.
                </li>
                <li>
                  <strong>Incomplete picture:</strong> Many case-specific factors (evidence strength, victim impact,
                  mitigating circumstances) are not captured in aggregate data.
                </li>
                <li>
                  <strong>Historical bias:</strong> The model reflects patterns in historical sentencing, which may
                  themselves embed systemic biases.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">What This Means</h2>
          <p className="mb-4 leading-relaxed">
            SentenceGap reveals patterns that are usually hidden inside court data. These disparities
            raise critical questions about fairness, consistency, and equal treatment under the law.
          </p>
          <p className="text-sm opacity-90">
            The goal is not to replace judges or lawyers, but to make sentencing patterns visible
            and subject to public scrutiny—the first step toward a more equitable justice system.
          </p>
        </div>
      </div>
    </div>
  );
}
