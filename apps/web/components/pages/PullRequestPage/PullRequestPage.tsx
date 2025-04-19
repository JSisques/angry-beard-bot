import { PullRequestPageProps } from './PullRequestPage.interface';
import RootTemplate from '@/components/templates/RootTemplate/RootTemplate';
import { PullRequestList } from '@/components/molecules/PullRequestList/PullRequestList';
import PageHeader from '@/components/organisms/PageHeader/PageHeader';
export const PullRequestPage: React.FC<PullRequestPageProps> = ({ dictionary }) => {
  return (
    <RootTemplate dictionary={dictionary}>
      <PageHeader title={dictionary.pages.pullRequests.title} description={dictionary.pages.pullRequests.description} />
      <div className="h-full">
        <PullRequestList dictionary={dictionary} />
      </div>
    </RootTemplate>
  );
};

export default PullRequestPage;
