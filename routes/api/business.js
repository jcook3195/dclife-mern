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
        { user: req.user.id, businessName: businessFields.businessName },
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
// @access  Private
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
// @access  Private
router.get('/category/filter/:cat_id', auth, async (req, res) => {
  try {
    const businesses = await Business.find({
      businessCategory: req.params.cat_id,
    }).sort({
      category: 'ascending',
    });

    res.json(businesses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/business/user/:user_id
// @desc    Get business by user id
// @access  Private
router.get('/user/:user_id', auth, async (req, res) => {
  try {
    const businesses = await Business.find({
      user: req.params.user_id,
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

// @route   DELETE api/business/:id
// @desc    Delete business
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    // if business does not exist
    if (!business) {
      return res.status(404).json({ msg: 'Business not found' });
    }

    // block delete if user does not own post or allow if siteadmin
    if (business.user.toString() !== req.user.id) {
      // @@ TO DO - allow deletion if siteadmin

      return res
        .status(401)
        .json({ msg: 'User is not authorized to delete this post' });
    }

    await business.remove();

    res.json({ msg: 'Business removed' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Business not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/business/favorite/:id
// @desc    Favorite a business
// @access  Private
router.put('/favorite/:id', auth, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    // check if business has already been favorited by this user
    if (
      business.favorites.filter(
        (favorite) => favorite.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: 'Business already favorited' });
    }

    business.favorites.unshift({ user: req.user.id });

    await business.save();

    res.json(business.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/business/unfavorite/:id
// @desc    Unfavorite a business
// @access  Private
router.put('/unfavorite/:id', auth, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    // check if business has been favorited by user
    if (
      business.favorites.filter(
        (favorite) => favorite.user.toString() === req.user.id
      ).length === 0
    ) {
      return res.status(400).json({ msg: 'Business is not favorited by user' });
    }

    // get remove index
    const removeIndex = business.favorites
      .map((favorite) => favorite.user.toString())
      .indexOf(req.user.id);

    business.favorites.splice(removeIndex, 1);

    await business.save();

    res.json(business.favorites);
  } catch (err) {
    console.error(err.messag);
    res.status(500).send('Server Error');
  }
});

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
