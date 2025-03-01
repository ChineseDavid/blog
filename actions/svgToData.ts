// 将 SVG XML 字符串转换为 Data URL
export function svgXmlToDataUrl(svgXml: string): string {
  try {
    return btoa(svgXml);
  }catch{
    return '';
  }
}

// 将 Data URL 转换为 SVG XML 字符串
export function dataUrlToSvgXml(dataUrl: string): string {
  try {
    return atob(dataUrl);
  }catch{
    return '';
  }
}

export function dataUrlToView(dataUrl: string): string {
  try {
    return `data:image/svg+xml;base64,${dataUrl}`;
  }catch{
    return '';
  }
}