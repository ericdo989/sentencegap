import { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

type DistrictData = {
  district: string;
  avgMonths: number;
  cases: number;
};

type Insights = {
  totalCases: number;
  sentenceByDistrict: DistrictData[];
  highestDistrict: DistrictData;
  lowestDistrict: DistrictData;
};

const districtToState: Record<string, string> = {
  'ny-southern': '36',
  'ca-northern': '06',
  'tx-western': '48',
  'fl-southern': '12',
  'il-northern': '17',
};

const districtLabels: Record<string, string> = {
  'ny-southern': 'NY Southern',
  'ca-northern': 'CA Northern',
  'tx-western': 'TX Western',
  'fl-southern': 'FL Southern',
  'il-northern': 'IL Northern',
};

function getColor(avgMonths: number) {
  if (avgMonths >= 70) return '#dc2626';
  if (avgMonths >= 55) return '#f97316';
  if (avgMonths >= 40) return '#facc15';
  return '#22c55e';
}

export function DistrictDisparityMap() {
  const [insights, setInsights] = useState<Insights | null>(null);
  const [selected, setSelected] = useState<DistrictData | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/insights')
      .then((res) => res.json())
      .then((data) => setInsights(data))
      .catch((err) => console.error('Failed to load insights:', err));
  }, []);

  if (!insights) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        Loading MongoDB map data...
      </div>
    );
  }

  const stateData: Record<string, DistrictData> = {};

  insights.sentenceByDistrict.forEach((district) => {
    const stateId = districtToState[district.district];
    if (stateId) {
      stateData[stateId] = district;
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            National Sentencing Disparity Map
          </h2>
          <p className="text-sm text-gray-600">
            Live district-level averages from MongoDB Atlas
          </p>
        </div>

        <div className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
          {insights.totalCases} MongoDB cases
        </div>
      </div>

      <ComposableMap projection="geoAlbersUsa" className="w-full h-auto">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const data = stateData[geo.id];

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => data && setSelected(data)}
                  style={{
                    default: {
                      fill: data ? getColor(data.avgMonths) : '#e5e7eb',
                      stroke: '#ffffff',
                      strokeWidth: 1,
                      outline: 'none',
                      cursor: data ? 'pointer' : 'default',
                    },
                    hover: {
                      fill: data ? '#991b1b' : '#d1d5db',
                      stroke: '#ffffff',
                      strokeWidth: 1,
                      outline: 'none',
                      cursor: data ? 'pointer' : 'default',
                    },
                    pressed: {
                      fill: '#7f1d1d',
                      outline: 'none',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-sm text-red-700">Highest Avg Sentence</div>
          <div className="text-lg font-semibold text-red-900">
            {districtLabels[insights.highestDistrict.district]}
          </div>
          <div className="text-sm text-red-800">
            {insights.highestDistrict.avgMonths} months
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-sm text-green-700">Lowest Avg Sentence</div>
          <div className="text-lg font-semibold text-green-900">
            {districtLabels[insights.lowestDistrict.district]}
          </div>
          <div className="text-sm text-green-800">
            {insights.lowestDistrict.avgMonths} months
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="text-sm text-gray-600">Selected District</div>
          {selected ? (
            <>
              <div className="text-lg font-semibold text-gray-900">
                {districtLabels[selected.district]}
              </div>
              <div className="text-sm text-gray-700">
                Avg: {selected.avgMonths} months · {selected.cases} cases
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-500">
              Click a colored state on the map
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-4 text-xs text-gray-600">
        <span>🟢 Low</span>
        <span>🟡 Moderate</span>
        <span>🟠 High</span>
        <span>🔴 Severe</span>
      </div>
    </div>
  );
}