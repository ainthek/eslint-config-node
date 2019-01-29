# eslint-config-node




## some eslint rules considered harmful

This is the set of rules, 
that I really do not want to be 
applied in most of JS code.

Remember JS is not pascal, nor Java nor ...

### vars-on-top	Best Practices suggestion

off, please off

### no-implicit-coercion Best Practices	suggestion

off, please off, or at least adjusted

eshint suggested:

	Boolean((policy.insurances || []).find((i) => i.id == id)) 

really ? no way, I want to use JS:

	 !!(policy.insurances || []).find((i) => i.id == id);

### no-unused-expressions Best Practices suggestion

This is perfectly ok JS (we need no IFs):

	doFilter && (obj = filter(obj));

### no-self-compare	Best Practices problem:

The real problem is if JS reader does nor understand x === x as check for NaN.
Again this is JS, Java coders go away please !!!

## no-eq-null Best Practices suggestion

off, this is basic JS knowledge, if you do not know this, return to your Java IDE immediatelly please

## no-use-before-define	Variables problem

This shell be default:

	"no-use-before-define": ["error", { "functions": false, "variables": false }],

Hoisting is design, not a bug, and may bring more readable sources

## no-confusing-arrow
off

If this is confusing, then really leave JavaScript and code in something else.
I do not believe someone can misplace => and <= or misread this in given context.

## sort-imports

by alphabet ? no way, there are more logical ways to sort imports

## Misc

count errors by rule: 

	npx eslint ./src --quiet  -f json | JSONStream "*.messages.*.ruleId" | jsontool -a | cnt