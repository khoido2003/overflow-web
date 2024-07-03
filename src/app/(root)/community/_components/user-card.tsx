import Image from "next/image";
import Link from "next/link";

interface UserCardProps {
  user: {
    id: string;
    name: string;
    username: string;
    image: string;
  };
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link
      href={`/profile/${user.id}`}
      className="flex flex-1 flex-col items-center justify-between gap-3 rounded-xl border border-[#C8CBD954] bg-white px-8 py-6 shadow-md dark:border-[#151821] dark:bg-[#0F1117] md:gap-5 md:px-10 md:py-8"
    >
      <div className="flex flex-col items-center gap-2 md:gap-4">
        <Image
          src={user.image || "/assets/images/user-pro.png"}
          alt="User Avater"
          width={100}
          height={100}
          className="h-[100px] w-[100px] rounded-full"
        />
        <div className="text-center">
          <h4 className="line-clamp-1 text-xl font-bold text-[#0F1117] dark:text-white">
            {user.name}
          </h4>
          {user.username && (
            <p className="line-clamp-1 text-sm text-[#3F4354] dark:text-[#7B8EC8]">
              @{user.username}
            </p>
          )}
        </div>
      </div>
      <div>
        <span>HTML</span>
        <span>HTML</span>
        <span>HTML</span>
      </div>
    </Link>
  );
};

export default UserCard;
