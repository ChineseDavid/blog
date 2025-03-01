"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Icon from './icon';
import classNames from 'classnames';

type CellValue = string | number | boolean | null | undefined | React.ReactNode;

export type TableColumn = {
  title: string;
  dataKey: string; // 键名
  icon?: string;
  width?: number;
  onSort?: (column: TableColumn) => void; // 表头点击事件的回调函数，传入被点击的列配置
  renderCell?: (row: TableRow) => React.ReactNode; // 自定义渲染单元格内容的函数，传入单元格值和整行数据
};

export interface TableRow {
  key: string;
  [key: string]: CellValue;
}

type TableProps = {
  columns: TableColumn[];
  data: TableRow[];
};

const RightShadowClass = 'transition after:content-[""] after:absolute after:top-0 after:right-0 after:bottom-[-1px] after:w-[30px] after:translate-x-full after:shadow-[inset_10px_0_8px_-8px_#00000026]';

const Table = ({ columns, data }: TableProps) => {
  const sortRef = useRef(new Map());
  const tableRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [tableHeight, setTableHeight] = useState(0);

  useEffect(() => {
    const sort = sortRef.current;
    columns.forEach((column) => {
      if (column.onSort) {
        // 'desc' | 'asc'
        sort.set(column.dataKey, 'desc');
      };
    });
  }, [columns]);

  useLayoutEffect(() => {
    const tableEle = tableRef.current;
    const scrollHandle = () => {
      setScrollLeft(tableEle?.scrollLeft || 0);
    }
    if (tableEle) {
      tableEle.addEventListener('scroll', scrollHandle);
      setTableHeight(tableEle.clientHeight);
    }
    return () => {
      if (tableEle) {
        tableEle.removeEventListener('scroll', scrollHandle)
      }
    }
  }, [tableRef])


  return (
    <div className='relative'>
      <div className="border rounded-xl w-fit absolute max-w-full flex overflow-x-auto overflow-y-clip" ref={tableRef}>
        <table className="">
          <thead>
            <tr className='border-b'>
              {columns.map((column, index) => (
                <th
                  key={column.dataKey}
                  onClick={() => column.onSort?.(column)}
                  style={{
                    minWidth: column.width && `${column.width}px`,
                  }}
                  className={classNames('px-3 py-2 text-left text-text-shallow font-normal', column.width && `min-w-[${column.width}px]`, {
                    // 单独给左侧的表头添加黏附 更好的展示
                    'sticky left-0 bg-bg-normal': index === 0,
                    [RightShadowClass]: index === 0 && scrollLeft > 0,
                  })}
                >
                  {column.icon && <Icon name={column.icon} className='mr-1' />}
                  {column.title}
                  {column.onSort && <Icon name={sortRef.current.get(column) === 'desc' ? 'paixu' : 'paixu-r'} />}
                </th>
              ))
              }
            </tr>
          </thead>
          <tbody>
            {data.length ? data.map((row) => (
              <tr key={row.key} className='border-b last:border-b-0'>
                {columns.map((column, index) => (
                  <td key={`${row.key}-${column.dataKey}`}
                    className={classNames('px-3 py-2 text-left text-text-shallow font-normal', {
                      "sticky left-0 bg-bg-normal": index === 0,
                      [RightShadowClass]: index === 0 && scrollLeft > 0,
                    })}>

                    {column.renderCell ? (
                      column.renderCell(row)
                    ) : (
                      row[column.dataKey]
                    )}
                  </td>
                ))}
              </tr>
            )) : <tr className='border-b last:border-b-0'>
              
                <td
                  className={classNames('px-3 py-2 text-left text-text-shallow font-normal text-center')} colSpan={999}>
                  暂无数据
                </td>
            </tr>}
          </tbody>
        </table>
      </div>
      <div className='relative z-[-1]' style={{ height: tableHeight && `${tableHeight}px` }} />
    </div>
  );
};

export default Table;