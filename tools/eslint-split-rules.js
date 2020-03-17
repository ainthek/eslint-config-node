#!/usr/bin/env node

/* 
Displays all rules from eslint, and node/recommended
Displays as hierarchy of Category/Type
And displays current value of config 

// toto jie je asi moc uzitocne, ale 
TODO: display as list, add comparison with default value and your value
*/

const { CLIEngine } = require("eslint");


const cli = new CLIEngine();
const rules1 = cli.getRules(); //unusable

const cfg = cli.getConfigForFile("FOO.js");


const { globals, extends: _extends, ...others } = cfg;

const cli2 = new CLIEngine({
  baseConfig: {
    extends: [
      "eslint:all",
      "plugin:node/recommended"
    ]
  }
});

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
  if (v === undefined) v = "___NOT_LOADED___";
  return Array.isArray(v) && v.length === 1 ? v[0] : v;
}