import React from "react";
import Icon from "./icon";
import classNames from "classnames";
interface IconButtonProps {
  name: string;
  size?: string;
  className?: string;
  onClick?: () => void;
}

export default function IconButton({ className, name, size, onClick }: IconButtonProps) {
  return <div className={classNames("transition border border-text-shallowest size-8 rounded-lg inline-flex items-center justify-center hover:cursor-pointer hover:border-text-shallower hover:bg-bg-shallow", className)} onClick={onClick}>
    <Icon name={name} size={size} />
  </div>
}