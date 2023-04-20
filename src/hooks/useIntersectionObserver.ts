import { useState, useRef, useEffect, MutableRefObject } from "react";

export const useInterSectionObserver = (
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  ref: MutableRefObject<HTMLElement | any>
) => {
  const [observerTimeout, setObserverTimeout] = useState<NodeJS.Timeout>();
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
    if (ref) {
      const id = setTimeout(() => {
        observer.observe(ref.current);
      }, 10);
      setObserverTimeout(id);
    }
    clearTimeout(observerTimeout);
  }, [ref]);

  return [ref];
};
