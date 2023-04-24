import path from "path";
import fs from "fs";

export const clearImage = (filePath: string) => {
    // We go up one level because we are in the controllers folder and not the root folder
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, (err) => console.log(err));
  };