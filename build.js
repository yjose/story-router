"use strict";

const fs = require("fs");
const del = require("del");
const pkg = require("./package.json");
const Bili = require("bili");

const options = {
  input: "src/index.js",
  outDir: "dist",
  name: "StoryRouter",
  format: ["es", "cjs"],
  postcss: { extract: true },
  banner: true,
  external: false
};

let promise = Promise.resolve();

// Clean up the output directory
promise = promise.then(() => del(["dist/*"]));

// Copy package.json and LICENSE
promise = promise.then(() => {
  Bili.write(options).then(() => {
    console.log("Done!");
  });
  delete pkg.devDependencies;
  delete pkg.scripts;

  fs.writeFileSync(
    "dist/package.json",
    JSON.stringify(pkg, null, "  "),
    "utf-8"
  );
  fs.writeFileSync(
    "dist/LICENSE",
    fs.readFileSync("LICENSE", "utf-8"),
    "utf-8"
  );
  fs.writeFileSync(
    "dist/README.md",
    fs.readFileSync("README.md", "utf-8"),
    "utf-8"
  );
});

promise.catch(err => console.error(err.stack)); // eslint-disable-line no-console
