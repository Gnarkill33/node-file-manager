import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";

export const calculateHash = async (sourceFile) => {
 const hash = createHash("sha256");
 const readableStream = createReadStream(sourceFile);

 readableStream.on("data", (chunk) => {
  hash.update(chunk);
 });

 readableStream.on("end", () => {
  const hexHash = hash.digest("hex");
  console.log(hexHash);
 });
};
