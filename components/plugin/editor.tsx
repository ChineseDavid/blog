import React from 'react';
import highlight from '@bytemd/plugin-highlight';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import zhHans from 'bytemd/locales/zh_Hans.json';
import { uploadFile } from '@/actions/upload';
import Toast from './toast';

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

    for (const file of files) {
      const fd = new FormData();
      fd.append('file', file);

      const { url, error } = await uploadFile(fd);

      if (error) {
        Toast({
          text: `上传失败: ${error}`,
          duration: 3000,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true,
        }).showToast();
        continue;
      }

      if (url) {
        Toast({
          text: '上传成功',
          duration: 3000,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true,
        }).showToast();
        uploadedImages.push({ url });
      }
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