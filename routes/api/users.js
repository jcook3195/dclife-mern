const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const SiteAdmin = require('../../models/SiteAdmin');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phoneNumber', 'Please enter a valid phone number').isMobilePhone(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, phoneNumber, password } = req.body;

    try {
      // if user email exists, throw error and don't register
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'Email is already used for another account' }],
        });
      }

      // create new user using model
      user = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      });

      // hash that p-word
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // save the user to the database
      await user.save();

      // return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/users/siteadmin
// @desc    Register a SiteAdmin
// @access  Public
router.post(
  '/siteadmin',
  [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phoneNumber', 'Please enter a valid phone number').isMobilePhone(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      siteAdmin,
    } = req.body;

    try {
      // if user email exists, throw error and don't register
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'Email is already used for another account' }],
        });
      }

      // create new user using model
      user = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        siteAdmin,
      });

      // hash that p-word
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // save the user to the database
      await user.save();

      // find the newly created user with their email
      const justCreatedUser = await User.findOne({
        email: email,
      });

      // for the new siteadmin document
      newAdmin = new SiteAdmin({
        user: justCreatedUser._id,
      });

      await newAdmin.save();

      // return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
