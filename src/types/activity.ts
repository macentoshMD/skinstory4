
export interface ActivityActor {
  type: 'employee' | 'customer' | 'system';
  id: number;
  name: string;
}

export interface ActivityTarget {
  type: 'booking' | 'order' | 'customer' | 'treatment' | 'payment' | 'employee' | 'report' | 'consultation' | 'recommendation' | 'support';
  id: number;
  name: string;
}

export interface ActivityDetails {
  previous_value?: any;
  new_value?: any;
  amount_cents?: number;
  currency?: string;
  reason?: string;
  notes?: string;
  // Treatment specific
  treatment_type?: string;
  equipment?: string;
  skin_score_improvement?: number;
  problem_category?: string;
  // Order specific
  order_type?: 'B2C' | 'B2B';
  product_category?: string;
  // Sales tracking
  sale_channel?: 'online' | 'inhouse';
  order_status?: 'Beställd' | 'På väg' | 'Mottagen';
  commission_rate?: number;
  commission_cents?: number;
  has_before_after_photos?: boolean;
  brand?: string;
  order_id?: string;
  item_name?: string;
  payment_method?: string;
  // Support specific
  channel?: 'chat' | 'email' | 'phone';
  case_type?: 'question' | 'complaint' | 'booking';
  handling_time_minutes?: number;
  resolution_status?: 'open' | 'resolved' | 'escalated';
}

export interface ActivityMetadata {
  ip_address?: string;
  user_agent?: string;
  source: 'web_app' | 'mobile_app' | 'api' | 'system';
  location?: string;
  company?: 'AcneSpecialisten' | 'DAHL' | 'Sveriges Skönhetscenter';
  clinic?: string;
  specialist?: string;
  service?: string;
}

export interface ExtendedActivityLog {
  id: string;
  timestamp: Date;
  workspace_id: number;
  clinic_id?: number;
  activity_type: ActivityType;
  category: ActivityCategory;
  actor: ActivityActor;
  target?: ActivityTarget;
  details: ActivityDetails;
  metadata: ActivityMetadata;
  is_important: boolean;
  created_at: Date;
}

export type ActivityCategory = 
  | 'bokningar' 
  | 'beställningar' 
  | 'kunder' 
  | 'ekonomi' 
  | 'specialist'
  | 'behandlingar'
  | 'rekommendationer'
  | 'support';

export type ActivityType =
  // Bokningar
  | 'booking_created'
  | 'booking_cancelled_specialist'
  | 'booking_cancelled_customer'
  | 'booking_no_show'
  | 'booking_completed'
  | 'booking_rescheduled'
  
  // Beställningar
  | 'order_created_b2c'
  | 'order_shipped_b2c'
  | 'order_in_transit_b2c'
  | 'order_delivered_b2c'
  | 'order_created_b2b'
  | 'order_shipped_b2b'
  | 'order_in_transit_b2b'
  | 'order_delivered_b2b'
  
  // Kunder
  | 'customer_status_active'
  | 'customer_status_inactive'
  | 'customer_status_maintenance'
  | 'customer_status_under_treatment'
  | 'customer_status_returning'
  
  // Ekonomi
  | 'payment_cash'
  | 'payment_klarna'
  | 'payment_card'
  | 'payment_swish'
  | 'payment_summary'
  
  // Specialist
  | 'commission_earned'
  | 'recommendation_given'
  | 'goal_achievement'
  | 'customer_rating_received'
  
  // Behandlingar & Konsultationer
  | 'consultation_completed'
  | 'treatment_completed'
  | 'treatment_course_started'
  | 'treatment_course_milestone'
  | 'treatment_course_completed'
  | 'treatment_complication'
  
  // Rekommendationer & Resultat
  | 'recommendation_given_product'
  | 'recommendation_given_treatment'
  | 'recommendation_purchased'
  | 'problem_identified'
  | 'problem_solved'
  | 'skin_score_created'
  | 'skin_score_improved'
  
  // Support & Kommunikation
  | 'chat_started'
  | 'email_received'
  | 'call_completed'
  | 'complaint_received'
  | 'complaint_resolved';

export const ACTIVITY_CATEGORIES: Record<ActivityCategory, string> = {
  'bokningar': 'Bokningar',
  'beställningar': 'Beställningar',
  'kunder': 'Kunder',
  'ekonomi': 'Ekonomi',
  'specialist': 'Specialist',
  'behandlingar': 'Behandlingar',
  'rekommendationer': 'Rekommendationer',
  'support': 'Support'
};

export const ACTIVITY_TYPES: Record<ActivityType, { label: string; category: ActivityCategory; icon: string; priority: 'high' | 'medium' | 'low' }> = {
  // Bokningar
  'booking_created': { label: 'Bokning skapad', category: 'bokningar', icon: '📅', priority: 'medium' },
  'booking_cancelled_specialist': { label: 'Avbokad - Specialist', category: 'bokningar', icon: '🏥', priority: 'high' },
  'booking_cancelled_customer': { label: 'Avbokad - Kund', category: 'bokningar', icon: '❌', priority: 'medium' },
  'booking_no_show': { label: 'NoShow', category: 'bokningar', icon: '⚠️', priority: 'high' },
  'booking_completed': { label: 'Genomförd', category: 'bokningar', icon: '✅', priority: 'low' },
  'booking_rescheduled': { label: 'Ombokad', category: 'bokningar', icon: '🔄', priority: 'medium' },
  
  // Beställningar
  'order_created_b2c': { label: 'Kundbeställning skapad', category: 'beställningar', icon: '🛒', priority: 'medium' },
  'order_shipped_b2c': { label: 'Skickad till kund', category: 'beställningar', icon: '📦', priority: 'low' },
  'order_in_transit_b2c': { label: 'Under transport (kund)', category: 'beställningar', icon: '🚚', priority: 'low' },
  'order_delivered_b2c': { label: 'Levererad till kund', category: 'beställningar', icon: '🏠', priority: 'low' },
  'order_created_b2b': { label: 'Klinikbeställning skapad', category: 'beställningar', icon: '🏥', priority: 'medium' },
  'order_shipped_b2b': { label: 'Skickad till klinik', category: 'beställningar', icon: '📦', priority: 'low' },
  'order_in_transit_b2b': { label: 'Under transport (klinik)', category: 'beställningar', icon: '🚚', priority: 'low' },
  'order_delivered_b2b': { label: 'Levererad till klinik', category: 'beställningar', icon: '🏥', priority: 'low' },
  
  // Kunder
  'customer_status_active': { label: 'Status: Aktiv', category: 'kunder', icon: '🟢', priority: 'low' },
  'customer_status_inactive': { label: 'Status: Inaktiv', category: 'kunder', icon: '🔴', priority: 'medium' },
  'customer_status_maintenance': { label: 'Status: Maintenance', category: 'kunder', icon: '🔧', priority: 'low' },
  'customer_status_under_treatment': { label: 'Status: Under behandling', category: 'kunder', icon: '💊', priority: 'low' },
  'customer_status_returning': { label: 'Status: Återkommande', category: 'kunder', icon: '🔄', priority: 'low' },
  
  // Ekonomi
  'payment_cash': { label: 'Betalning - Kassa', category: 'ekonomi', icon: '💵', priority: 'low' },
  'payment_klarna': { label: 'Betalning - Klarna', category: 'ekonomi', icon: '💳', priority: 'low' },
  'payment_card': { label: 'Betalning - Kort', category: 'ekonomi', icon: '💳', priority: 'low' },
  'payment_swish': { label: 'Betalning - Swish', category: 'ekonomi', icon: '📱', priority: 'low' },
  'payment_summary': { label: 'Betalningssammanställning', category: 'ekonomi', icon: '💰', priority: 'medium' },
  
  // Specialist
  'commission_earned': { label: 'Provision intjänad', category: 'specialist', icon: '💰', priority: 'medium' },
  'recommendation_given': { label: 'Rekommendation given', category: 'specialist', icon: '💡', priority: 'medium' },
  'goal_achievement': { label: 'Måluppfyllelse', category: 'specialist', icon: '🎯', priority: 'high' },
  'customer_rating_received': { label: 'Kundbetyg mottaget', category: 'specialist', icon: '⭐', priority: 'medium' },
  
  // Behandlingar & Konsultationer
  'consultation_completed': { label: 'Konsultation genomförd', category: 'behandlingar', icon: '🔍', priority: 'medium' },
  'treatment_completed': { label: 'Behandling slutförd', category: 'behandlingar', icon: '✨', priority: 'low' },
  'treatment_course_started': { label: 'Kurstart', category: 'behandlingar', icon: '🚀', priority: 'medium' },
  'treatment_course_milestone': { label: 'Kurmilstolpe', category: 'behandlingar', icon: '📍', priority: 'medium' },
  'treatment_course_completed': { label: 'Kur avslutad', category: 'behandlingar', icon: '🏁', priority: 'medium' },
  'treatment_complication': { label: 'Komplikation', category: 'behandlingar', icon: '⚠️', priority: 'high' },
  
  // Rekommendationer & Resultat
  'recommendation_given_product': { label: 'Produktrekommendation', category: 'rekommendationer', icon: '💡', priority: 'medium' },
  'recommendation_given_treatment': { label: 'Behandlingsrekommendation', category: 'rekommendationer', icon: '💊', priority: 'medium' },
  'recommendation_purchased': { label: 'Rekommendation köpt', category: 'rekommendationer', icon: '🎯', priority: 'high' },
  'problem_identified': { label: 'Problem identifierat', category: 'rekommendationer', icon: '🔍', priority: 'medium' },
  'problem_solved': { label: 'Problem löst', category: 'rekommendationer', icon: '✅', priority: 'high' },
  'skin_score_created': { label: 'SkinScore skapad', category: 'rekommendationer', icon: '📊', priority: 'medium' },
  'skin_score_improved': { label: 'SkinScore förbättrad', category: 'rekommendationer', icon: '📈', priority: 'high' },
  
  // Support & Kommunikation
  'chat_started': { label: 'Chat startad', category: 'support', icon: '💬', priority: 'low' },
  'email_received': { label: 'Email mottaget', category: 'support', icon: '📧', priority: 'low' },
  'call_completed': { label: 'Samtal genomfört', category: 'support', icon: '📞', priority: 'medium' },
  'complaint_received': { label: 'Klagomål mottaget', category: 'support', icon: '❗', priority: 'high' },
  'complaint_resolved': { label: 'Klagomål löst', category: 'support', icon: '✅', priority: 'medium' }
};

// Quick filter presets for MVP
export const QUICK_FILTERS = {
  'today_bookings': { label: 'Idag - Bokningar', category: 'bokningar', timeframe: 'today' },
  'today_payments': { label: 'Idag - Betalningar', category: 'ekonomi', timeframe: 'today' },
  'problems': { label: 'Problem', types: ['booking_no_show', 'treatment_complication', 'complaint_received'] },
  'achievements': { label: 'Framgångar', types: ['problem_solved', 'skin_score_improved', 'recommendation_purchased'] },
  'critical': { label: 'Kritiska', priority: 'high' }
};

// Companies and clinics for the MVP
export const COMPANIES = [
  { id: 'acnespecialisten', name: 'AcneSpecialisten' },
  { id: 'dahl', name: 'DAHL' },
  { id: 'sveriges_skönhetscenter', name: 'Sveriges Skönhetscenter' }
];

export const CLINICS = [
  { id: 'södermalm', name: 'Södermalm', company: 'acnespecialisten' },
  { id: 'sundbyberg', name: 'Sundbyberg', company: 'acnespecialisten' }
];

export const SPECIALISTS = [
  'Anna K', 'Lisa M', 'Erik S', 'Maria L', 'Sofia P', 'Jonas E'
];

export const SERVICES = [
  'Portömning', 'Laser', 'Konsultation', 'HydraFacial', 'Microneedling', 'Chemical Peeling'
];
