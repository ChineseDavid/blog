import React from 'react';
import highlight from '@bytemd/plugin-highlight';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import zhHans from 'bytemd/locales/zh_Hans.json';
import { uploadFile } from '@/actions/upload';
import { addToast } from '@heroui/react';

interface MarkdownProps {
  value?: string;
  onChange?: (newMarkdown: string) => void;
}

const plugins = [gfm(), highlight()];

const MarkdownPage = ({ value, onChange }: MarkdownProps) => {
  const initialMarkdown = '# 你好!\n\n这是一个简单的内容示例.';
  const [markdown, setMarkdown] = React.useState(value ?? initialMarkdown);

  const handleChange = (newMarkdown: string) => {
    setMarkdown(newMarkdown);
    if (onChange) {
      onChange(newMarkdown);
    }
  };

  const handleUploadImages = async (files: File[]) => {
    const uploadedImages = [];
    // 暂时仅支持上传1张图片
    const file = files[0];
    const arrayBuffer = await file.arrayBuffer(); // 转换为 ArrayBuffer
    const formData = new FormData();
    formData.append("file", new Blob([arrayBuffer]), file.name); // 用 Blob 包装
    formData.append("filename", file.name); // 用 Blob 包装
    const { url, error } = await uploadFile(formData);

    if (error) {
      addToast({
        title: `上传失败: ${error}`,
      })
    }

    if (url) {
      addToast({
        title: `上传成功`,
      })
      uploadedImages.push({ url });
    }

    return uploadedImages;
  };

  return (
    <Editor
      value={markdown}
      onChange={handleChange}
      plugins={plugins}
      locale={zhHans}
      uploadImages={handleUploadImages}
    />
  );
};

export default MarkdownPage;