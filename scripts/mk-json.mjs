import { default as YAML } from "yamljs";
import { writeFileSync } from "fs";

// docs refer to https://www.npmjs.com/package/yamljs

let years = [2019, 2020, 2021];

for (let year of years) {
  let fileOfyear = YAML.load(`./${year}.yaml`);
  let targetOfYear = `dist/${year}.json`;

  let xs = [];

  for (let k in fileOfyear) {
    if (k === "$others") {
      console.log("ignoring data insider `$others`");
    }
    let v = fileOfyear[k];
    xs.push({
      ...v,
      code: k,
    });
  }

  // make sure sorted by date
  xs.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    } else if (a.date > b.date) {
      return 1;
    } else {
      return 0;
    }
  });

  writeFileSync(targetOfYear, JSON.stringify(xs, null, 2));
  console.log(`created file: ${targetOfYear}`);
}
