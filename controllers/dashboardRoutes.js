const router = require('express').Router();
const { BlogPost } = require('../models');
const { withGuard } = require('../utils/authGuard');
router.get('/', withGuard, async (req, res) => {
  try {
    const BlogPostData = await BlogPost.findAll({
      where: {
        userId: req.session.user_id,
      },
    });

    const blogPost = BlogPostData.map((blogPost) => blogPost.get({ plain: true }));

    res.render('dashboard', {
      dashboard: true,
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', withGuard, (req, res) => {
  res.render('newPost', {
    dashboard: true,
    loggedIn: req.session.logged_in,
  });
});

router.get('/edit/:id', withGuard, async (req, res) => {
  try {
    const BlogPostData = await BlogPost.findByPk(req.params.id);
    if (BlogPostData) {
      const blogPost = BlogPostData.get({ plain: true });
      res.render('editBlogPost', {
        dashboard: true,
        blogPost,
        loggedIn: req.session.logged_in,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;