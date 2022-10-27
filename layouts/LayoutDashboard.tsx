import { DashboardSidebar } from "modules/dashboard";
import { HTMLAttributes } from "react";
import Header from "./Header";

interface LayoutDashboardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  desc: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}

const LayoutDashboard = ({ title, desc, subtitle, children }: LayoutDashboardProps) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="px-5">
          <div className="flex flex-col gap-6 mt-8 lg:flex-row">
            <DashboardSidebar />
            <div className="flex-1 p-5 pb-10 bg-white dark:bg-dark1a rounded-xl">
              <div className="flex flex-wrap justify-between">
                <div className="pb-5">
                  <h2 className="text-lg font-medium">{title}</h2>
                  <span>{desc}</span>
                </div>
                {subtitle && subtitle}
              </div>
              <div>{children}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LayoutDashboard;
