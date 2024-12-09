import { ReactNode } from "react";
import classNames from "classnames";
import Icon from "./icon";
interface iconFontProps {
  children: ReactNode;
  className?: string;
  closeable?: boolean;
  onClose?: () => void;
}

const Modal = function ({ children, className, closeable = true, onClose }: iconFontProps) {
  return (
    <div className="absolute left-0 top-0 w-screen h-screen bg-gray-950/65 animate-show">
      <div className={classNames("bg-bg-normal rounded-xl absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 animate-slideFromLeftBottom", className)}>
        {children}
        {closeable && <Icon name="close" className="absolute right-6 top-6 hover:cursor-pointer active:text-text-shallow" onClick={onClose} />}
      </div>
    </div>
  )
};
export default Modal;