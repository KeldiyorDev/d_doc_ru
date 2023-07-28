export const IsFileType = (file) => {
  let isBool = (file?.type === "application/zip" || file?.type === "application/gzip" || file?.type === "application/msword" || file?.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file?.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" || file?.type === "application/vnd.ms-powerpoint" || file?.type === "application/vnd.ms-excel.sheet.macroEnabled.12" || file?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file?.type === "application/vnd.ms-excel" || file?.type === "application/x-rar-compressed" || file?.type === "application/pdf");

  return isBool;
}

export const IsFileType2 = (file) => {
  let isBool = (file?.type === "application/zip" || file?.type === "application/gzip" || file?.type === "application/msword" || file?.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file?.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" || file?.type === "application/vnd.ms-powerpoint" || file?.type === "application/vnd.ms-excel.sheet.macroEnabled.12" || file?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file?.type === "application/vnd.ms-excel" || file?.type === "application/x-rar-compressed" || file?.type === "application/pdf");

  return isBool;
}


export const IsFileTypeOut = (file) => {
  let isBoold = (file?.type === "image/png"||file?.type === "image/jpeg" );

  return isBoold;
}