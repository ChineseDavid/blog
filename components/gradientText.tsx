
'use client';

import { useEffect, useState } from "react";

interface GradientTextProps {
  className?: string;
  text: string[];
}
const Delay = 150;
export default function GradientText({ className, text, ...other }: GradientTextProps) {
  const [showText, setShowText] = useState("");
  useEffect(() => {
    let currentTextIndex = 0;
    let index = 0;
    let add = 1;
    let timer:number;
    const timerHandle = () => {
      index += add;
      setShowText(text[currentTextIndex].slice(0,index));
      if(index > text[currentTextIndex].length) {
        add = -1;
      }
      if(index <= 0) {
        add = 1;
        currentTextIndex++;
        if(currentTextIndex>=text.length) {
          currentTextIndex = 0;
        }
      }
      timer = window.setTimeout(timerHandle, Delay);
    }
    timer = window.setTimeout(timerHandle, Delay);
    return ()=>{
      clearTimeout(timer);
    }
  }, [text])
  return <>
    <span className={` ${className}`} {...other}>{showText}</span>
    <span className={`inline-block bg-text-normal w-[2px] md:w-1 h-full align-bottom animate-flicker ${className}`} ></span>
  </>
}