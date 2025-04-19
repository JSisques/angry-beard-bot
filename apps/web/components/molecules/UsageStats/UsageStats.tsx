import React from 'react';
import { Card } from '@/components/atoms/card';
import { UsageStatsProps } from './UsageStats.interface';

export const UsageStats: React.FC<UsageStatsProps> = ({ stats, dictionary }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{dictionary.molecules.usageStats.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <div className="flex items-baseline mt-1">
              <p className="text-2xl font-bold">{stat.value}</p>
              {stat.change !== undefined && (
                <span className={`ml-2 text-sm ${stat.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change >= 0 ? '+' : ''}
                  {stat.change}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
