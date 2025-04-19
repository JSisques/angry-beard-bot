'use client';
import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/avatar';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import { RootProps } from '@/interfaces/Root/Root.interface';
import { useToast } from '@/hooks/use-toast';

interface ProfileFormProps extends RootProps {
  user: User;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user, dictionary }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.user_metadata.full_name || '',
    email: user.email || '',
    avatarUrl: user.user_metadata.avatar_url || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement profile update logic
      toast({
        title: dictionary.common.success,
        description: dictionary.organisms.profileForm.updateSuccess,
      });
    } catch (error) {
      toast({
        title: dictionary.common.error,
        description: dictionary.organisms.profileForm.updateError,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={formData.avatarUrl} alt={formData.fullName} />
          <AvatarFallback>{formData.fullName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <Button type="button" variant="outline">
            {dictionary.organisms.profileForm.changeAvatar}
          </Button>
          <p className="text-sm text-muted-foreground">{dictionary.organisms.profileForm.avatarDescription}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">{dictionary.organisms.profileForm.fullName}</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder={dictionary.organisms.profileForm.fullNamePlaceholder}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{dictionary.organisms.profileForm.email}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={dictionary.organisms.profileForm.emailPlaceholder}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? dictionary.common.saving : dictionary.common.save}
        </Button>
      </div>
    </form>
  );
};
