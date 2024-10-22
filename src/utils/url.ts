/**
 *
 * @param {string} dataURL
 * @param {string} fileName
 * @returns File
 */
export async function dataURLToFile(dataURL, fileName) {
  const res = await fetch(dataURL);
  const blob = await res.blob();
  return new File([blob], fileName, {
    type: `${blob?.type.toLowerCase() || ""}`,
  });
}

/**
 * Remove base64 meta description
 * @param {string} base64
 * @returns
 */
export const removeBase64URLMeta = (base64) => {
  const base64Arr = base64?.split(",");
  let base64Link = base64Arr?.[1] || "";
  if (base64Link === undefined) {
    if (base64Arr[0].length >= 1) {
      base64Link = base64Arr[0];
    }
    base64Link = "";
  }
  return base64Link;
};

/**
 * @template {{[x: string]: any}} T
 * @param {URLSearchParams} searchParams
 * @param {T} params
 * @returns {T}
 */
export function urlSearchParamsExtractor<T extends Record<string, any>>(
  searchParams: URLSearchParams,
  params: T = {} as T
): T {
  if (searchParams && params) {
    const result = {} as Record<string, any>;
    for (const key in params) {
      const value = searchParams.get(key);
      result[key] = value || params[key];
    }
    return result as T;
  }
  return params;
}

/**
 *
 * @param {string} url
 * @returns
 */
export function isAbsoluteUrl(url) {
  return new RegExp(`(^|:)//`).test(url);
}

/**
 *
 * @param {string | undefined} base
 * @param {string | undefined} url
 * @returns {string}
 */
export function joinUrls(base, url) {
  if (!base) {
    return url;
  }
  if (!url) {
    return base;
  }

  if (isAbsoluteUrl(url)) {
    return url;
  }

  const withoutTrailingSlash = (url) => url.replace(/\/$/, "");
  const withoutLeadingSlash = (url) => url.replace(/^\//, "");

  const delimiter = base.endsWith("/") || !url.startsWith("?") ? "/" : "";
  base = withoutTrailingSlash(base);
  url = withoutLeadingSlash(url);

  return `${base}${delimiter}${url}`;
}
