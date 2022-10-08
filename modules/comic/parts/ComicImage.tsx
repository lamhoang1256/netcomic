import { ImgHTMLAttributes } from "react";
import classNames from "utils/classNames";

interface ComicImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

const ComicImage = ({ src, alt, className, ...props }: ComicImageProps) => {
  return (
    <picture>
      <source srcSet={src} type="image/webp" />
      <img
        alt={alt}
        src={src}
        className={classNames("object-cover w-full h-full", className)}
        {...props}
      />
    </picture>
  );
};

export default ComicImage;
