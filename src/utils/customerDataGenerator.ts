
import { Customer } from '@/types/customer';
import { ExtendedActivityLog } from '@/types/activity';

const customerTags = [
  'VIP', 'Återkommande', 'Ny kund', 'Riskpatient', 'Rekommenderar',
  'Aknespecialist', 'Anti-age', 'Sensitiv hud', 'Problemhud', 'Premium'
];

const specialists = [
  'Anna K', 'Lisa M', 'Erik S', 'Maria L', 'Sofia P', 'Jonas E'
];

const generateBirthday = () => {
  const start = new Date('1970-01-01');
  const end = new Date('2005-12-31');
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toISOString().split('T')[0];
};

const genders: ('Male' | 'Female' | 'Other')[] = ['Male', 'Female', 'Other'];

export const generateCustomersFromActivities = (activities: ExtendedActivityLog[]): Customer[] => {
  const customerMap = new Map<string, Customer>();
  
  activities.forEach(activity => {
    const customerName = activity.actor.type === 'customer' ? activity.actor.name : 
                        activity.target?.type === 'customer' ? activity.target.name : null;
    
    if (customerName && !customerMap.has(customerName)) {
      // Get all customer activities
      const customerActivities = activities.filter(a => 
        (a.actor.type === 'customer' && a.actor.name === customerName) ||
        (a.target?.type === 'customer' && a.target.name === customerName)
      );
      
      // Count orders and treatments
      const orders = customerActivities.filter(a => 
        a.category === 'beställningar'
      ).length;
      
      const treatments = customerActivities.filter(a => 
        a.category === 'behandlingar'
      ).length;
      
      // Calculate total value
      const totalValue = customerActivities
        .filter(a => a.category === 'ekonomi' && a.details.amount_cents)
        .reduce((sum, a) => sum + (a.details.amount_cents || 0), 0);
      
      // Extract problems from activities
      const problems = [...new Set(
        customerActivities
          .filter(a => a.details.problem_category)
          .map(a => a.details.problem_category!)
      )];
      
      // Get latest activity
      const latestActivity = customerActivities.sort((a, b) => 
        b.timestamp.getTime() - a.timestamp.getTime()
      )[0];
      
      // Get earliest activity (created date)
      const earliestActivity = customerActivities.sort((a, b) => 
        a.timestamp.getTime() - b.timestamp.getTime()
      )[0];
      
      // Determine status
      const hasRecentBooking = customerActivities.some(a => 
        a.category === 'bokningar' && 
        a.timestamp.getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
      );
      
      const hasRecentPayment = customerActivities.some(a => 
        a.category === 'ekonomi' && 
        a.timestamp.getTime() > Date.now() - 14 * 24 * 60 * 60 * 1000
      );
      
      let status: 'Aktiv' | 'Potentiell' | 'Inaktiv' = 'Inaktiv';
      if (hasRecentBooking) status = 'Aktiv';
      else if (hasRecentPayment) status = 'Potentiell';
      
      // Generate tags based on customer behavior
      const tags: string[] = [];
      if (totalValue > 10000 * 100) tags.push('VIP');
      if (treatments > 5) tags.push('Återkommande');
      if (treatments === 0) tags.push('Ny kund');
      if (problems.includes('Akne')) tags.push('Aknespecialist');
      if (problems.includes('Åldrande')) tags.push('Anti-age');
      if (problems.includes('Känslighet')) tags.push('Sensitiv hud');
      if (problems.length > 2) tags.push('Problemhud');
      if (totalValue > 20000 * 100) tags.push('Premium');
      
      // Add some random tags for variety
      if (Math.random() < 0.3) {
        const availableTags = customerTags.filter(tag => !tags.includes(tag));
        if (availableTags.length > 0) {
          tags.push(availableTags[Math.floor(Math.random() * availableTags.length)]);
        }
      }
      
      // Get assigned specialist from activities
      const userAssigned = customerActivities
        .filter(a => a.actor.type === 'employee')
        .map(a => a.actor.name)[0] || specialists[Math.floor(Math.random() * specialists.length)];
      
      // Generate initials
      const initials = customerName.split(' ').map(n => n[0]).join('').toUpperCase();
      
      customerMap.set(customerName, {
        id: customerMap.size + 1,
        name: customerName,
        company: activity.metadata.company || 'AcneSpecialisten',
        email: `${customerName.toLowerCase().replace(' ', '.')}@email.se`,
        phone: `+46 70 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 90) + 10}${Math.floor(Math.random() * 90) + 10}`,
        status,
        created: earliestActivity.timestamp.toISOString().split('T')[0],
        lastActivity: latestActivity.timestamp.toISOString().split('T')[0],
        value: totalValue > 0 ? `${(totalValue / 100).toLocaleString('sv-SE')} kr` : '0 kr',
        orders,
        treatments,
        problems: problems.slice(0, 3), // Limit to 3 main problems
        tags: tags.slice(0, 4), // Limit to 4 tags
        userAssigned,
        initials,
        birthday: generateBirthday(),
        gender: genders[Math.floor(Math.random() * genders.length)]
      });
    }
  });
  
  return Array.from(customerMap.values());
};
