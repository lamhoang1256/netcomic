import { server } from "configs/server";

export const getImage = (img: string) => {
  return `${server}/api/image?url=${encodeURIComponent(img)}`;
};
