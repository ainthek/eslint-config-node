#!/usr/bin/env node

/* 
tooling for this project
gets all loaded rules,
and creates split config by "category"  
*/

const { CLIEngine } = require("eslint");

//function getAllLoadedRules() {
const cli = new CLIEngine();
const rules1 = cli.getRules(); //unusable

const cfg = cli.getConfigForFile("FOO.js");


const { globals, extends: _extends, /*others*/ ...others } = cfg;

const cli2 = new CLIEngine({
  baseConfig: {
    globals,
    extends: _extends
  },
  ...others
});
//return cli2.getRules(); //usable
//}
// loaded rules is map, this is map->{c1:{},c2:{},...}
let r = {};
for (const [key, value] of cli2.getRules()) {
  let category = value.meta.docs.category;
  let type = value.meta.type;
  r[category] || (r[category] = {});
  r[category][type] || (r[category][type] = {})
  //r[category][type][key] = "error";
  r[category][type][key] = simplify(cfg.rules[key]);

  if (value.meta.deprecated) {
    r["deprecated"] || (r["deprecated"] = {});
    //r["deprecated"][key] = "off";
    r["deprecated"][key] = simplify(cfg.rules[key]);
  }
}
console.log(JSON.stringify(r, null, 2));


function simplify(v) {
  return Array.isArray(v) && v.length === 1 ? v[0] : v;
}