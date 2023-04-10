const fs = require("fs");
const path = require("path");

const typesPath = path.resolve(
  "node_modules",
  "@types",
  "testing-library__jest-dom",
  "index.d.ts"
);

fs.readFile(typesPath, "utf8", (err, data) => {
  if (err) throw err;

  let lines = data.split("\n");

  const jestTypesIndex = lines.findIndex((line) =>
    line.includes('reference types="jest"')
  );

  if (lines[jestTypesIndex] === '/// <reference types="jest" />') {
    lines = lines
      .slice(0, jestTypesIndex)
      .concat(lines.slice(jestTypesIndex + 1));
  }

  fs.writeFile(typesPath, lines.join("\n"), "utf8", function (err) {
    if (err) throw err;
  });
});