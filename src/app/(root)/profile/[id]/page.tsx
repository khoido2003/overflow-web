import { FilterBarMobile } from "@/components/filter-bar-mobile";
import ProfileInfo from "../_components/profile-infor";
import UserQuestion from "../_components/user-question";
import { filterBarUserQuestion } from "@/constants";
import UserTag from "../_components/user-tag";

interface PageProps {
  params: {
    id: string;
  };
}

const ProfilePage = ({ params }: PageProps) => {
  return (
    <div className="flex flex-col">
      <ProfileInfo userId={params.id} />

      <div className="mt-5 flex gap-10">
        <div className="flex-[2]">
          <div className="my-5 flex items-center">
            <h2 className="text-profile-secondary">All Posts</h2>
            <div className="ml-auto">
              <FilterBarMobile filters={filterBarUserQuestion} />
            </div>
          </div>

          <UserQuestion userId={params.id} />
        </div>

        <div className="hidden flex-[1] lg:block">
          <UserTag userId={params.id} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
