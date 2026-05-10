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

// Offense types with base sentence ranges
export const offenseTypes = [
  { value: 'drug-trafficking', label: 'Drug Trafficking', baseMonths: 60 },
  { value: 'fraud', label: 'Fraud/Embezzlement', baseMonths: 24 },
  { value: 'assault', label: 'Assault', baseMonths: 36 },
  { value: 'theft', label: 'Theft/Burglary', baseMonths: 18 },
  { value: 'weapons', label: 'Weapons Offense', baseMonths: 48 },
];

export const districts = [
  { value: 'ny-southern', label: 'New York Southern', multiplier: 1.2 },
  { value: 'ca-northern', label: 'California Northern', multiplier: 0.9 },
  { value: 'tx-western', label: 'Texas Western', multiplier: 1.4 },
  { value: 'fl-southern', label: 'Florida Southern', multiplier: 1.1 },
  { value: 'il-northern', label: 'Illinois Northern', multiplier: 1.0 },
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

// Calculate predicted sentence based on profile
export function predictSentence(profile: CaseProfile): SentencePrediction {
  const offense = offenseTypes.find(o => o.value === profile.offense);
  const district = districts.find(d => d.value === profile.district);
  const race = races.find(r => r.value === profile.race);
  const lawyer = lawyerTypes.find(l => l.value === profile.lawyerType);
  const plea = pleaTypes.find(p => p.value === profile.pleaType);

  let baseMonths = offense?.baseMonths || 36;

  // Apply multipliers
  baseMonths *= district?.multiplier || 1;
  baseMonths *= race?.multiplier || 1;
  baseMonths *= lawyer?.multiplier || 1;
  baseMonths *= plea?.multiplier || 1;

  // Criminal history adds months
  baseMonths += profile.criminalHistory * 6;

  // Age factor (younger defendants often get slightly longer sentences in data)
  if (profile.age < 25) baseMonths *= 1.05;
  if (profile.age > 50) baseMonths *= 0.95;

  // Gender factor
  if (profile.gender === 'female') baseMonths *= 0.85;

  const predictedMonths = Math.round(baseMonths);

  // Calculate similar case median (neutral baseline)
  const baselineOffense = offense?.baseMonths || 36;
  const similarCaseMedian = Math.round(baselineOffense + (profile.criminalHistory * 6));

  const gap = predictedMonths - similarCaseMedian;

  let disparity: 'low' | 'moderate' | 'high';
  if (Math.abs(gap) < 6) disparity = 'low';
  else if (Math.abs(gap) < 15) disparity = 'moderate';
  else disparity = 'high';

  return { predictedMonths, similarCaseMedian, gap, disparity };
}

// Dashboard chart data
export const sentenceByRaceData = [
  { id: 'race-white', race: 'White', avgMonths: 42, cases: 12450 },
  { id: 'race-black', race: 'Black', avgMonths: 58, cases: 8920 },
  { id: 'race-hispanic', race: 'Hispanic', avgMonths: 51, cases: 9340 },
  { id: 'race-asian', race: 'Asian', avgMonths: 38, cases: 2150 },
  { id: 'race-other', race: 'Other', avgMonths: 45, cases: 1840 },
];

export const sentenceByDistrictData = [
  { id: 'dist-ny', district: 'NY Southern', avgMonths: 48, cases: 3240 },
  { id: 'dist-ca', district: 'CA Northern', avgMonths: 39, cases: 2890 },
  { id: 'dist-tx', district: 'TX Western', avgMonths: 62, cases: 4120 },
  { id: 'dist-fl', district: 'FL Southern', avgMonths: 52, cases: 3560 },
  { id: 'dist-il', district: 'IL Northern', avgMonths: 45, cases: 2980 },
];

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
