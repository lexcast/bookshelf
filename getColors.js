var Vibrant = require("node-vibrant");

Vibrant.from("public/images/covers/8496284328.jpg").getPalette(
  (err, palette) => {
    console.log(palette.Vibrant.getHex());
    console.log(palette.Vibrant.getTitleTextColor());
    console.log(palette.Vibrant.getBodyTextColor());
  }
);
