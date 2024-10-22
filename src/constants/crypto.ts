import CryptoJS from "crypto-js";
import { AES_ENCRYPTION_IV, AES_ENCRYPTION_KEY } from "./env";

export const AES_ENCRYPTION_KEY_WORD_ARRAY =
  CryptoJS.enc.Utf8.parse(AES_ENCRYPTION_KEY);
export const AES_ENCRYPTION_IV_WORD_ARRAY =
  CryptoJS.enc.Utf8.parse(AES_ENCRYPTION_IV);
