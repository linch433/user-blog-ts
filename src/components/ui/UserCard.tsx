import { additionalUrl } from '@/app/baseUrl.ts';
import { getFormatDate } from '@/utils/helpers/DateFormat.ts';
import { IUser } from '@/types/models.ts';

interface IUserCard {
  user: IUser;
}

const UserCard = ({ user }: IUserCard) => {
  return (
    <div key={user._id} className="bg-secondary-dark-blue rounded p-1">
      {user.avatar && (
        <img
          alt={`${user.name} profile image`}
          src={`${additionalUrl + user.avatar}`}
          loading="lazy"
          className="bg-contain w-96 rounded"
        />
      )}
      <div className="flex-1 text-base">
        <p className="truncate">{user.name}</p>
        <p className="truncate">{user.email}</p>
        <p className="truncate">{getFormatDate(user.dateCreated as string)}</p>
      </div>
    </div>
  );
};

export default UserCard;
