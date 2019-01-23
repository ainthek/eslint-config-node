#!/usr/bin/env node
/* 
gets all loaded rules,
and creates split config by "category"  
*/

const { CLIEngine } = require("eslint");
const cli = new CLIEngine();

function getAllLoadedRules() {
  // if you do not fo this you will get only standard rules
  // from eslint by calling getAllLoadedRules}
  const config = cli.config.getConfig(".");
  cli.config.plugins.loadAll(config.plugins);
  return cli.getRules();
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
}
let out = `./eslintrc.split.js`;
fs.writeFile(out, JSON.stringify(r, 0, 2), function() {
  console.log("done", out);
})