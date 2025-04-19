import React from 'react';
import { Card } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';

interface BotConfigDisplayProps {
  grumpinessLevel: 'Mild' | 'Moderate' | 'Extreme';
  technicalLevel: 'Basic' | 'Intermediate' | 'Advanced';
  detailLevel: 'Concise' | 'Balanced' | 'Comprehensive';
  reviewFocusAreas: string[];
}

export const BotConfigDisplay: React.FC<BotConfigDisplayProps> = ({ grumpinessLevel, technicalLevel, detailLevel, reviewFocusAreas }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Bot Configuration</h3>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Grumpiness Level</p>
          <Badge variant="outline" className="text-base">
            {grumpinessLevel}
          </Badge>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">Technical Level</p>
          <Badge variant="outline" className="text-base">
            {technicalLevel}
          </Badge>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">Detail Level</p>
          <Badge variant="outline" className="text-base">
            {detailLevel}
          </Badge>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">Review Focus Areas</p>
          <div className="flex flex-wrap gap-2">
            {reviewFocusAreas.map((area, index) => (
              <Badge key={index} variant="secondary">
                {area}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
