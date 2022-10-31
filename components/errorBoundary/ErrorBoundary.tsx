import { Button } from "components/button";
import { Icon404 } from "components/icons";
import React, { Component, ErrorInfo } from "react";

interface IErrorBoundaryProps {
  children: React.ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  public static getDerivedStateFromError() {
    return { hasError: true };
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Lỗi: ", error);
    console.error("Thông tin lỗi: ", errorInfo);
  }
  public render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="flex flex-col items-center justify-center px-2 py-6 text-base text-red-500 bg-red-100 gap-y-2">
          <Icon404 />
          <span className="text-lg font-semibold">Đã xảy ra lỗi vui lòng thử lại sau!</span>
          <Button className="mt-2 text-white bg-red-400">Về trang chủ</Button>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
