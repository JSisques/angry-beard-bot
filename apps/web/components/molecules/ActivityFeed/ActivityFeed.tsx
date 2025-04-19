import React from 'react';
import { Card } from '@/components/atoms/card';

interface ActivityItem {
  id: string;
  type: 'review' | 'repository_added' | 'plan_changed' | 'config_updated';
  description: string;
  timestamp: string;
  repository?: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'review':
        return '🔍';
      case 'repository_added':
        return '➕';
      case 'plan_changed':
        return '💰';
      case 'config_updated':
        return '⚙️';
      default:
        return '📝';
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

      {activities.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          <p>No recent activity</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="flex items-start">
              <div className="mr-3 mt-1 text-lg">{getActivityIcon(activity.type)}</div>
              <div className="flex-1">
                <p className="text-sm">{activity.description}</p>
                {activity.repository && <p className="text-xs text-muted-foreground mt-1">{activity.repository}</p>}
                <p className="text-xs text-muted-foreground mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
