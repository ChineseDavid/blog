import React from 'react'
import Icon from './icon';
import classNames from 'classnames';

type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  name: string;
  icon?: string;
  size?: Size;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export default function Button({ name, icon, className, type = "button", size = 'md', onClick }: ButtonProps) {
  return (
    <button type={type} className={classNames('select-none bg-text-normal text-bg-normal px-3 rounded-[12px] hover:cursor-pointer hover:bg-text-shallow whitespace-nowrap active:bg-text-normal transition', className, {
      'leading-8 text-sm px-3': size === 'sm',
      'leading-9 text-md px-4': size === 'md',
      'leading-10 text-md px-4': size === 'lg',
    })} onClick={onClick}>
      {icon && <Icon name={icon} className='mr-1' />}
      {name}
    </button>
  )
}
