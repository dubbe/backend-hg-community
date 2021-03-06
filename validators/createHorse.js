const { check } = require('express-validator');

module.exports = [
  check('name').not().isEmpty(),
  check('slug').not().isEmpty(),
  check('facts.born').not().isEmpty(),
  check('facts.height').not().isEmpty(),
  check('facts.breed').not().isEmpty(),
  check('facts.type').not().isEmpty(),
  check('breeding.status').not().isEmpty(),
  check('breeding.inheritanceScore').not().isEmpty(),
  check('pedigree.sire').not().isEmpty(),
  check('pedigree.dam').not().isEmpty(),
  check('ownership.owner').not().isEmpty(),
  check('description').not().isEmpty(),
];
