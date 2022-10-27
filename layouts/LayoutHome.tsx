import { HTMLAttributes } from "react";
import classNames from "utils/classNames";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutHomeProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const LayoutHome = ({ children, className, ...props }: LayoutHomeProps) => {
  return (
    <div className={classNames("flex flex-col min-h-screen", className)} {...props}>
      <Header />
      <main className="flex-1 md:p-5">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutHome;
