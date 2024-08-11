type UserProfileProps = {
  name: string | null;
  bio: string | null;
  image: string | null;
  coverImage: string | null;
};

export const Info = ({ name, bio, image, coverImage }: UserProfileProps) => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-white shadow-md rounded-lg">
      <img
        src={coverImage ? coverImage : "   "}
        alt={`${name}'s cover`}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      <div className="flex items-center space-x-4">
        <img
          src={image ?? undefined}
          alt={`${name}'s profile`}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-gray-600">{bio}</p>
        </div>
      </div>
    </div>
  );
};
