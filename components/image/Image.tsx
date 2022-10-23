import { ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

const Image = ({ src, alt = "", className, ...props }: ImageProps) => {
  return (
    <picture>
      <source srcSet={src} type="image/webp" />
      <img src={src} alt={alt} className={className} {...props} />
    </picture>
  );
};

export default Image;
