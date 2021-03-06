const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        'Kontrollera din data, fält saknas eller är felaktiga',
        422,
      ),
    );
  }

  let isUserExisting;
  try {
    isUserExisting = await User.findOne({ email: req.body.email });
  } catch (err) {
    return next(
      new HttpError(
        'Det gick inte att skapa användaren, vänligen försök senare',
        500,
      ),
    );
  }

  if (isUserExisting) {
    return next(
      new HttpError(
        'Kontot (e-post) finns redan, vänligen logga in istället.',
        422,
      ),
    );
  }

  const createdUser = new User({
    email: req.body.email,
    password: req.body.password,
    image: '',
    horses: [],
    characterName: req.body.characterName,
    level: req.body.level,
    stable: req.body.stable,
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log('err', err);
    return next(
      new HttpError(
        'Det gick inte att skapa användaren, vänligen försök igen',
        500,
      ),
    );
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

exports.createUser = createUser;
