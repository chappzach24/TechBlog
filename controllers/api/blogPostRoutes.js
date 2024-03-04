const router = require('express').Router();
const { BlogPost } = require('../../models/');
const { apiGuard } = require('../../utils/authGuard');

router.post('/', apiGuard, async (req, res) => {
  const body = req.body;
  try {
    const newBlogPost = await BlogPost.create({ ...body, user_id: req.session.user_id });
    res.json(newBlogPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put('/:id', apiGuard, async (req, res) => {
  try {
    const [affectedRows] = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete('/:id', apiGuard, async (req, res) => {
  try {
    const [affectedRows] = BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;