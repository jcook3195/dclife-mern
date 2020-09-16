const express = require('express');
const router = express.Router();
//const config = require('config');
//const axios = require('axios');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const Business = require('../../models/Business');
const BusinessCategory = require('../../models/BusinessCategory');
const User = require('../../models/User');

// @route   GET api/business/mine
// @desc    Get current user's business
// @access  Private
router.get('/mine', auth, async (req, res) => {
  try {
    const businesses = await Business.find({
      user: req.user.id,
    }).populate('user', ['name']);

    if (businesses.length === 0) {
      return res.status(400).json({ msg: 'This user has no businesses' });
    }

    res.json(businesses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/business/:id
// @desc    Get single business by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ msg: 'Business not found' });
    }

    res.json(business);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Business not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/business
// @desc    Create or update business
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('businessName', 'Business Name is required').not().isEmpty(),
      check('businessCategory', 'Business Category is required')
        .not()
        .isEmpty(),
      check('contactEmail', 'Contact Email is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      businessName,
      businessCategory,
      businessMainImage,
      about,
      contactEmail,
      contactPhone,
      websiteUrl,
      facebook,
      instagram,
      twitter,
      youtube,
      pinterest,
      linkedin,
      snapchat,
    } = req.body;

    const businessFields = {
      user: req.user.id,
      businessName,
      businessCategory,
      businessMainImage,
      about,
      contactEmail,
      contactPhone,
      websiteUrl:
        websiteUrl && websiteUrl !== ''
          ? normalize(websiteUrl, { forceHttps: true })
          : '',
    };

    // build social obj and add to business fields
    const socialFields = {
      facebook,
      instagram,
      twitter,
      youtube,
      pinterest,
      linkedin,
      snapchat,
    };

    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0) {
        if (key === 'snapchat') {
          // if it's snapchat don't normalize it
          socialFields[key] = value;
        } else {
          // normalize the url of all the others
          socialFields[key] = normalize(value, { forceHttps: true });
        }
      }
    }

    businessFields.social = socialFields;

    try {
      // using upsert to create a new if none is found
      let business = await Business.findOneAndUpdate(
        { user: req.user.id },
        { $set: businessFields },
        { new: true, upsert: true }
      );

      res.json(business);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/business/category
// @desc    Create or update business category
// @access  Private
router.post(
  '/category',
  [auth, [check('category', 'Category name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // extrap the cat name
    const { newCatName } = req.body;

    try {
      const newCategory = new BusinessCategory({
        category: req.body.category,
      });

      // block dupe categories
      let existingCat = await BusinessCategory.findOne({ newCatName });
      if (existingCat) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Category already exists' }] });
      }

      // @@ TO DO - Only allow category creation if the account is siteadmin

      const category = await newCategory.save(0);

      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/business/category/all
// @desc    Get all categories
// @access  Public
router.get('/category/all', auth, async (req, res) => {
  try {
    const categories = await BusinessCategory.find().sort({
      category: 'ascending',
    });

    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/business/category/:id
// @desc    Delete category
// @access  Private
router.delete('/category/:id', auth, async (req, res) => {
  try {
    const category = await BusinessCategory.findById(req.params.id);

    // if category does not exist
    if (!category) {
      return res.status(404).json({ msg: 'Category no found' });
    }

    // @@ TO DO - Only allow category deletion if the account is siteadmin

    await category.remove();

    res.json({ msg: 'Category removed' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Category not found' });
    }

    res.status(500).send('Server error');
  }
});

// @route   GET api/business
// @desc    Get all businesses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const businesses = await Business.find();

    res.json(businesses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/business/category/filter/:cat_id
// @desc    Get all businesses in a particular category
// @access  Public

// @route   GET api/business/user/:user_id
// @desc    Get business by user id
// @access  Public

// @route   DELETE api/business
// @desc    Delete business & user
// @access  Private

// @route   DELETE api/business/:id
// @desc    Delete single business by id
// @access  Private

// @route   PUT api/business/favorite/:id
// @desc    Favorite a business
// @access  Private

// @route   PUT api/business/unfavorite/:id
// @desc    Unfavorite a business
// @access  Private

// @route   POST api/business/review/:id
// @desc    Review a business
// @access  Private

// @route   POST api/business/review/:id/:review_id
// @desc    Comment on a review
// @access  Private

// @route   DELETE api/business/review/:id/:review_id
// @desc    Delete review
// @access  Private

module.exports = router;
