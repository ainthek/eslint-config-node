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