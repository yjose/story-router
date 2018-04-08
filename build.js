"use strict";

const fs = require("fs");
const del = require("del");
const pkg = require("./package.json");
const Bili = require("bili");

const options = {
  input: "src/index.js",
  outDir: "lib",
  name: "index",
  format: ["es"],
  postcss: { extract: true },
  banner: true,
  external: false
};

// some confuse between babel config for parcel that use v6 and Bili that's use V7
const babelBiliConfig = {
  presets: ["@babel/preset-react"],
  plugins: ["@babel/plugin-proposal-class-properties"]
};
const babelParcelConfig = {
  presets: ["env", "react"],
  plugins: ["transform-class-properties"]
};

let promise = Promise.resolve();

// and use babel config V7
// Clean up the output directory

promise = promise.then(() => {
  fs.writeFileSync(
    "./.babelrc",
    JSON.stringify(babelBiliConfig, null, "  "),
    "utf-8"
  );
  del(["lib/*"]);
});

// Copy package.json and LICENSE
promise = promise.then(() => {
  Bili.write(options).then(() => {
    console.log("Done!");
    fs.writeFileSync(
      "./.babelrc",
      JSON.stringify(babelParcelConfig, null, "  "),
      "utf-8"
    );
  });
  delete pkg.devDependencies;
  delete pkg.scripts;

  fs.writeFileSync(
    "lib/package.json",
    JSON.stringify(pkg, null, "  "),
    "utf-8"
  );
  fs.writeFileSync("lib/LICENSE", fs.readFileSync("LICENSE", "utf-8"), "utf-8");
  fs.writeFileSync(
    "lib/README.md",
    fs.readFileSync("README.md", "utf-8"),
    "utf-8"
  );
});

promise.catch(err => console.error(err.stack)); // eslint-disable-line no-console
