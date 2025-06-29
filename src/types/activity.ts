
export interface ActivityActor {
  type: 'employee' | 'customer' | 'system';
  id: number;
  name: string;
}

export interface ActivityTarget {
  type: 'booking' | 'order' | 'customer' | 'treatment' | 'payment' | 'employee' | 'report';
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
}

export interface ActivityMetadata {
  ip_address?: string;
  user_agent?: string;
  source: 'web_app' | 'mobile_app' | 'api' | 'system';
  location?: string;
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
  | 'personal' 
  | 'system';

export type ActivityType =
  // Bokningar
  | 'booking_created'
  | 'booking_confirmed'
  | 'booking_cancelled_customer'
  | 'booking_cancelled_clinic'
  | 'booking_no_show'
  | 'booking_completed'
  | 'booking_rescheduled'
  // Beställningar
  | 'order_created'
  | 'order_paid'
  | 'order_shipped'
  | 'order_delivered'
  | 'order_cancelled'
  | 'order_refunded'
  | 'clinic_supply_order'
  // Kunder
  | 'customer_registered'
  | 'customer_consultation'
  | 'customer_diagnosis'
  | 'customer_recommendation'
  | 'customer_profile_updated'
  // Ekonomi
  | 'commission_earned'
  | 'commission_paid'
  | 'payment_received'
  | 'payment_failed'
  // Personal
  | 'employee_login'
  | 'employee_created'
  | 'service_qualification_added'
  // System
  | 'notification_sent'
  | 'report_generated'
  | 'data_export';

export const ACTIVITY_CATEGORIES: Record<ActivityCategory, string> = {
  'bokningar': 'Bokningar',
  'beställningar': 'Beställningar',
  'kunder': 'Kunder',
  'ekonomi': 'Ekonomi',
  'personal': 'Personal',
  'system': 'System'
};

export const ACTIVITY_TYPES: Record<ActivityType, { label: string; category: ActivityCategory; icon: string }> = {
  // Bokningar
  'booking_created': { label: 'Ny bokning skapad', category: 'bokningar', icon: '📅' },
  'booking_confirmed': { label: 'Bokning bekräftad', category: 'bokningar', icon: '✅' },
  'booking_cancelled_customer': { label: 'Kund avbokade', category: 'bokningar', icon: '❌' },
  'booking_cancelled_clinic': { label: 'Klinik avbokade', category: 'bokningar', icon: '🏥' },
  'booking_no_show': { label: 'Kund kom inte', category: 'bokningar', icon: '👻' },
  'booking_completed': { label: 'Behandling genomförd', category: 'bokningar', icon: '✨' },
  'booking_rescheduled': { label: 'Ombokning', category: 'bokningar', icon: '🔄' },
  
  // Beställningar
  'order_created': { label: 'Ny kundbeställning', category: 'beställningar', icon: '🛒' },
  'order_paid': { label: 'Betalning mottagen', category: 'beställningar', icon: '💳' },
  'order_shipped': { label: 'Skickad till kund', category: 'beställningar', icon: '📦' },
  'order_delivered': { label: 'Levererad', category: 'beställningar', icon: '🎁' },
  'order_cancelled': { label: 'Avbruten beställning', category: 'beställningar', icon: '❌' },
  'order_refunded': { label: 'Återbetalning', category: 'beställningar', icon: '💸' },
  'clinic_supply_order': { label: 'Klinik beställde förbrukning', category: 'beställningar', icon: '🏥' },
  
  // Kunder
  'customer_registered': { label: 'Ny kund registrerad', category: 'kunder', icon: '👤' },
  'customer_consultation': { label: 'Konsultation genomförd', category: 'kunder', icon: '💬' },
  'customer_diagnosis': { label: 'Diagnos satt', category: 'kunder', icon: '🔍' },
  'customer_recommendation': { label: 'Rekommendation given', category: 'kunder', icon: '💡' },
  'customer_profile_updated': { label: 'Profil uppdaterad', category: 'kunder', icon: '✏️' },
  
  // Ekonomi
  'commission_earned': { label: 'Provision intjänad', category: 'ekonomi', icon: '💰' },
  'commission_paid': { label: 'Provision utbetald', category: 'ekonomi', icon: '💵' },
  'payment_received': { label: 'Betalning mottagen', category: 'ekonomi', icon: '💳' },
  'payment_failed': { label: 'Betalning misslyckades', category: 'ekonomi', icon: '❌' },
  
  // Personal
  'employee_login': { label: 'Personal loggade in', category: 'personal', icon: '🔐' },
  'employee_created': { label: 'Ny personal tillagd', category: 'personal', icon: '👨‍⚕️' },
  'service_qualification_added': { label: 'Behörighet tillagd', category: 'personal', icon: '🎓' },
  
  // System
  'notification_sent': { label: 'Meddelande skickat', category: 'system', icon: '📧' },
  'report_generated': { label: 'Rapport skapad', category: 'system', icon: '📊' },
  'data_export': { label: 'Data exporterad', category: 'system', icon: '📤' }
};
