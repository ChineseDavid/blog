import classNames from 'classnames'
import React, { useEffect, useId, useMemo, useRef, useState } from 'react'
import Icon from './icon';
import Input from './input';

type Size = 'sm' | 'md' | 'lg';
export interface SelectItem {
  name: string;
  value: string;
}
interface InputProps {
  size?: Size;
  type?: 'text' | 'password' | 'email' | 'number';
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (values: string) => void;
  defaultValue?: string;
  required?: boolean;
  data: SelectItem[];
}

export default function Select({ label, name, required, placeholder = "请输入", defaultValue, value = '', onChange, className, size = 'md', data }: InputProps) {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [values, setValues] = useState<string[]>(() => {
    const initialValue = value || defaultValue;
    return initialValue ? initialValue.split(',') : [];
  });
  const [keyword, setKeyword] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);
  const filterData = useMemo(() => {
    if (!keyword) return data;
    return data.filter(item => item.name.includes(keyword));
  }, [data, keyword]);
  const toggleValue = (value: SelectItem) => {
    const newValue = values.some(item => item === value.value)
      ? values.filter(item => item !== value.value)
      : [...values, value.value];
    console.log(values, value, newValue)
    const newValueString = newValue.join(',');
    setValues(newValue);
    onChange?.(newValueString);
    setInputValue(newValueString);
  };

  const tagsElement = useMemo(() => {
    return values.map(value => {
      const selectedItem = data.find(item => item.value === value);
      if (selectedItem) {
        return <div key={value} className='rounded-2xl bg-text-shallow px-3 text-bg-normal'>{selectedItem.name}</div>;
      }
      return null;
    }).filter(item => item !== null);
  }, [values, data]);

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  return (
    <div className={classNames('relative select-none select-com', className)} ref={selectRef}>
      {label && <label className={classNames("block mb-2 text-sm text-text-shallow", {
        "after:content-['*'] after:ml-0.5 after:text-red-500": required,
      })}>{label}</label>}
      <div className={classNames(
        'py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500 bg-white  flex items-center gap-1 hover:cursor-pointer relative',
        {
          'h-8 px-2': size === 'sm',
          'h-9 px-3': size === 'md',
        }, className)} onClick={() => setVisible(!visible)} >
        {values.length ?
          tagsElement
          : <div className='text-gray-300'>{placeholder}</div>}
        <input type="hidden" name={name} defaultValue={defaultValue} value={inputValue} />
        <Icon name="down" className={classNames('text-text-shallower transition-all absolute right-2', visible && 'rotate-180')} />
      </div>
      {visible && <div className='bg-white absolute w-60 border rounded-xl top-[72px] z-10'>
        <div className='relative flex px-3 py-2 border-b'>
          <Icon name="search" className='mr-2' />
          <input placeholder='查询' className='w-full border-none outline-none flex-1' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </div>
        <div className='flex flex-col p-1 gap-1 max-h-52 overflow-y-auto'>
          {filterData.map(item =>
            <div onClick={() => toggleValue(item)} key={item.value} className='pl-10 relative h-10 flex items-center hover:bg-bg-shallow rounded-md text-text-normal shrink-0'>
              {values.some(obj => obj === item.value) && <Icon name="select" className='absolute left-3 top-[10px] text-green-600' />}
              {item.name}
            </div>
          )}
        </div>
      </div>}
    </div>
  )
}
