interface TemplateProps {
  title: string;
  desc: string;
  children: React.ReactNode;
}

const Template = ({ title, desc, children }: TemplateProps) => {
  return (
    <div className="px-3 pt-5 pb-10 bg-white dark:bg-dark26 md:px-5 shadow-template rounded-xl">
      <div className="border-b-[1px] pb-4 border-[#efefef]">
        <h2 className="text-lg font-medium">{title}</h2>
        <span>{desc}</span>
      </div>
      <div>{children}</div>
    </div>
  );
};

Template.defaultProps = {
  subtitle: ""
};

export default Template;
