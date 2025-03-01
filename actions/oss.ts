import OSS from "ali-oss";

import {
  OSS_ACCESS_KEY_ID,
  OSS_ACCESS_KEY_SECRET,
  OSS_BUCKET,
  OSS_REGION,
} from "@/config";

const globalForAliOSS = global as unknown as { aliOSS: OSS | undefined };

export const aliOSS =
  globalForAliOSS.aliOSS ??
  new OSS({
    accessKeyId: OSS_ACCESS_KEY_ID ?? "",
    accessKeySecret: OSS_ACCESS_KEY_SECRET ?? "",
    region: OSS_REGION ?? "",
    bucket: OSS_BUCKET ?? "",
  });
