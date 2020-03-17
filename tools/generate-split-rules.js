#!/usr/bin/env node

/* 
tooling for this project
gets all loaded rules,
and creates split config by "category"  
*/

const { CLIEngine } = require("eslint");
const cli = new CLIEngine();

function getAllLoadedRules() {
  // const cli = new CLIEngine();
  // const rules1 = [...cli.getRules()]; //unusable
  // const cfg = cli.getConfigForFile("FOO.js");
  // //console.log(cfg);

  // const { globals, extends: _extends, /*others*/ ...others } = cfg;

  // const cli2 = new CLIEngine({
  //   baseConfig: {
  //     globals,
  //     extends: _extends
  //   },
  //   ...others
  // });
  const cli2 = new CLIEngine({
    baseConfig: {
      extends: [
        "eslint:all",
        "plugin:node/recommended"
      ]
    }
  });

  return cli2.getRules(); //usable
}

const slugify = require("slugify");
const fs = require("fs");

// loaded rules is map, this is map->{c1:{},c2:{},...}
let r = {};
for (const [key, value] of getAllLoadedRules()) {
  let category = value.meta.docs.category;
  let type = value.meta.type;
  r[category] || (r[category] = {});
  r[category][type] || (r[category][type] = {})
  r[category][type][key] = "error";
  if (value.meta.deprecated) {
    r["deprecated"] || (r["deprecated"] = {});
    r["deprecated"][key] = "off";
  }
}
let out = `./eslintrc.split.original.js`;
fs.writeFile(out, JSON.stringify(r, 0, 2), function() {
  console.log("done", out);
})