import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckCircle } from 'lucide-react';

interface TimelineItem {
  phase: string;
  weeks: string;
  description: string;
}

interface TimelineSectionProps {
  timeline: TimelineItem[];
  duration: string;
}

const TimelineSection = ({ timeline, duration }: TimelineSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-green-600" />
          🗓️ Din {duration} resa
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                {index < timeline.length - 1 && (
                  <div className="w-px h-8 bg-green-200 mt-2" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-green-900">{item.weeks}</span>
                  <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {item.phase}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineSection;