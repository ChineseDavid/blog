import React from 'react'
import Icon from './icon';
import classNames from 'classnames';

type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  name: string;
  icon?: string;
  size?: Size;
  className?: string;
}

export default function Button({ name, icon, className, size = 'md' }: ButtonProps) {
  return (
    <div className={classNames('select-none bg-text-normal text-bg-normal px-3 rounded-md hover:cursor-pointer hover:bg-text-shallow active:bg-text-normal transition', className, {
      'leading-8 text-sm px-3': size ==='sm',
      'leading-9 text-md px-4': size ==='md',
    })}>
      {icon && <Icon name={icon} className='mr-1' />}
      {name}
    </div>
  )
}
