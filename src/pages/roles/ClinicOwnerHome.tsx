export default function ClinicOwnerHome() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Klinikägare Dashboard
        </h1>
        <p className="text-muted-foreground mb-8">
          Välkommen till din klinikägare-panel. Här kommer du att kunna hantera din klinik och personal.
        </p>
        
        <div className="bg-card border rounded-lg p-8 max-w-md mx-auto">
          <div className="text-muted-foreground mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Inga moduler aktiverade än
          </h3>
          <p className="text-sm text-muted-foreground">
            Moduler kommer att läggas till här baserat på dina behörigheter som klinikägare.
          </p>
        </div>
      </div>
    </div>
  );
}