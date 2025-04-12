import { RootTemplateProps } from './RootTemplate.interface';
import AppSidebar from '@/components/organisms/AppSidebar/AppSidebar';
const RootTemplate = ({ children, dictionary }: RootTemplateProps) => {
  return (
    <div className="flex h-screen">
      <AppSidebar dictionary={dictionary} />
      <div id="content" className="flex flex-col gap-6 w-full p-4 md:p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default RootTemplate;
