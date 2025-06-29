
import { ExtendedActivityLog, ActivityType, ACTIVITY_TYPES, COMPANIES, CLINICS, SPECIALISTS, SERVICES } from '@/types/activity';
import { DateRange } from '@/types/insights';

const customers = [
  'Anna Andersson', 'Erik Johansson', 'Maria Larsson', 'Johan Petersson', 
  'Lisa Svensson', 'Emma Nilsson', 'Oscar Berg', 'Sofia Lindqvist',
  'Daniel Holm', 'Maja Westberg', 'Viktor Åberg', 'Elin Forsberg',
  'Karin Blomberg', 'Magnus Hedberg', 'Sara Karlsson', 'Tobias Engström',
  'Linda Axelsson', 'Peter Lundgren', 'Camilla Eriksson', 'Andreas Olsson'
];

const treatments = [
  'Portömning', 'Laser', 'HydraFacial', 'Microneedling', 'Chemical Peeling',
  'Konsultation', 'Aknebehandling', 'Rosacea-behandling', 'Anti-age behandling',
  'IPL', 'Dermaplaning', 'Oxygen Facial', 'LED-behandling', 'Hårborttagning'
];

const products = [
  'Hudkräm', 'Serum', 'Rengöring', 'Peeling', 'Solskydd', 'Moisturizer',
  'Akne-kit', 'Rosacea-kit', 'Anti-age paket', 'Vitamin C Serum',
  'Hyaluronsyra', 'Retinol', 'Niacinamide', 'Cleanser'
];

const problemCategories = [
  'Akne', 'Rosacea', 'Åldrande', 'Pigmentering', 'Känslighet', 'Torrhet',
  'Stora porer', 'Ärr', 'Melasma', 'Solskador', 'Hårborttagning'
];

const supportReasons = [
  'Bokningstid', 'Produktfråga', 'Behandlingsresultat', 'Fakturafråga',
  'Allergisk reaktion', 'Ombokning', 'Avbokning', 'Rekommendation'
];

// Category weights to ensure good distribution
const categoryWeights = {
  'bokningar': 25,      // 25% - Most common
  'ekonomi': 20,        // 20% - Very important
  'behandlingar': 15,   // 15% - Core business
  'beställningar': 12,  // 12% - Regular occurrence
  'kunder': 10,         // 10% - Status changes
  'rekommendationer': 8, // 8% - Business driving
  'specialist': 6,      // 6% - Performance tracking
  'support': 4          // 4% - Customer service
};

export const generateExtendedMockActivities = (dateRange: DateRange): ExtendedActivityLog[] => {
  const activities: ExtendedActivityLog[] = [];
  const daysDiff = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const activityCount = Math.max(100, daysDiff * 15);

  // Create weighted activity type selection
  const weightedActivityTypes: ActivityType[] = [];
  Object.entries(categoryWeights).forEach(([category, weight]) => {
    const categoryTypes = Object.keys(ACTIVITY_TYPES).filter(
      type => ACTIVITY_TYPES[type as ActivityType].category === category
    ) as ActivityType[];
    
    for (let i = 0; i < weight; i++) {
      weightedActivityTypes.push(...categoryTypes);
    }
  });

  for (let i = 0; i < activityCount; i++) {
    const randomDate = new Date(dateRange.from.getTime() + Math.random() * (dateRange.to.getTime() - dateRange.from.getTime()));
    const activityType = weightedActivityTypes[Math.floor(Math.random() * weightedActivityTypes.length)];
    const activityInfo = ACTIVITY_TYPES[activityType];
    
    const company = COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
    const clinic = CLINICS[Math.floor(Math.random() * CLINICS.length)];
    const specialist = SPECIALISTS[Math.floor(Math.random() * SPECIALISTS.length)];
    const service = SERVICES[Math.floor(Math.random() * SERVICES.length)];
    const customer = customers[Math.floor(Math.random() * customers.length)];

    let actor, target, details;

    switch (activityInfo.category) {
      case 'bokningar':
        actor = {
          type: activityType.includes('cancelled_customer') ? 'customer' as const : 'employee' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: activityType.includes('cancelled_customer') ? customer : specialist
        };
        target = {
          type: 'booking' as const,
          id: Math.floor(Math.random() * 10000) + 1,
          name: `${service} - ${customer}`
        };
        details = {
          amount_cents: (800 + Math.floor(Math.random() * 2200)) * 100,
          currency: 'SEK',
          treatment_type: service,
          reason: activityType === 'booking_no_show' ? 'Kunde kom inte' : 
                  activityType === 'booking_cancelled_customer' ? 'Personliga skäl' :
                  activityType === 'booking_cancelled_specialist' ? 'Schema-konflikt' : 
                  activityType === 'booking_rescheduled' ? 'Ombokad till nästa vecka' : undefined
        };
        break;

      case 'beställningar':
        const isB2B = activityType.includes('b2b');
        actor = {
          type: isB2B ? 'employee' as const : 'customer' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: isB2B ? specialist : customer
        };
        target = {
          type: 'order' as const,
          id: Math.floor(Math.random() * 10000) + 1,
          name: `${isB2B ? 'Klinik' : 'Kund'}beställning #${Math.floor(Math.random() * 10000) + 1000}`
        };
        details = {
          amount_cents: (isB2B ? 3000 + Math.floor(Math.random() * 8000) : 400 + Math.floor(Math.random() * 1600)) * 100,
          currency: 'SEK',
          order_type: isB2B ? 'B2B' : 'B2C',
          product_category: isB2B ? 'Förbrukning' : products[Math.floor(Math.random() * products.length)]
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
          name: customer
        };
        details = {
          previous_value: ['active', 'inactive', 'maintenance'][Math.floor(Math.random() * 3)],
          new_value: activityType.split('_')[2],
          problem_category: problemCategories[Math.floor(Math.random() * problemCategories.length)],
          ltv_value: Math.floor(Math.random() * 50000) + 5000
        };
        break;

      case 'ekonomi':
        actor = {
          type: 'customer' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: customer
        };
        target = {
          type: 'payment' as const,
          id: Math.floor(Math.random() * 10000) + 1,
          name: `Betalning #${Math.floor(Math.random() * 10000) + 1000}`
        };
        details = {
          amount_cents: (600 + Math.floor(Math.random() * 4400)) * 100,
          currency: 'SEK',
          payment_method: activityType.split('_')[1],
          treatment_type: treatments[Math.floor(Math.random() * treatments.length)]
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
          name: customer
        } : {
          type: 'recommendation' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: treatments[Math.floor(Math.random() * treatments.length)]
        };
        details = {
          amount_cents: activityType === 'commission_earned' ? (300 + Math.floor(Math.random() * 1200)) * 100 : undefined,
          currency: activityType === 'commission_earned' ? 'SEK' : undefined,
          rating: activityType === 'customer_rating_received' ? Math.floor(Math.random() * 2) + 4 : undefined,
          commission_rate: activityType === 'commission_earned' ? Math.floor(Math.random() * 20) + 10 : undefined
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
          name: `${treatments[Math.floor(Math.random() * treatments.length)]} - ${customer}`
        };
        details = {
          treatment_type: treatments[Math.floor(Math.random() * treatments.length)],
          equipment: ['Laser', 'Microneedling', 'IPL', 'HydraFacial'][Math.floor(Math.random() * 4)],
          skin_score_improvement: activityType === 'treatment_course_completed' ? Math.floor(Math.random() * 40) + 15 : 
                                  activityType === 'treatment_course_milestone' ? Math.floor(Math.random() * 20) + 5 : undefined,
          session_number: activityType.includes('course') ? Math.floor(Math.random() * 9) + 1 : undefined,
          amount_cents: (1200 + Math.floor(Math.random() * 2800)) * 100,
          currency: 'SEK'
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
          skin_score_improvement: activityType === 'skin_score_improved' ? Math.floor(Math.random() * 35) + 10 : undefined,
          amount_cents: activityType === 'recommendation_purchased' ? (500 + Math.floor(Math.random() * 2000)) * 100 : undefined,
          currency: activityType === 'recommendation_purchased' ? 'SEK' : undefined,
          recommendation_type: activityType.includes('product') ? 'Produkt' : 'Behandling',
          conversion_rate: Math.floor(Math.random() * 40) + 20
        };
        break;

      case 'support':
        actor = {
          type: 'customer' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: customer
        };
        target = {
          type: 'support' as const,
          id: Math.floor(Math.random() * 1000) + 1,
          name: `Ärende #${Math.floor(Math.random() * 1000) + 100}`
        };
        details = {
          channel: ['chat', 'email', 'phone'][Math.floor(Math.random() * 3)] as any,
          case_type: ['question', 'complaint', 'booking'][Math.floor(Math.random() * 3)] as any,
          handling_time_minutes: Math.floor(Math.random() * 60) + 5,
          resolution_status: ['open', 'resolved', 'escalated'][Math.floor(Math.random() * 3)] as any,
          reason: supportReasons[Math.floor(Math.random() * supportReasons.length)],
          satisfaction_rating: activityType === 'complaint_resolved' ? Math.floor(Math.random() * 3) + 3 : undefined
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
    treatmentsCompleted: todayActivities.filter(a => 
      a.activity_type === 'treatment_completed' || a.activity_type === 'consultation_completed'
    ).length,
    coursesStarted: todayActivities.filter(a => a.activity_type === 'treatment_course_started').length,
    totalRevenue: todayActivities
      .filter(a => a.details.amount_cents)
      .reduce((sum, a) => sum + (a.details.amount_cents || 0), 0),
    complaints: todayActivities.filter(a => a.activity_type === 'complaint_received').length,
    noShows: todayActivities.filter(a => a.activity_type === 'booking_no_show').length
  };
};
