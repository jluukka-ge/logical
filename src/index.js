const and = (...predicateFns) => value => predicateFns.reduce((acc, fn) => acc && fn(value), true);
const or = (...predicateFns) => value => predicateFns.length ? (
  predicateFns.reduce((acc, fn) => acc || fn(value), false)
) : true;
const _not = predicate => value => !predicate(value);
const not = (...predicateFns) => and(...predicateFns.map(_not));


module.exports = {
  not,
  and,
  or,
};
