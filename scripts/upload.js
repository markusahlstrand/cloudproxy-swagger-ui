require("dotenv").config();
const fs = require("fs");
const ncw = require("node-cloudworker");

ncw.applyShims();

const KvStorage = require("../src/services/kv-storage");

const kvStorage = new KvStorage({
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  namespace: process.env.KV_NAMESPACE,
  authEmail: process.env.CLOUDFLARE_AUTH_EMAIL,
  authKey: process.env.CLOUDFLARE_AUTH_KEY,
});

console.log("start");

function getFilesInDirectory(filePath) {
  const result = [];

  const files = fs.readdirSync(filePath, { withFileTypes: true });
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];

    if (file.isDirectory()) {
      result.push(...getFilesInDirectory(`${filePath}/${file.name}`));
    } else if (file.name.slice(0, 1) !== ".") {
      result.push(`${filePath}/${file.name}`);
    }
  }

  return result;
}

async function uploadFile(filePath, targetPath) {
  const data = fs.readFileSync(filePath, "utf8");
  const response = await kvStorage.put(targetPath, data);
  if (response) {
    console.log("Uploaded: " + targetPath);
  } else {
    console.log("Failed to upload: " + filePath);
  }
}

async function uploadFiles(files) {
  for (let i = 0; i < files.length; i += 1) {
    const targetPath = files[i].replace(
      "./node_modules/swagger-ui-dist/",
      "docs/"
    );
    await uploadFile(files[i], targetPath);
  }
}

const files = getFilesInDirectory("./node_modules/swagger-ui-dist");

uploadFiles(files)
  .then(() => {
    console.log("Done");
  })
  .catch((err) => {
    console.log("Failed: " + err.message);
  });
