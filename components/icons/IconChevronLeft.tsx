import classNames from "utils/classNames";

interface IconChevronLeftProps extends React.SVGProps<SVGSVGElement> {}

const IconChevronLeft = ({ className, ...props }: IconChevronLeftProps) => {
  return (
    <svg
      viewBox="0 0 1792 1792"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("w-4 h-4", className)}
      {...props}
    >
      <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z" />
    </svg>
  );
};

export default IconChevronLeft;
