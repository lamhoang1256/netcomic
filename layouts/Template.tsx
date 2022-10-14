interface TemplateProps {
  title: string;
  desc: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}

const Template = ({ title, desc, subtitle, children }: TemplateProps) => {
  return (
    <div className="p-5 pb-10 bg-white shadow-template rounded-xl">
      <div className="flex flex-wrap justify-between">
        <div className="border-b-[1px] pb-5 border-[#efefef]">
          <h2 className="text-lg font-medium">{title}</h2>
          <span>{desc}</span>
        </div>
        {subtitle && subtitle}
      </div>
      <div>{children}</div>
    </div>
  );
};

Template.defaultProps = {
  subtitle: "",
};

export default Template;
