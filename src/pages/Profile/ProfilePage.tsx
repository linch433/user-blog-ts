import { useUserInfoQuery } from '@/app/store/features/api.ts';

const ProfilePage = () => {
  const { data: userInfo, isLoading, isError } = useUserInfoQuery();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div>
      <p>{userInfo?.name}</p>
      <p>{userInfo?.email}</p>
      <p>{userInfo?.details}</p>
      <p>{userInfo?.skills}</p>
      <p>{userInfo?.dateCreated}</p>
      <p>{userInfo?.extra_details}</p>
      <p>{userInfo?.profession}</p>
      {userInfo?.avatar && (
        <img
          src={`http://test-blog-api.ficuslife.com${userInfo?.avatar}`}
          alt="Profile img"
        />
      )}
    </div>
  );
};

export default ProfilePage;
