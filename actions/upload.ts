'use server'
import { aliOSS } from "./oss";

export const uploadFile = async (
  formData: FormData,
): Promise<{ error?: string; url?: string }> => {
  try {
    const blob = formData.get("file") as Blob;
    const fileName = formData.get("filename") as string; // 从客户端传递文件名

    // 转换为 Buffer
    const buffer = Buffer.from(await blob.arrayBuffer());

    // 上传到 OSS
    const { name } = await aliOSS.put(fileName, buffer);
    let url = aliOSS.generateObjectUrl(name);
    url = url.replace(/http:\/\//g, "https://");
    return { url };
  } catch (error) {
    console.error("Upload failed:", error);
    return { error: "文件上传失败，请重试" };
  }
};