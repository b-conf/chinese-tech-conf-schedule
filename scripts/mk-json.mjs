import { default as YAML } from "yamljs";
import { writeFileSync } from "fs";

// docs refer to https://www.npmjs.com/package/yamljs

let file2021 = YAML.load("./2021.yaml");
let target2021 = "dist/2021.json";

let xs = [];

for (let k in file2021) {
  let v = file2021[k];
  xs.push({
    ...v,
    code: k,
  });
}

writeFileSync(target2021, JSON.stringify(xs, null, 2));
console.log(`created file: ${target2021}`);
