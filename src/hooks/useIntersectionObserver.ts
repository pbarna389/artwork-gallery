import { useState, useRef, useEffect, MutableRefObject } from "react";

export const useInterSectionObserver = (
  setState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const elementRef: MutableRefObject<HTMLElement | any> = useRef();

  const callbackForObserver = (entries: any) => {
    console.log(entries);
    const [entry] = entries;
    console.log(entry);
    if (entry.isIntersecting) {
      setState(entry.isIntersecting);
    } else return;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackForObserver);
    if (elementRef) observer.observe(elementRef.current);
  }, [elementRef]);

  return [elementRef];
};
