import { HTMLAttributes } from "react";
import classNames from "utils/classNames";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutHomeProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const LayoutHome = ({ children, className, ...props }: LayoutHomeProps) => {
  return (
    <div className={classNames("flex flex-col min-h-screen", className)} {...props}>
      <Header />
      <main className="flex-1 py-4">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutHome;
