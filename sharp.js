const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const targets = [
  "src/public/images/assets",
  "src/public/images/heros",
  "src/public/images/icon",
];

targets.forEach((value) => {
  const target = path.resolve(__dirname, value);
  const destination = path.resolve(__dirname, value);

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  fs.readdirSync(target).forEach((image) => {
    const imageInputPath = `${target}/${image}`;
    const imageName = path.parse(image).name;

    // Resize gambar dengan lebar 800px dan simpan dengan prefix -large.jpg
    sharp(imageInputPath)
      .resize({ width: 800 })
      .toFile(path.resolve(destination, `${imageName}-large.jpg`));

    // Resize gambar dengan lebar 480px dan simpan dengan prefix -small.jpg
    sharp(imageInputPath)
      .resize({ width: 480 })
      .toFile(path.resolve(destination, `${imageName}-small.jpg`));
  });
});
