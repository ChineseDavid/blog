"use client";
import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const sizeHandle = () => {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener('resize', sizeHandle);
    sizeHandle();
    return () => {
      window.removeEventListener('resize', sizeHandle);
    }
  }, [])

  return isMobile;
}
export default useIsMobile;