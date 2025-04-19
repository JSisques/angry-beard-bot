'use client';

import PageHeader from '@/components/organisms/PageHeader/PageHeader';
import RootTemplate from '@/components/templates/RootTemplate/RootTemplate';
import React, { useState } from 'react';
import { ProfilePageProps } from './ProfilePage.interface';
import { useSession } from '@/hooks/use-session';
import Loading from '@/app/loading';
import { ProfileForm } from '@/components/organisms/ProfileForm/ProfileForm';
import { SecuritySettings } from '@/components/organisms/SecuritySettings/SecuritySettings';
import { NotificationPreferences } from '@/components/organisms/NotificationPreferences/NotificationPreferences';
import { Card } from '@/components/atoms/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/tabs';

const ProfilePage = ({ dictionary }: ProfilePageProps) => {
  const { user } = useSession();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) return <Loading />;

  return (
    <RootTemplate dictionary={dictionary}>
      <PageHeader title={dictionary.pages.profile.title} description={dictionary.pages.profile.description} />

      <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">{dictionary.pages.profile.tabs.profile}</TabsTrigger>
          <TabsTrigger value="security">{dictionary.pages.profile.tabs.security}</TabsTrigger>
          <TabsTrigger value="notifications">{dictionary.pages.profile.tabs.notifications}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6">
            <ProfileForm user={user} dictionary={dictionary} />
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <SecuritySettings user={user} dictionary={dictionary} />
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <NotificationPreferences user={user} dictionary={dictionary} />
          </Card>
        </TabsContent>
      </Tabs>
    </RootTemplate>
  );
};

export default ProfilePage;
