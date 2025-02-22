export const unescape = (val: string) =>
  val
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "\'")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ");
