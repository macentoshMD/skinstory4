import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Achievement } from "@/utils/employeeStatsGenerator";
import { Award, TrendingUp, Users, Star, Trophy, Crown } from "lucide-react";

interface AchievementCardProps {
  achievement: Achievement;
}

const getIconComponent = (iconName: string) => {
  const icons = {
    Award,
    TrendingUp,
    Users,
    Star,
    Trophy,
    Crown,
  };
  return icons[iconName as keyof typeof icons] || Award;
};

const getLevelColor = (level: Achievement['level']) => {
  switch (level) {
    case 'bronze': return 'from-amber-600 to-yellow-500';
    case 'silver': return 'from-gray-400 to-gray-300';
    case 'gold': return 'from-yellow-400 to-yellow-300';
    case 'platinum': return 'from-purple-400 to-purple-300';
    default: return 'from-blue-400 to-blue-300';
  }
};

const getLevelIcon = (level: Achievement['level']) => {
  switch (level) {
    case 'bronze': return '🥉';
    case 'silver': return '🥈';
    case 'gold': return '🥇';
    case 'platinum': return '💎';
    default: return '🏆';
  }
};

export function AchievementCard({ achievement }: AchievementCardProps) {
  const IconComponent = getIconComponent(achievement.icon);
  
  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${getLevelColor(achievement.level)} opacity-10`} />
      <CardContent className="p-4 relative">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${getLevelColor(achievement.level)} text-white`}>
            <IconComponent className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-sm text-foreground truncate">
                {achievement.title}
              </h3>
              <span className="text-lg">{getLevelIcon(achievement.level)}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              {achievement.description}
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">
                {achievement.category}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {achievement.earnedDate.toLocaleDateString('sv-SE')}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}