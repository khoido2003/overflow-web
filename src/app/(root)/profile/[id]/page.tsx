import ProfileCard from "../_components/profile-card";
import ProfileStats from "../_components/profile-stats";

const ProfilePage = () => {
  return (
    <div className="flex flex-col">
      <ProfileCard />

      <ProfileStats />
    </div>
  );
};

export default ProfilePage;
