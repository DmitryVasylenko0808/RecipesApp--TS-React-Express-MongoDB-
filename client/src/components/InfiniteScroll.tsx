import React, { useEffect } from "react";
import Loading from "./Loading";

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
      {isFetching && <Loading />}
    </>
  );
};

export default InfiniteScroll;
