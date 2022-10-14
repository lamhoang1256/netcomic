import { server } from "configs/server";

export const getImage = (img: string) => {
  return `${server}/api/image?url=${encodeURIComponent(img)}`;
};
export const avatar =
  "https://res.cloudinary.com/lamhoang1256/image/upload/v1659780525/shopbee/1a2d07a2d37fffb914b22345dbfebfd3.jpg";
