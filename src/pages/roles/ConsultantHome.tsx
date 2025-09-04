export default function ConsultantHome() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Konsult Dashboard
        </h1>
        <p className="text-muted-foreground mb-8">
          Välkommen till din konsult-panel. Här kommer du att kunna hantera dina konsultationer.
        </p>
        
        <div className="bg-card border rounded-lg p-8 max-w-md mx-auto">
          <div className="text-muted-foreground mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Inga moduler aktiverade än
          </h3>
          <p className="text-sm text-muted-foreground">
            Moduler kommer att läggas till här baserat på dina behörigheter som konsult.
          </p>
        </div>
      </div>
    </div>
  );
}