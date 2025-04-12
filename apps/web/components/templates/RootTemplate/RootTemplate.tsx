'use client';

import Loading from '@/app/loading';
import { RootTemplateProps } from './RootTemplate.interface';
import AppSidebar from '@/components/organisms/AppSidebar/AppSidebar';
import { useSession } from '@/hooks/use-session';

const RootTemplate = ({ children, dictionary }: RootTemplateProps) => {
  const { user } = useSession();

  console.log('user', JSON.stringify(user));

  if (!user) return <Loading />;

  return (
    <div className="flex h-screen">
      <AppSidebar user={user} dictionary={dictionary} />
      <div id="content" className="flex flex-col gap-6 w-full p-4 md:p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default RootTemplate;
