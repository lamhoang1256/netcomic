import classNames from "utils/classNames";

interface IconRefreshProps extends React.SVGProps<SVGSVGElement> {}

const IconRefresh = ({ className }: IconRefreshProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("w-4 h-4", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );
};

export default IconRefresh;
