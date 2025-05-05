export function isBase64DataURL(dataURL?: string) {
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
    dataUrl?.indexOf(";base64"),
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
  const result = { name: "src", type: "", mimeType: "" };
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

  result.mimeType =
    {
      jpg: "image/jpg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      mp4: "video/mp4",
      pdf: "application/pdf",
    }[result.type] || "application/octet-stream";
  return result;
}

export function downloadAsPDF(base64: string, filename: string) {
  let base64String = base64.trim();
  let mimeType = "";
  let extension = "";

  if (base64String.startsWith("data:")) {
    const match = base64String.match(/^data:(.+?);base64,/);
    if (match) {
      mimeType = match[1];
      extension = mimeType.split("/")[1];
    } else {
      return;
    }
  } else {
    // Raw base64, try to detect type
    if (base64String.startsWith("JVB")) {
      mimeType = "application/pdf";
      extension = "pdf";
    } else if (base64String.startsWith("/9j/")) {
      mimeType = "image/jpeg";
      extension = "jpg";
    } else if (base64String.startsWith("iVBOR")) {
      mimeType = "image/png";
      extension = "png";
    } else {
      return;
    }

    base64String = `data:${mimeType};base64,${base64String}`;
  }

  downloadFileObject(base64String, `${filename}.${extension}`);
}

export function downloadFileObject(base64String: string, filename: string) {
  const link = document.createElement("a");
  link.href = base64String;
  link.download = filename;
  link.click();
}
