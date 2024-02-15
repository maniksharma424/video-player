import React from "react";

const LoadingContainer: React.FC<{ loading: boolean; children: any }> = ({
  children,
  loading,
}) => {
  if (loading)
    return (
      <div className="w-full h-screen flex justify-center">
        <div className="w-10 h-10 border-2 border-t-black border-white animate-spin rounded-full"></div>
      </div>
    );
  return <div>{children}</div>;
};

export default LoadingContainer;
