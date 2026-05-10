// Mock sentencing data based on U.S. Sentencing Commission patterns

export interface CaseProfile {
  offense: string;
  criminalHistory: number;
  age: number;
  race: string;
  gender: string;
  district: string;
  lawyerType: string;
  pleaType: string;
}

export interface SentencePrediction {
  predictedMonths: number;
  similarCaseMedian: number;
  gap: number;
  disparity: 'low' | 'moderate' | 'high';
}

export const offenseTypes = [
  { value: 'drug-trafficking', label: 'Drug Trafficking', baseMonths: 60 },
  { value: 'fraud', label: 'Fraud/Embezzlement', baseMonths: 24 },
  { value: 'assault', label: 'Assault', baseMonths: 36 },
  { value: 'theft', label: 'Theft/Burglary', baseMonths: 18 },
  { value: 'weapons', label: 'Weapons Offense', baseMonths: 48 },
];

export const districts = [
  { value: 'alabama', label: 'Alabama', multiplier: 1.05 },
  { value: 'alaska', label: 'Alaska', multiplier: 1.1 },
  { value: 'arizona', label: 'Arizona', multiplier: 1.15 },
  { value: 'arkansas', label: 'Arkansas', multiplier: 1.08 },
  { value: 'california', label: 'California', multiplier: 0.9 },
  { value: 'colorado', label: 'Colorado', multiplier: 0.95 },
  { value: 'connecticut', label: 'Connecticut', multiplier: 0.98 },
  { value: 'delaware', label: 'Delaware', multiplier: 1.0 },
  { value: 'florida', label: 'Florida', multiplier: 1.15 },
  { value: 'georgia', label: 'Georgia', multiplier: 1.2 },
  { value: 'hawaii', label: 'Hawaii', multiplier: 0.92 },
  { value: 'idaho', label: 'Idaho', multiplier: 1.03 },
  { value: 'illinois', label: 'Illinois', multiplier: 1.0 },
  { value: 'indiana', label: 'Indiana', multiplier: 1.06 },
  { value: 'iowa', label: 'Iowa', multiplier: 0.97 },
  { value: 'kansas', label: 'Kansas', multiplier: 1.04 },
  { value: 'kentucky', label: 'Kentucky', multiplier: 1.12 },
  { value: 'louisiana', label: 'Louisiana', multiplier: 1.25 },
  { value: 'maine', label: 'Maine', multiplier: 0.93 },
  { value: 'maryland', label: 'Maryland', multiplier: 1.02 },
  { value: 'massachusetts', label: 'Massachusetts', multiplier: 0.88 },
  { value: 'michigan', label: 'Michigan', multiplier: 1.01 },
  { value: 'minnesota', label: 'Minnesota', multiplier: 0.94 },
  { value: 'mississippi', label: 'Mississippi', multiplier: 1.22 },
  { value: 'missouri', label: 'Missouri', multiplier: 1.1 },
  { value: 'montana', label: 'Montana', multiplier: 0.99 },
  { value: 'nebraska', label: 'Nebraska', multiplier: 1.0 },
  { value: 'nevada', label: 'Nevada', multiplier: 1.07 },
  { value: 'new-hampshire', label: 'New Hampshire', multiplier: 0.91 },
  { value: 'new-jersey', label: 'New Jersey', multiplier: 0.96 },
  { value: 'new-mexico', label: 'New Mexico', multiplier: 1.09 },
  { value: 'new-york', label: 'New York', multiplier: 1.15 },
  { value: 'north-carolina', label: 'North Carolina', multiplier: 1.13 },
  { value: 'north-dakota', label: 'North Dakota', multiplier: 0.98 },
  { value: 'ohio', label: 'Ohio', multiplier: 1.05 },
  { value: 'oklahoma', label: 'Oklahoma', multiplier: 1.16 },
  { value: 'oregon', label: 'Oregon', multiplier: 0.9 },
  { value: 'pennsylvania', label: 'Pennsylvania', multiplier: 1.03 },
  { value: 'rhode-island', label: 'Rhode Island', multiplier: 0.89 },
  { value: 'south-carolina', label: 'South Carolina', multiplier: 1.18 },
  { value: 'south-dakota', label: 'South Dakota', multiplier: 1.0 },
  { value: 'tennessee', label: 'Tennessee', multiplier: 1.17 },
  { value: 'texas', label: 'Texas', multiplier: 1.35 },
  { value: 'utah', label: 'Utah', multiplier: 0.97 },
  { value: 'vermont', label: 'Vermont', multiplier: 0.85 },
  { value: 'virginia', label: 'Virginia', multiplier: 1.08 },
  { value: 'washington', label: 'Washington', multiplier: 0.92 },
  { value: 'west-virginia', label: 'West Virginia', multiplier: 1.11 },
  { value: 'wisconsin', label: 'Wisconsin', multiplier: 0.99 },
  { value: 'wyoming', label: 'Wyoming', multiplier: 1.02 },
];

export const races = [
  { value: 'white', label: 'White', multiplier: 0.85 },
  { value: 'black', label: 'Black', multiplier: 1.25 },
  { value: 'hispanic', label: 'Hispanic', multiplier: 1.15 },
  { value: 'asian', label: 'Asian', multiplier: 0.9 },
  { value: 'other', label: 'Other', multiplier: 1.0 },
];

export const lawyerTypes = [
  { value: 'private', label: 'Private Attorney', multiplier: 0.8 },
  { value: 'public', label: 'Public Defender', multiplier: 1.15 },
  { value: 'court-appointed', label: 'Court Appointed', multiplier: 1.1 },
];

export const pleaTypes = [
  { value: 'plea', label: 'Plea Deal', multiplier: 0.7 },
  { value: 'trial', label: 'Trial', multiplier: 1.3 },
];

export function predictSentence(profile: CaseProfile): SentencePrediction {
  const offense = offenseTypes.find((o) => o.value === profile.offense);
  const district = districts.find((d) => d.value === profile.district);
  const race = races.find((r) => r.value === profile.race);
  const lawyer = lawyerTypes.find((l) => l.value === profile.lawyerType);
  const plea = pleaTypes.find((p) => p.value === profile.pleaType);

  let baseMonths = offense?.baseMonths || 36;

  baseMonths *= district?.multiplier || 1;
  baseMonths *= race?.multiplier || 1;
  baseMonths *= lawyer?.multiplier || 1;
  baseMonths *= plea?.multiplier || 1;

  baseMonths += profile.criminalHistory * 6;

  if (profile.age < 25) baseMonths *= 1.05;
  if (profile.age > 50) baseMonths *= 0.95;

  if (profile.gender === 'female') baseMonths *= 0.85;

  const predictedMonths = Math.round(baseMonths);
  const baselineOffense = offense?.baseMonths || 36;
  const similarCaseMedian = Math.round(
    baselineOffense + profile.criminalHistory * 6
  );

  const gap = predictedMonths - similarCaseMedian;

  let disparity: 'low' | 'moderate' | 'high';
  if (Math.abs(gap) < 6) disparity = 'low';
  else if (Math.abs(gap) < 15) disparity = 'moderate';
  else disparity = 'high';

  return { predictedMonths, similarCaseMedian, gap, disparity };
}

export const sentenceByRaceData = [
  { id: 'race-white', race: 'White', avgMonths: 42, cases: 12450 },
  { id: 'race-black', race: 'Black', avgMonths: 58, cases: 8920 },
  { id: 'race-hispanic', race: 'Hispanic', avgMonths: 51, cases: 9340 },
  { id: 'race-asian', race: 'Asian', avgMonths: 38, cases: 2150 },
  { id: 'race-other', race: 'Other', avgMonths: 45, cases: 1840 },
];

export const sentenceByDistrictData = districts.map((district) => ({
  id: `dist-${district.value}`,
  district: district.label,
  avgMonths: Math.round(45 * district.multiplier),
  cases: Math.floor(1500 + district.multiplier * 2000),
}));

export const pleaVsTrialData = [
  { id: 'plea', type: 'Plea Deal', avgMonths: 35, cases: 28450 },
  { id: 'trial', type: 'Trial', avgMonths: 68, cases: 6250 },
];

export const disparityByOffenseData = [
  { id: 'off-drug', offense: 'Drug Trafficking', white: 52, black: 68, hispanic: 62 },
  { id: 'off-fraud', offense: 'Fraud', white: 20, black: 28, hispanic: 25 },
  { id: 'off-assault', offense: 'Assault', white: 32, black: 42, hispanic: 38 },
  { id: 'off-theft', offense: 'Theft', white: 15, black: 22, hispanic: 19 },
  { id: 'off-weapons', offense: 'Weapons', white: 42, black: 58, hispanic: 52 },
];