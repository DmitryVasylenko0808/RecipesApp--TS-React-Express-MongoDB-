import React from "react";

const Loading = () => {
  return (
    <div className="py-7 flex justify-center">
      <div className="w-[72px] h-[72px] border-4 border-x-red border-y-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loading;
