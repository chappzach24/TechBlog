const router = require("express").Router();
const { BlogPost, Comment, User } = require("../models/");
const { withGuard, withoutGuard } = require("../utils/authGuard");
router.get("/", async (req, res) => {
  try {
    const postData = await BlogPost.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", { posts, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    // if (postData) {
    const blogPost = postData.get({ plain: true });
    // console.log(post);
    res.render("blogPost", { blogPost, loggedIn: req.session.logged_in });
    // } else {
    //   res.status(404).end();
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", withoutGuard, (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/signup", withoutGuard, (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
