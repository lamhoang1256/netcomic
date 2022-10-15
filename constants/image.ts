import { server } from "configs/server";

export const getImage = (img: string) => {
  return `${server}/api/image?url=${encodeURIComponent(img)}`;
};
export const defaultAvatar = "https://e-shopbee.vercel.app/images/default-avatar.png";
