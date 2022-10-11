import { ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

const Image = ({ src, alt = "", ...props }: ImageProps) => {
  return (
    <picture>
      <source srcSet={src} type="image/webp" />
      <img src={src} alt={alt} {...props} />
    </picture>
  );
};

export default Image;
