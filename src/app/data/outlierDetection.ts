import { type CaseProfile, predictSentence } from './mockData';

export interface OutlierCase extends CaseProfile {
  id: string;
  defendantName: string;
  sentenceDate: string;
  actualSentenceMonths: number;
  predictedMonths: number;
  deviation: number;
  zScore: number;
  outlierSeverity: 'extreme' | 'high' | 'moderate';
  appealPotential: number; // 0-100 score
  status: 'identified' | 'reviewed' | 'referred' | 'in-progress' | 'appealed';
  assignedNPO?: string;
  assignedLawyer?: string;
  notes?: string;
  appealDeadline: string;
  district: string;
  docketNumber: string;
}

// Generate mock outlier cases
export function generateOutlierCases(): OutlierCase[] {
  const cases: OutlierCase[] = [
    {
      id: 'case-001',
      defendantName: 'Marcus Johnson',
      sentenceDate: '2025-08-15',
      offense: 'drug-trafficking',
      criminalHistory: 1,
      age: 24,
      race: 'black',
      gender: 'male',
      district: 'tx-western',
      lawyerType: 'public',
      pleaType: 'trial',
      actualSentenceMonths: 156,
      predictedMonths: 82,
      deviation: 74,
      zScore: 3.8,
      outlierSeverity: 'extreme',
      appealPotential: 92,
      status: 'identified',
      appealDeadline: '2026-08-15',
      docketNumber: 'CR-2025-0847',
    },
    {
      id: 'case-002',
      defendantName: 'Sarah Williams',
      sentenceDate: '2025-09-22',
      offense: 'fraud',
      criminalHistory: 0,
      age: 31,
      race: 'black',
      gender: 'female',
      district: 'ny-southern',
      lawyerType: 'court-appointed',
      pleaType: 'trial',
      actualSentenceMonths: 84,
      predictedMonths: 38,
      deviation: 46,
      zScore: 3.2,
      outlierSeverity: 'extreme',
      appealPotential: 88,
      status: 'reviewed',
      appealDeadline: '2026-09-22',
      docketNumber: 'CR-2025-1203',
    },
    {
      id: 'case-003',
      defendantName: 'Carlos Hernandez',
      sentenceDate: '2025-10-05',
      offense: 'weapons',
      criminalHistory: 2,
      age: 29,
      race: 'hispanic',
      gender: 'male',
      district: 'tx-western',
      lawyerType: 'public',
      pleaType: 'plea',
      actualSentenceMonths: 96,
      predictedMonths: 52,
      deviation: 44,
      zScore: 2.9,
      outlierSeverity: 'high',
      appealPotential: 85,
      status: 'identified',
      appealDeadline: '2026-10-05',
      docketNumber: 'CR-2025-1456',
    },
    {
      id: 'case-004',
      defendantName: 'Jamal Washington',
      sentenceDate: '2025-07-12',
      offense: 'drug-trafficking',
      criminalHistory: 3,
      age: 35,
      race: 'black',
      gender: 'male',
      district: 'fl-southern',
      lawyerType: 'public',
      pleaType: 'trial',
      actualSentenceMonths: 180,
      predictedMonths: 98,
      deviation: 82,
      zScore: 4.1,
      outlierSeverity: 'extreme',
      appealPotential: 95,
      status: 'referred',
      assignedNPO: 'Equal Justice Initiative',
      appealDeadline: '2026-07-12',
      docketNumber: 'CR-2025-0634',
    },
    {
      id: 'case-005',
      defendantName: 'DeShawn Harris',
      sentenceDate: '2025-11-03',
      offense: 'assault',
      criminalHistory: 0,
      age: 22,
      race: 'black',
      gender: 'male',
      district: 'tx-western',
      lawyerType: 'court-appointed',
      pleaType: 'trial',
      actualSentenceMonths: 72,
      predictedMonths: 32,
      deviation: 40,
      zScore: 2.8,
      outlierSeverity: 'high',
      appealPotential: 82,
      status: 'identified',
      appealDeadline: '2026-11-03',
      docketNumber: 'CR-2025-1823',
    },
    {
      id: 'case-006',
      defendantName: 'Tyrone Mitchell',
      sentenceDate: '2025-06-18',
      offense: 'theft',
      criminalHistory: 1,
      age: 27,
      race: 'black',
      gender: 'male',
      district: 'ny-southern',
      lawyerType: 'public',
      pleaType: 'trial',
      actualSentenceMonths: 54,
      predictedMonths: 22,
      deviation: 32,
      zScore: 2.6,
      outlierSeverity: 'high',
      appealPotential: 79,
      status: 'in-progress',
      assignedNPO: 'Innocence Project',
      assignedLawyer: 'Rebecca Chen, Esq.',
      appealDeadline: '2026-06-18',
      docketNumber: 'CR-2025-0421',
    },
    {
      id: 'case-007',
      defendantName: 'Antonio Garcia',
      sentenceDate: '2025-12-01',
      offense: 'drug-trafficking',
      criminalHistory: 2,
      age: 33,
      race: 'hispanic',
      gender: 'male',
      district: 'tx-western',
      lawyerType: 'public',
      pleaType: 'trial',
      actualSentenceMonths: 144,
      predictedMonths: 78,
      deviation: 66,
      zScore: 3.5,
      outlierSeverity: 'extreme',
      appealPotential: 90,
      status: 'identified',
      appealDeadline: '2026-12-01',
      docketNumber: 'CR-2025-2145',
    },
    {
      id: 'case-008',
      defendantName: 'Keisha Brown',
      sentenceDate: '2025-08-28',
      offense: 'fraud',
      criminalHistory: 0,
      age: 28,
      race: 'black',
      gender: 'female',
      district: 'fl-southern',
      lawyerType: 'court-appointed',
      pleaType: 'plea',
      actualSentenceMonths: 48,
      predictedMonths: 18,
      deviation: 30,
      zScore: 2.5,
      outlierSeverity: 'high',
      appealPotential: 76,
      status: 'reviewed',
      appealDeadline: '2026-08-28',
      docketNumber: 'CR-2025-1089',
    },
    {
      id: 'case-009',
      defendantName: 'Michael Thompson',
      sentenceDate: '2025-09-10',
      offense: 'weapons',
      criminalHistory: 1,
      age: 26,
      race: 'black',
      gender: 'male',
      district: 'tx-western',
      lawyerType: 'public',
      pleaType: 'trial',
      actualSentenceMonths: 108,
      predictedMonths: 58,
      deviation: 50,
      zScore: 3.1,
      outlierSeverity: 'extreme',
      appealPotential: 87,
      status: 'referred',
      assignedNPO: 'ACLU',
      appealDeadline: '2026-09-10',
      docketNumber: 'CR-2025-1312',
    },
    {
      id: 'case-010',
      defendantName: 'James Robinson',
      sentenceDate: '2025-10-20',
      offense: 'assault',
      criminalHistory: 2,
      age: 30,
      race: 'black',
      gender: 'male',
      district: 'fl-southern',
      lawyerType: 'court-appointed',
      pleaType: 'trial',
      actualSentenceMonths: 84,
      predictedMonths: 48,
      deviation: 36,
      zScore: 2.7,
      outlierSeverity: 'high',
      appealPotential: 81,
      status: 'identified',
      appealDeadline: '2026-10-20',
      docketNumber: 'CR-2025-1667',
    },
  ];

  return cases;
}

// Calculate outlier metrics for a case
export function calculateOutlierMetrics(
  actualMonths: number,
  profile: CaseProfile
): {
  deviation: number;
  zScore: number;
  outlierSeverity: 'extreme' | 'high' | 'moderate' | 'normal';
  appealPotential: number;
} {
  const prediction = predictSentence(profile);
  const deviation = actualMonths - prediction.predictedMonths;

  // Estimate standard deviation (simplified - in real app would use actual distribution)
  const estimatedStdDev = 20;
  const zScore = Math.abs(deviation / estimatedStdDev);

  let outlierSeverity: 'extreme' | 'high' | 'moderate' | 'normal';
  if (zScore >= 3.0) outlierSeverity = 'extreme';
  else if (zScore >= 2.5) outlierSeverity = 'high';
  else if (zScore >= 2.0) outlierSeverity = 'moderate';
  else outlierSeverity = 'normal';

  // Appeal potential scoring (0-100)
  let appealPotential = 0;

  // Base score on z-score (outlier strength)
  appealPotential += Math.min(zScore * 15, 40);

  // Higher for trial cases (trial penalty)
  if (profile.pleaType === 'trial') appealPotential += 20;

  // Higher for first-time offenders
  if (profile.criminalHistory === 0) appealPotential += 15;

  // Higher for public defender cases
  if (profile.lawyerType === 'public' || profile.lawyerType === 'court-appointed') {
    appealPotential += 10;
  }

  // Demographic disparities
  if (profile.race === 'black' || profile.race === 'hispanic') {
    appealPotential += 10;
  }

  // High-disparity districts
  if (profile.district === 'tx-western' || profile.district === 'fl-southern') {
    appealPotential += 5;
  }

  appealPotential = Math.min(appealPotential, 100);

  return { deviation, zScore, outlierSeverity, appealPotential };
}

// Get days until appeal deadline
export function getDaysUntilDeadline(deadlineDate: string): number {
  const deadline = new Date(deadlineDate);
  const today = new Date('2026-05-09'); // Using current date from context
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Filter and sort cases by priority
export function prioritizeCases(cases: OutlierCase[]): OutlierCase[] {
  return [...cases].sort((a, b) => {
    // First: Prioritize by urgency (appeal deadline)
    const daysA = getDaysUntilDeadline(a.appealDeadline);
    const daysB = getDaysUntilDeadline(b.appealDeadline);

    // Cases expiring within 120 days are urgent
    const urgentA = daysA < 120;
    const urgentB = daysB < 120;

    if (urgentA !== urgentB) return urgentA ? -1 : 1;

    // Second: Sort by appeal potential
    if (a.appealPotential !== b.appealPotential) {
      return b.appealPotential - a.appealPotential;
    }

    // Third: Sort by z-score (statistical severity)
    return b.zScore - a.zScore;
  });
}
