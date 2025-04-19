'use client';

import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import { RootProps } from '@/interfaces/Root/Root.interface';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms/card';
import { Switch } from '@/components/atoms/switch';

interface SecuritySettingsProps extends RootProps {
  user: User;
}

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({ user, dictionary }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement password change logic
      toast({
        title: dictionary.common.success,
        description: dictionary.organisms.securitySettings.passwordUpdateSuccess,
      });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast({
        title: dictionary.common.error,
        description: dictionary.organisms.securitySettings.passwordUpdateError,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorToggle = async () => {
    try {
      // TODO: Implement 2FA toggle logic
      setTwoFactorEnabled(!twoFactorEnabled);
      toast({
        title: dictionary.common.success,
        description: twoFactorEnabled
          ? dictionary.organisms.securitySettings.twoFactorDisabled
          : dictionary.organisms.securitySettings.twoFactorEnabled,
      });
    } catch (error) {
      toast({
        title: dictionary.common.error,
        description: dictionary.organisms.securitySettings.twoFactorError,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{dictionary.organisms.securitySettings.changePassword}</CardTitle>
          <CardDescription>{dictionary.organisms.securitySettings.changePasswordDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">{dictionary.organisms.securitySettings.currentPassword}</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">{dictionary.organisms.securitySettings.newPassword}</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{dictionary.organisms.securitySettings.confirmPassword}</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? dictionary.common.saving : dictionary.common.save}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{dictionary.organisms.securitySettings.twoFactorAuth}</CardTitle>
          <CardDescription>{dictionary.organisms.securitySettings.twoFactorDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{dictionary.organisms.securitySettings.twoFactorStatus}</Label>
              <p className="text-sm text-muted-foreground">
                {twoFactorEnabled ? dictionary.organisms.securitySettings.twoFactorEnabled : dictionary.organisms.securitySettings.twoFactorDisabled}
              </p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={handleTwoFactorToggle} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
