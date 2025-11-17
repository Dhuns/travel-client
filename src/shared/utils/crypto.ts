import CryptoJS from 'crypto-js';

// Use environment variable to match backend and admin encryption key
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'Z8qND4wl6sG76Zf/hH4L7nsyGKUUtscd2vqZxIODfqw=';

export const aesEncrypt = (data: string): string => {
  const key = ENCRYPTION_KEY.padEnd(32, ' ');
  const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(''),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  return cipher.toString();
};

export const aesDecrypt = (data: string): string => {
  const key = ENCRYPTION_KEY.padEnd(32, ' ');
  const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(''),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  return cipher.toString(CryptoJS.enc.Utf8);
};
