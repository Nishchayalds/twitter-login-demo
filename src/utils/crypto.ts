import NextCrypto from "next-crypto";

const keyString = "JHGDFSHJG7658DSFJKGHSDKJFG876";

const crypto = new NextCrypto(keyString);

export const encrypt = async (jsonData: any) => {
  return await crypto.encrypt(JSON.stringify(jsonData));
};
export const decrypt = async (encryptedData?: any) => {
  if (!encryptedData) return null;
  const decrypted_data: any = await crypto?.decrypt(encryptedData);
  return JSON.parse(decrypted_data);
};
