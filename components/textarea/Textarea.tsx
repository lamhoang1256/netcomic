import classNames from "utils/classNames";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({ className, ...props }: TextareaProps) => {
  return (
    <textarea
      className={classNames("w-full p-3 border rounded outline-none border-gray8a", className)}
      {...props}
    ></textarea>
  );
};

export default Textarea;
