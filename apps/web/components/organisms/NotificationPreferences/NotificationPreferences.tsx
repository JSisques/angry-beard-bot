'use client';

import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { RootProps } from '@/interfaces/Root/Root.interface';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms/card';
import { Switch } from '@/components/atoms/switch';
import { Label } from '@/components/atoms/label';
import { Button } from '@/components/atoms/button';

interface NotificationPreferencesProps extends RootProps {
  user: User;
}

export const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({ user, dictionary }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pullRequestReviews: true,
    codeComments: true,
    securityAlerts: true,
    weeklyDigest: false,
  });

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement notification preferences update logic
      toast({
        title: dictionary.common.success,
        description: dictionary.organisms.notificationPreferences.updateSuccess,
      });
    } catch (error) {
      toast({
        title: dictionary.common.error,
        description: dictionary.organisms.notificationPreferences.updateError,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{dictionary.organisms.notificationPreferences.title}</CardTitle>
          <CardDescription>{dictionary.organisms.notificationPreferences.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{dictionary.organisms.notificationPreferences.emailNotifications}</Label>
                <p className="text-sm text-muted-foreground">{dictionary.organisms.notificationPreferences.emailNotificationsDescription}</p>
              </div>
              <Switch checked={preferences.emailNotifications} onCheckedChange={() => handleToggle('emailNotifications')} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{dictionary.organisms.notificationPreferences.pullRequestReviews}</Label>
                <p className="text-sm text-muted-foreground">{dictionary.organisms.notificationPreferences.pullRequestReviewsDescription}</p>
              </div>
              <Switch checked={preferences.pullRequestReviews} onCheckedChange={() => handleToggle('pullRequestReviews')} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{dictionary.organisms.notificationPreferences.codeComments}</Label>
                <p className="text-sm text-muted-foreground">{dictionary.organisms.notificationPreferences.codeCommentsDescription}</p>
              </div>
              <Switch checked={preferences.codeComments} onCheckedChange={() => handleToggle('codeComments')} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{dictionary.organisms.notificationPreferences.securityAlerts}</Label>
                <p className="text-sm text-muted-foreground">{dictionary.organisms.notificationPreferences.securityAlertsDescription}</p>
              </div>
              <Switch checked={preferences.securityAlerts} onCheckedChange={() => handleToggle('securityAlerts')} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{dictionary.organisms.notificationPreferences.weeklyDigest}</Label>
                <p className="text-sm text-muted-foreground">{dictionary.organisms.notificationPreferences.weeklyDigestDescription}</p>
              </div>
              <Switch checked={preferences.weeklyDigest} onCheckedChange={() => handleToggle('weeklyDigest')} />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? dictionary.common.saving : dictionary.common.save}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
