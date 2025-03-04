import classNames from "classnames";
import IconButton from "./iconButton"
import { useContext, useEffect, useRef, useState } from "react";
import { Theme } from "@/hook/useTheme";
import { GlobalContext } from "@/context/globalContext";

const ToggleThemeList = [
  { name: '浅色', value: Theme.LIGHT },
  { name: '深色', value: Theme.DARK },
  { name: '跟随系统', value: Theme.STSTEM },
]

const ToggleTheme = () => {
  const globalContext = useContext(GlobalContext);
  const [visible, setVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const clickHandle = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setVisible(false);
      }
    }
    document.addEventListener('click', clickHandle, false);
    return () => {
      document.removeEventListener('click', clickHandle);
    }
  }, [])
  return <div className="flex relative" ref={dropdownRef}>
    <IconButton name={globalContext?.theme === Theme.DARK ? 'moon' : 'sun'} onClick={() => setVisible(!visible)} />
    <div className={classNames('animate-emerge select-none absolute top-10 right-0 border border-text-shallowest p-1 rounded-lg shadow-md bg-bg-normal z-10', { hidden: !visible })}>
      {ToggleThemeList.map(item => <div key={item.value} className="hover:cursor-pointer w-28 hover:bg-bg-shallow py-1.5 text-sm text-shallow  rounded-lg px-2" onClick={() => {
        globalContext?.setTheme(item.value);
        setVisible(false);
      }}>{item.name}</div>)}
    </div>
  </div>
}
export default ToggleTheme;