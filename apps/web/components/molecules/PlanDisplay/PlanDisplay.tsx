import React from 'react';
import { Card } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PlanDisplayProps {
  planName: string;
  price: string;
  period: 'monthly' | 'yearly';
  features: PlanFeature[];
  isCurrentPlan?: boolean;
}

export const PlanDisplay: React.FC<PlanDisplayProps> = ({ planName, price, period, features, isCurrentPlan = false }) => {
  return (
    <Card className={`p-6 ${isCurrentPlan ? 'border-primary' : ''}`}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{planName}</h3>
          {isCurrentPlan && <Badge variant="outline">Current Plan</Badge>}
        </div>

        <div className="flex items-baseline">
          <span className="text-2xl font-bold">{price}</span>
          <span className="ml-1 text-sm text-muted-foreground">/{period}</span>
        </div>

        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <span className={`mr-2 ${feature.included ? 'text-green-500' : 'text-gray-400'}`}>{feature.included ? '✓' : '✗'}</span>
              <span className={feature.included ? '' : 'text-muted-foreground'}>{feature.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
