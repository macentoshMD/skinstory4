import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TopListItem {
  name: string;
  value: number;
  percentage?: number;
}

interface TopListCardProps {
  title: string;
  items: TopListItem[];
  maxItems?: number;
  valueFormatter?: (value: number) => string;
  showPercentage?: boolean;
}

export function TopListCard({ 
  title, 
  items, 
  maxItems = 5, 
  valueFormatter = (v) => v.toString(),
  showPercentage = false 
}: TopListCardProps) {
  const sortedItems = [...items]
    .sort((a, b) => b.value - a.value)
    .slice(0, maxItems);

  const maxValue = sortedItems[0]?.value || 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedItems.length === 0 ? (
          <p className="text-sm text-muted-foreground">Ingen data tillgänglig</p>
        ) : (
          <div className="space-y-3">
            {sortedItems.map((item, index) => {
              const widthPercentage = (item.value / maxValue) * 100;
              
              return (
                <div key={`${item.name}-${index}`} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium truncate">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">
                        {valueFormatter(item.value)}
                      </span>
                      {showPercentage && item.percentage && (
                        <Badge variant="secondary" className="text-xs">
                          {item.percentage.toFixed(1)}%
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${widthPercentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}