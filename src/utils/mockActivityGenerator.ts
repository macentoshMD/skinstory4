
import { ExtendedActivityLog, ActivityType, ACTIVITY_TYPES, COMPANIES, CLINICS, SPECIALISTS, SERVICES } from '@/types/activity';
import { DateRange } from '@/types/insights';

const customers = [
  'Anna Andersson', 'Erik Johansson', 'Maria Larsson', 'Johan Petersson', 
  'Lisa Svensson', 'Emma Nilsson', 'Oscar Berg', 'Sofia Lindqvist',
  'Daniel Holm', 'Maja Westberg', 'Viktor Åberg', 'Elin Forsberg'
];

const treatments = [
  'Portömning', 'Laser', 'HydraFacial', 'Microneedling', 'Chemical Peeling',
  'Konsultation', 'Aknebehandling', 'Rosacea-behandling', 'Anti-age behandling'
];

const products = [
  'Hudkräm', 'Serum', 'Rengöring', 'Peeling', 'Solskydd', 'Moisturizer',
  'Akne-kit', 'Rosacea-kit', 'Anti-age paket'
];

const problemCategories = [
  'Akne', 'Rosacea', 'Åldrande', 'Pigmentering', 'Känslighet', 'Torrhet'
];

export const generateExtendedMockActivities = (dateRange: DateRange): ExtendedActivityLog[] => {
  const activities: ExtendedActivityLog[] = [];
  const daysDiff = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const activityCount = Math.max(30, daysDiff * 8); // More activities for MVP

  const activityTypes = Object.keys(ACTIVITY_TYPES) as ActivityType[];

  for (let i = 0; i < activityCount; i++) {
    const randomDate = new Date(dateRange.from.getTime() + Math.random() * (dateRange.to.getTime() - dateRange.from.getTime()));
    const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const activityInfo = ACTIVITY_TYPES[activityType];
    
    const company = COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
    const clinic = CLINICS[Math.floor(Math.random() * CLINICS.length)];
    const specialist = SPECIALISTS[Math.floor(Math.random() * SPECIALISTS.length)];
    const service = SERVICES[Math.floor(Math.random() * SERVICES.length)];

    let actor, target, details;

    // Generate realistic data based on activity category
    switch (activityInfo.category) {
      case 'bokningar':
        actor = {
          type: activityType.includes('cancelled_customer') ? 'customer' as const : 'employee' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: activityType.includes('cancelled_customer') ? 
            customers[Math.floor(Math.random() * customers.length)] : 
            specialist
        };
        target = {
          type: 'booking' as const,
          id: Math.floor(Math.random() * 10000) + 1,
          name: `${service} - ${customers[Math.floor(Math.random() * customers.length)]}`
        };
        details = {
          amount_cents: (800 + Math.floor(Math.random() * 1500)) * 100,
          currency: 'SEK',
          treatment_type: service,
          reason: activityType === 'booking_no_show' ? 'Kunde kom inte' : 
                  activityType === 'booking_cancelled_customer' ? 'Kunde behövde avboka' :
                  activityType === 'booking_cancelled_specialist' ? 'Schema-konflikt' : undefined
        };
        break;

      case 'beställningar':
        const isB2B = activityType.includes('b2b');
        actor = {
          type: isB2B ? 'employee' as const : 'customer' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: isB2B ? specialist : customers[Math.floor(Math.random() * customers.length)]
        };
        target = {
          type: 'order' as const,
          id: Math.floor(Math.random() * 10000) + 1,
          name: `${isB2B ? 'Klinik' : 'Kund'}beställning #${Math.floor(Math.random() * 10000) + 1000}`
        };
        details = {
          amount_cents: (isB2B ? 2000 + Math.floor(Math.random() * 5000) : 300 + Math.floor(Math.random() * 800)) * 100,
          currency: 'SEK',
          order_type: isB2B ? 'B2B' : 'B2C',
          product_category: isB2B ? 'Förbrukning' : 'Hudvård'
        };
        break;

      case 'kunder':
        actor = {
          type: 'system' as const,
          id: 1,
          name: 'SkinStory System'
        };
        target = {
          type: 'customer' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: customers[Math.floor(Math.random() * customers.length)]
        };
        details = {
          previous_value: 'active',
          new_value: activityType.split('_')[2],
          problem_category: problemCategories[Math.floor(Math.random() * problemCategories.length)]
        };
        break;

      case 'ekonomi':
        actor = {
          type: 'customer' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: customers[Math.floor(Math.random() * customers.length)]
        };
        target = {
          type: 'payment' as const,
          id: Math.floor(Math.random() * 10000) + 1,
          name: `Betalning #${Math.floor(Math.random() * 10000) + 1000}`
        };
        details = {
          amount_cents: (500 + Math.floor(Math.random() * 2500)) * 100,
          currency: 'SEK'
        };
        break;

      case 'specialist':
        actor = {
          type: 'employee' as const,
          id: Math.floor(Math.random() * 100) + 1,
          name: specialist
        };
        target = activityType === 'customer_rating_received' ? {
          type: 'customer' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: customers[Math.floor(Math.random() * customers.length)]
        } : undefined;
        details = {
          amount_cents: activityType === 'commission_earned' ? (200 + Math.floor(Math.random() * 800)) * 100 : undefined,
          currency: activityType === 'commission_earned' ? 'SEK' : undefined
        };
        break;

      case 'behandlingar':
        actor = {
          type: 'employee' as const,
          id: Math.floor(Math.random() * 100) + 1,
          name: specialist
        };
        target = {
          type: 'treatment' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: `${treatments[Math.floor(Math.random() * treatments.length)]} - ${customers[Math.floor(Math.random() * customers.length)]}`
        };
        details = {
          treatment_type: treatments[Math.floor(Math.random() * treatments.length)],
          equipment: Math.random() > 0.5 ? 'Laser' : 'Microneedling',
          skin_score_improvement: activityType === 'treatment_course_completed' ? Math.floor(Math.random() * 30) + 10 : undefined
        };
        break;

      case 'rekommendationer':
        actor = {
          type: 'employee' as const,
          id: Math.floor(Math.random() * 100) + 1,
          name: specialist
        };
        target = {
          type: 'recommendation' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: activityType.includes('product') ? 
            products[Math.floor(Math.random() * products.length)] :
            treatments[Math.floor(Math.random() * treatments.length)]
        };
        details = {
          problem_category: problemCategories[Math.floor(Math.random() * problemCategories.length)],
          skin_score_improvement: activityType === 'skin_score_improved' ? Math.floor(Math.random() * 25) + 5 : undefined,
          amount_cents: activityType === 'recommendation_purchased' ? (400 + Math.floor(Math.random() * 1200)) * 100 : undefined,
          currency: activityType === 'recommendation_purchased' ? 'SEK' : undefined
        };
        break;

      case 'support':
        actor = {
          type: 'customer' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: customers[Math.floor(Math.random() * customers.length)]
        };
        target = {
          type: 'support' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: `Ärende #${Math.floor(Math.random() * 1000) + 100}`
        };
        details = {
          channel: ['chat', 'email', 'phone'][Math.floor(Math.random() * 3)] as any,
          case_type: ['question', 'complaint', 'booking'][Math.floor(Math.random() * 3)] as any,
          handling_time_minutes: Math.floor(Math.random() * 45) + 5,
          resolution_status: ['open', 'resolved', 'escalated'][Math.floor(Math.random() * 3)] as any
        };
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
      clinic_id: Math.floor(Math.random() * 10) + 1,
      activity_type: activityType,
      category: activityInfo.category,
      actor,
      target,
      details,
      metadata: {
        source: ['web_app', 'mobile_app', 'api'][Math.floor(Math.random() * 3)] as any,
        ip_address: `192.168.1.${Math.floor(Math.random() * 255)}`,
        location: `${company.name} ${clinic.name}`,
        company: company.name as any,
        clinic: clinic.name,
        specialist: specialist,
        service: service
      },
      is_important: activityInfo.priority === 'high' || Math.random() < 0.15,
      created_at: randomDate
    });
  }

  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Generate today's quick stats for MVP dashboard
export const generateTodayStats = (activities: ExtendedActivityLog[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayActivities = activities.filter(activity => {
    const activityDate = new Date(activity.timestamp);
    activityDate.setHours(0, 0, 0, 0);
    return activityDate.getTime() === today.getTime();
  });

  return {
    bookingsCreated: todayActivities.filter(a => a.activity_type === 'booking_created').length,
    treatmentsCompleted: todayActivities.filter(a => a.activity_type === 'treatment_completed').length,
    coursesStarted: todayActivities.filter(a => a.activity_type === 'treatment_course_started').length,
    totalRevenue: todayActivities
      .filter(a => a.details.amount_cents)
      .reduce((sum, a) => sum + (a.details.amount_cents || 0), 0),
    complaints: todayActivities.filter(a => a.activity_type === 'complaint_received').length,
    noShows: todayActivities.filter(a => a.activity_type === 'booking_no_show').length
  };
};
