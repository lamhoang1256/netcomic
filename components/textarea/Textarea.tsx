interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({ ...props }: TextareaProps) => {
  return (
    <textarea
      className="w-full p-3 border rounded outline-none border-gray8a"
      {...props}
    ></textarea>
  );
};

export default Textarea;
