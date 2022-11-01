import { Button } from "components/button";
import { Label } from "components/form";
import { Image } from "components/image";
import { defaultAvatar } from "constants/image";
import { handleUpdateAvatar } from "libs/firebase-app";

interface UserUploadAvatarProps {
  avatar: string;
  userId: string;
  values: any;
  setValues: any;
}

const UserUploadAvatar = ({ avatar, userId, values, setValues }: UserUploadAvatarProps) => {
  return (
    <div className="flex flex-col items-center mt-3">
      <Label>Ảnh đại diện</Label>
      <Image
        alt="avatar"
        src={avatar || defaultAvatar}
        className="w-[100px] h-[100px] object-cover mt-1 rounded-full"
      />
      <div className="relative">
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          className="absolute inset-0 opacity-0"
          onChange={(e) => handleUpdateAvatar(e, userId, values, setValues)}
        />
        <Button className="bg-[#c9302c] text-white my-2 inline-block">Upload ảnh</Button>
      </div>
      <span>jpg,jpeg,gif,png nhỏ hơn 2MB</span>
      <span className="italic font-light text-red-500">Avatar tục tĩu sẽ bị khóa vĩnh viễn</span>
    </div>
  );
};

export default UserUploadAvatar;
