/* 
gets all loaded rules,
and creates split config by "category"	
*/

const Rules = require("eslint/lib/rules");
const loadedRules = new Rules().getAllLoadedRules();

const slugify = require("slugify");
const fs = require("fs");

// loaded rules is map, this is map->{c1:{},c2:{},...}
let r = {};
for (const [key, value] of loadedRules) {
  let category = value.meta.docs.category;
  let type = value.meta.type;
  r[category] || (r[category] = {});
  r[category][type] || (r[category][type] = {})
  r[category][type][key] = "off";
}
let out = `./eslintrc.split.js`;
fs.writeFile(out, JSON.stringify(r, 0, 2), function() {
  console.log("done", out);
})