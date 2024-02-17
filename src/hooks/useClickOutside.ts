import { PlaybackRef } from "@/types/types";
import { useEffect } from "react";

const useClickOutside = (
  elementRef: PlaybackRef,
  setState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        setState(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elementRef, setState]);
};
export default useClickOutside;
