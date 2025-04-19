import { AuthForm } from '@/components/organisms/AuthForm/AuthForm';
import AuthTemplate from '@/components/templates/AuthTemplate/AuthTemplate';
import { AuthPageProps } from './AuthPage.interface';

export default function AuthPage({ dictionary }: AuthPageProps) {
  return (
    <AuthTemplate dictionary={dictionary}>
      <AuthForm dictionary={dictionary} />
    </AuthTemplate>
  );
}
