function isBase64DataURL(dataURL?: string) {
  if (typeof dataURL !== "string") return false;
  const base64Match = dataURL.match(/^data:[^;]+;base64,([^,]+)$/);

  if (base64Match) {
    const base64Data = base64Match[1];
    try {
      atob(base64Data);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {}
  }

  return false;
}

/**
 *
 * @param {string} dataUrl
 * @returns
 */
export function getBase64FileType(dataUrl?: string) {
  if (!(dataUrl && isBase64DataURL(dataUrl))) return "";

  return dataUrl?.substring(
    dataUrl?.indexOf("/") + 1,
    dataUrl?.indexOf(";base64")
  );
}

/**
 *
 * @param {Blob} blob
 * @param {string} [fileName='file']
 */
export function downloadFile(blob: Blob, fileName = "file") {
  if (blob instanceof Blob) {
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  }
}

/**
 *
 * @param {Blob} blob
 */
export function blobToBase64(blob: Blob) {
  return new Promise((resolve, reject) => {
    if (blob instanceof Blob) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    } else {
      resolve("");
    }
  });
}

export function getAssetInfo(src) {
  const result = { name: "src", type: "" };
  if (src instanceof File) {
    result.name = src.name;
    result.type = src.name.slice(src.name.lastIndexOf(".") + 1)?.toLowerCase();
  } else if (typeof src === "string") {
    if (isBase64DataURL(src)) {
      result.name = "Base64";
      result.type = getBase64FileType(src);
    } else {
      result.name = src.slice(src.lastIndexOf("/") + 1);
      result.type = src.slice(src.lastIndexOf(".") + 1);
    }
  }
  return result;
}
