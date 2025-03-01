'use server'
import { aliOSS } from "./oss";

export const uploadFile = async (
  formData: FormData,
): Promise<{ error?: string; url?: string }> => {

  // Get file from formData
  const file = formData.get("file") as File;

  const { name } = await aliOSS.put(file.name, file);
  let url = aliOSS.generateObjectUrl(name);
  if (url) {
    // 阿里云 OSS 上传后返回的链接是默认是http协议的（但实际上它是也支持https），这里手动替换成https
    // 因为线上环境网站是使用https协议的，网站里面所有的链接/请求都应该走https（最佳实践是这样）
    // 要不然浏览器搜索栏会有个小感叹号，不太好看
    url = url.replace(/http:\/\//g, "https://");
  }
  return { url };
};