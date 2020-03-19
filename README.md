# Logical

A module for composing predicates using logical operators.

The aim of this module is to provide a method for declaratively composing boolean functions. It should prove useful when
writing complex expressions, for example in `if`- and `where` -clauses or similar contexts.

## Install

```
npm install @iekedemus/logical
```

## Basic usage

```
const {
  and,
  or,
  not,
} = require('@iekedemus/logical');

const divisibleByFour = value => value % 4 === 0;
const divisibleByHundred = value => value % 100 === 0;
const divisibleByFourHundred = value => value % 400 === 0;

const isLeapYear = or(
  and(
    divisibleByFour,
    not(
      divisibleByHundred,
    ),
  ),
  and(
    divisibleByFour,
    divisibleByHundred,
    divisibleByFourHundred,
  )
);

isLeapYear(2020);  // true

```

## License

MIT
