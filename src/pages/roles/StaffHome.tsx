export default function StaffHome() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Anställd Dashboard
        </h1>
        <p className="text-muted-foreground mb-8">
          Välkommen till din anställd-panel. Här kommer du att kunna hantera dina dagliga uppgifter.
        </p>
        
        <div className="bg-card border rounded-lg p-8 max-w-md mx-auto">
          <div className="text-muted-foreground mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Inga moduler aktiverade än
          </h3>
          <p className="text-sm text-muted-foreground">
            Moduler kommer att läggas till här baserat på dina behörigheter som anställd.
          </p>
        </div>
      </div>
    </div>
  );
}