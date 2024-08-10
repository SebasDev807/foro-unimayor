import UserProfile from '@/components/userprofile';
import Modules from '@/components/modules';

const ProfilePage = () => {
  return (
    <div className="flex flex-row gap-[48px] px-6">
      <div className="w-3/4">
        <UserProfile /> 
      </div>
            {/* Right Column */}
            <div className="w-1/4">
        <div className="sticky top-4">
          <Modules />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;