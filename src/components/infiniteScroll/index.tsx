import { useEffect, useRef } from "react";
import { IInfineteScrollProps } from "./types";

export const InfiniteScroll = ({ callback }: IInfineteScrollProps) => {
  const divInfiniteScroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const ratio = entry.intersectionRatio;

      if (ratio > 0) {
        callback();
      }
    });

    if (divInfiniteScroll.current) observer.observe(divInfiniteScroll.current);

    return () => {
      observer.disconnect();
    };
  }, [divInfiniteScroll]);

  return <div ref={divInfiniteScroll} />;
};
