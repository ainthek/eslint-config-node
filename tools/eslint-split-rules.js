#!/usr/bin/env node

/* 
tooling for this project
gets all loaded rules,
and creates split config by "category"  
*/

const { CLIEngine } = require("eslint");
const cli = new CLIEngine();

function getAllLoadedRules() {
  const cli = new CLIEngine();
  const rules1 = [...cli.getRules()]; //unusable
  const cfg = cli.getConfigForFile("FOO.js");
  //console.log(cfg);

  const { globals, extends: _extends, /*others*/ ...others } = cfg;

  const cli2 = new CLIEngine({
    baseConfig: {
      globals,
      extends: _extends
    },
    ...others
  });
  return cli2.getRules(); //usable
}
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
console.log(JSON.stringify(r, 0, 2))