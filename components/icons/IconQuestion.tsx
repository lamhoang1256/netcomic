import classNames from "utils/classNames";

interface IconQuestionProps extends React.SVGProps<SVGSVGElement> {}

const IconQuestion = ({ className, ...props }: IconQuestionProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classNames("w-6 h-6", className)}
      {...props}
      viewBox="0 0 512 512"
    >
      <title>Help Circle</title>
      <path
        d="M256 80a176 176 0 10176 176A176 176 0 00256 80z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
      />
      <path
        d="M200 202.29s.84-17.5 19.57-32.57C230.68 160.77 244 158.18 256 158c10.93-.14 20.69 1.67 26.53 4.45 10 4.76 29.47 16.38 29.47 41.09 0 26-17 37.81-36.37 50.8S251 281.43 251 296"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="28"
      />
      <circle cx="250" cy="348" r="20" />
    </svg>
  );
};

export default IconQuestion;
