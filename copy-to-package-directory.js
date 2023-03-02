const fs = require('fs');
const path = require('path');
function copyRecursiveSync(src, dest) {
  let exists = fs.existsSync(src);
  let stats = exists && fs.statSync(src);
  let isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    console.log(`Making directory ${dest}`);
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(function(childItemName) {
      console.log(`Copying ${childItemName}`);
      copyRecursiveSync(path.join(src, childItemName),
        path.join(dest, childItemName));
    });
  } else {
    console.log(`Copying ${src} to ${dest}`);
    fs.copyFileSync(src, dest);
  }
}