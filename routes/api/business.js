const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const Business = require('../../models/Business');
const BusinessCategory = require('../../models/BusinessCategory');
const User = require('../../models/User');
const Review = require('../../models/Review');

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

    try {
      const user = await User.findById(req.user.id);

      // only allow siteadmins to create categories
      const isSiteAdmin = user.siteAdmin;

      // check if siteadmin
      if (!isSiteAdmin) {
        return res.status(401).json({ msg: 'Only Admins can add categories' });
      }

      const newCategory = new BusinessCategory({
        category: req.body.category,
      });

      const filter = newCategory.category;

      // block dupe categories
      let existingCat = await BusinessCategory.findOne({ category: filter });

      if (existingCat) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Category already exists' }] });
      }

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
    const user = await User.findById(req.user.id);

    // if category does not exist
    if (!category) {
      return res.status(404).json({ msg: 'Category no found' });
    }

    // only allow siteadmins to delete categories
    const isSiteAdmin = user.siteAdmin;

    // check if siteadmin
    if (!isSiteAdmin) {
      return res.status(401).json({ msg: 'Only Admins can delete categories' });
    }

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
    const user = await User.findById(req.user.id);

    // if business does not exist
    if (!business) {
      return res.status(404).json({ msg: 'Business not found' });
    }

    // block delete if user does not own post or allow if siteadmin
    if (business.user.toString() !== req.user.id) {
      const isSiteAdmin = user.siteAdmin;

      // check if siteadmin
      if (isSiteAdmin) {
        await business.remove();

        res.json({ msg: 'Business removed by Site Admin' });
      }

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
router.post(
  '/review/:id',
  [
    auth,
    [
      check('stars', 'Please select a rating').not().isEmpty(),
      check('text', 'Please leave a comment').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const business = await Business.findById(req.params.id);

      // check if business has already been reviewed by this user
      if (
        business.reviews.filter(
          (review) => review.user.toString() === req.user.id
        ).length > 0
      ) {
        return res
          .status(400)
          .json({ msg: 'You have already reviewed this business' });
      }

      // for the review document
      review = new Review({
        user: req.user.id,
        business: business._id,
        stars: req.body.stars,
        text: req.body.text,
        firstName: user.firstName,
        lastName: user.lastName,
        user: req.user.id,
        businessReply: '',
      });

      await review.save();

      const justCreatedReview = await Review.findOne({
        user: req.user.id,
        business: req.params.id,
      });

      // for the business document
      const newReview = {
        user: req.user.id,
        review: justCreatedReview._id,
      };

      business.reviews.unshift(newReview);

      await business.save();

      res.json(business.reviews);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/business/review/reply/:id
// @desc    Reply to a review
// @access  Private
router.post(
  '/review/reply/:id',
  [auth, [check('businessReply', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // @@ TO DO - Make sure only the user that owns the business can reply to reviews

    try {
      const review = await Review.findById(req.params.id);

      const reply = req.body.businessReply;

      review.businessReply = reply;

      await review.save();

      res.json(review);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/business/review/reply/remove/:id
// @desc    Remove a reply to a review
// @access  Private
router.put('/review/reply/remove/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    // @@ TO DO - Make sure only users that own the business and siteadmins can delete replies

    review.businessReply = '';

    await review.save();

    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/business/review/:id/:review_id
// @desc    Delete review
// @access  Private
router.delete(
  '/review/:id/:business_review_id/:review_id',
  auth,
  async (req, res) => {
    try {
      const business = await Business.findById(req.params.id);
      const user = await User.findById(req.user.id);

      // get review in business
      const review = business.reviews.find(
        (review) => review.id === req.params.business_review_id
      );

      // make sure review exists in business
      if (!review) {
        return res.status(404).json({ msg: 'Review does not exist' });
      }

      const isSiteAdmin = user.siteAdmin;

      // check if siteadmin
      if (!isSiteAdmin) {
        return res.status(401).json({ msg: 'Only Admins can delete reviews' });
      }

      // get the remove index
      const removeIndex = business.reviews
        .map((review) => review.user.toString())
        .indexOf(req.user.id);

      business.reviews.splice(removeIndex, 1);

      await business.save();

      // remove the review document
      await Review.findOneAndRemove({ _id: req.params.review_id });

      res.json(business.reviews);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
