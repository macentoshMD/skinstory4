
import { ExtendedActivityLog, ActivityType, ActivityCategory, ACTIVITY_TYPES } from '@/types/activity';
import { DateRange } from '@/types/insights';

const customers = [
  'Anna Andersson', 'Erik Johansson', 'Maria Larsson', 'Johan Petersson', 
  'Lisa Svensson', 'Emma Nilsson', 'Oscar Berg', 'Sofia Lindqvist'
];

const staff = [
  'Lisa Sundberg', 'Anna Nordström', 'Maria Lindgren', 'Erik Carlsson',
  'Sofia Persson', 'Jonas Eriksson'
];

const treatments = [
  'HydraFacial', 'Microneedling', 'Chemical Peeling', 'Ansiktsbehandling',
  'Aknebehandling', 'Rosacea-behandling', 'Anti-age behandling'
];

const products = [
  'Hudkräm', 'Serum', 'Rengöring', 'Peeling', 'Solskydd', 'Moisturizer'
];

const clinics = [
  { id: 1, name: 'AcneSpecialisten Södermalm' },
  { id: 2, name: 'AcneSpecialisten Sundbyberg' },
  { id: 3, name: 'Sveriges Skönhetscenter' }
];

export const generateExtendedMockActivities = (dateRange: DateRange): ExtendedActivityLog[] => {
  const activities: ExtendedActivityLog[] = [];
  const daysDiff = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const activityCount = Math.max(20, daysDiff * 5);

  const activityTypes = Object.keys(ACTIVITY_TYPES) as ActivityType[];

  for (let i = 0; i < activityCount; i++) {
    const randomDate = new Date(dateRange.from.getTime() + Math.random() * (dateRange.to.getTime() - dateRange.from.getTime()));
    const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const activityInfo = ACTIVITY_TYPES[activityType];
    const clinic = clinics[Math.floor(Math.random() * clinics.length)];

    let actor, target, details;

    // Generate realistic data based on activity type
    switch (activityInfo.category) {
      case 'bokningar':
        actor = {
          type: 'customer' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: customers[Math.floor(Math.random() * customers.length)]
        };
        target = {
          type: 'booking' as const,
          id: Math.floor(Math.random() * 10000) + 1,
          name: `${treatments[Math.floor(Math.random() * treatments.length)]} - ${actor.name}`
        };
        details = {
          amount_cents: (800 + Math.floor(Math.random() * 1500)) * 100,
          currency: 'SEK',
          notes: activityType === 'booking_cancelled_customer' ? 'Kunde inte komma' : undefined
        };
        break;

      case 'beställningar':
        actor = {
          type: Math.random() > 0.5 ? 'customer' as const : 'employee' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: Math.random() > 0.5 ? customers[Math.floor(Math.random() * customers.length)] : staff[Math.floor(Math.random() * staff.length)]
        };
        target = {
          type: 'order' as const,
          id: Math.floor(Math.random() * 10000) + 1,
          name: `Beställning #${Math.floor(Math.random() * 10000) + 1000}`
        };
        details = {
          amount_cents: (200 + Math.floor(Math.random() * 800)) * 100,
          currency: 'SEK'
        };
        break;

      case 'kunder':
        actor = {
          type: 'employee' as const,
          id: Math.floor(Math.random() * 100) + 1,
          name: staff[Math.floor(Math.random() * staff.length)]
        };
        target = {
          type: 'customer' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: customers[Math.floor(Math.random() * customers.length)]
        };
        details = {};
        break;

      case 'ekonomi':
        actor = {
          type: 'system' as const,
          id: 1,
          name: 'SkinStory System'
        };
        target = {
          type: 'payment' as const,
          id: Math.floor(Math.random() * 10000) + 1,
          name: `Betalning #${Math.floor(Math.random() * 10000) + 1000}`
        };
        details = {
          amount_cents: (500 + Math.floor(Math.random() * 2000)) * 100,
          currency: 'SEK'
        };
        break;

      case 'personal':
        actor = {
          type: 'employee' as const,
          id: Math.floor(Math.random() * 100) + 1,
          name: staff[Math.floor(Math.random() * staff.length)]
        };
        target = activityType === 'employee_created' ? {
          type: 'employee' as const,
          id: Math.floor(Math.random() * 100) + 1,
          name: staff[Math.floor(Math.random() * staff.length)]
        } : undefined;
        details = {};
        break;

      case 'system':
        actor = {
          type: 'system' as const,
          id: 1,
          name: 'SkinStory System'
        };
        target = activityType === 'report_generated' ? {
          type: 'report' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: `Månadsrapport ${randomDate.toLocaleDateString('sv-SE', { month: 'long' })}`
        } : undefined;
        details = {};
        break;

      default:
        actor = {
          type: 'system' as const,
          id: 1,
          name: 'SkinStory System'
        };
        details = {};
    }

    activities.push({
      id: `activity-${i}-${activityType}`,
      timestamp: randomDate,
      workspace_id: 1,
      clinic_id: clinic.id,
      activity_type: activityType,
      category: activityInfo.category,
      actor,
      target,
      details,
      metadata: {
        source: ['web_app', 'mobile_app', 'api'][Math.floor(Math.random() * 3)] as any,
        ip_address: `192.168.1.${Math.floor(Math.random() * 255)}`,
        location: clinic.name
      },
      is_important: Math.random() < 0.1, // 10% chance of being important
      created_at: randomDate
    });
  }

  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};
