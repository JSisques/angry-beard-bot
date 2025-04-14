import { PullRequestPageProps } from './PullRequestPage.interface';
import RootTemplate from '@/components/templates/RootTemplate/RootTemplate';
import { PullRequestList } from '@/components/molecules/PullRequestList/PullRequestList';

export const PullRequestPage: React.FC<PullRequestPageProps> = ({ dictionary }) => {
  return (
    <RootTemplate dictionary={dictionary}>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{dictionary.pages.pullRequests.title}</h1>
        <p className="text-sm text-muted-foreground">{dictionary.pages.pullRequests.description}</p>
      </div>
      <div className="h-full">
        <PullRequestList dictionary={dictionary} />
      </div>
    </RootTemplate>
  );
};

export default PullRequestPage;
