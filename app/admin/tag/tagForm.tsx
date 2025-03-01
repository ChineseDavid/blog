"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import React, { useState } from "react";
import CreateTagModal from "./createTagModal";

export default function TagForm({ onKeyValueChange }: { onKeyValueChange: (value: string) => void }) {
  const [visible, setVisible] = useState(false);
  const [keyValue, setKeyValue] = useState(""); // 搜索关键字

  const onCreate = () => {
    setVisible(true);
  };
  return (
    <div className="flex mb-3">
      <Input value={keyValue} onChange={e => {
        setKeyValue(e.target.value);
      }} />
      <Button name="搜索" icon="search" className="ml-3" onClick={()=>{
        onKeyValueChange(keyValue);
      }} />
      <Button name="创建" icon="add" className="ml-3" onClick={onCreate} />
      {visible && (
        <CreateTagModal onClose={() => {
          setVisible(false)
        }
        } />
      )}
    </div>
  );
}
