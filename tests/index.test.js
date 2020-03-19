const { expect } = require('chai');

const { and, or, not } = require('../src');

const randomIndex = length => Math.floor(Math.random() * length);

const randomPick = items => items[randomIndex(items.length)];

const shuffle = items => {
  const copy = [...items];
  const shuffled = [];
  while (copy.length) {
    shuffled.push(
      copy.splice(
        randomIndex(copy.length),
        1
      )[0]
    );
  }
  return shuffled;
};

const value = 5;

const passingPredicates = [
  value => value > 3,
  value => value % 2 === 1,
  value => value <= 5,
];

const failingPredicates = [
  value => value <= 3,
  value => value % 2 === 0,
  value => value > 5,
];

describe('Predicates', () => {
  describe('not', () => {
    it('returns `true` on empty predicate list', () => {
      const result = not()(value);
      expect(result).to.be.true;
    });

    it('returns `true` when all predicates fail', () => {
      const result = not(...failingPredicates)(value);
      expect(result).to.be.true;
    });

    it('returns `false` if any predicate passes', () => {
      const predicates = [
        ...failingPredicates,
        randomPick(passingPredicates),
      ];
      const result = and(...shuffle(predicates))(value);
      expect(result).to.be.false;
    });
  });

  describe('and', () => {
    it('returns `true` on empty predicate list', () => {
      const result = and()(value);
      expect(result).to.be.true;
    });

    it('returns `true` when all predicates pass', () => {
      const result = and(...passingPredicates)(value);
      expect(result).to.be.true;
    });

    it('returns `false` when any predicate fails', () => {
      const predicates = [
        ...passingPredicates,
        randomPick(failingPredicates),
      ];
      const result = and(...shuffle(predicates))(value);
      expect(result).to.be.false;
    });
  });

  describe('or', () => {
    it('returns `true` on empty predicate list', () => {
      const result = or()(value);
      expect(result).to.be.true;
    });

    it('returns `true` when any predicate passes', () => {
      const predicates = [
        ...failingPredicates,
        randomPick(passingPredicates),
      ];
      const result = or(...shuffle(predicates))(value);
      expect(result).to.be.true;
    });

    it('returns `false` when all predicates fail', () => {
      const result = and(...failingPredicates)(value);
      expect(result).to.be.false;
    });
  });

  describe('complex examples', () => {
    it('nested predicates that pass', () => {
      const result = and(
        value => value > 2,
        value => value < 8,
        or(
          value => value % 5 === 0,
          value => value % 2 === 0,
        )
      )(value);

      expect(result).to.be.true;
    });

    it('nested predicates that fail', () => {
      const result = and(
        value => value > 2,
        value => value < 8,
        or(
          value => value % 10 === 0,
          value => value % 2 === 0,
        )
      )(value);

      expect(result).to.be.false;
    });
  });
});
