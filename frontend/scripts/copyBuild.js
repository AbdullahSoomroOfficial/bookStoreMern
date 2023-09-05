import path from "path";
import fs from "fs-extra";

const sourceBuildDir = path.resolve(
  "D:/My-Projects/bookStoreMern/frontend",
  "dist"
);
const destinationBuildDir = path.resolve(
  "D:/My-Projects/bookStoreMern/backend",
  "public"
);

console.log(destinationBuildDir);

async function copyBuild() {
  try {
    // Remove existing build directory in Express app
    await fs.remove(destinationBuildDir);

    // Copy the build files from React app to Express app
    await fs.copy(sourceBuildDir, destinationBuildDir);

    console.log("Build files copied successfully!");
  } catch (err) {
    console.error("Error copying build files:", err);
  }
}

copyBuild();
