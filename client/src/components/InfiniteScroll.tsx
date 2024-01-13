import React, { useEffect } from "react";

type InfiniteScrollProps = {
  isFetching: boolean;
  children: React.ReactNode;
  onScroll: () => void;
};

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  isFetching,
  children,
  onScroll,
}) => {
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

  const handleScroll = () => {
    const isScrolled =
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight;

    if (isScrolled || isFetching) {
      return;
    }

    onScroll();
  };

  return (
    <>
      {children}
      {isFetching && <div className="py-7 text-center">Loading...</div>}
    </>
  );
};

export default InfiniteScroll;
