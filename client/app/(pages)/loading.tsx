import React from "react";
import Loader from "../components/common/Loader";

const LoadingPage = () => {
  return (
    <div className="h-full w-full">
      <Loader
        title="Loading"
        className="flex flex-col items-center justify-center gap-2"
      />
    </div>
  );
};

export default LoadingPage;
