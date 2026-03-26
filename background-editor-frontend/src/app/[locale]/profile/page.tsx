import ProfilePageContent from '@page-content/profile-page';
import AuthGuard from '@shared/utils/auth-guard';

export default function Profile() {
  return (
    <AuthGuard>
      <ProfilePageContent />
    </AuthGuard>
  );
}
