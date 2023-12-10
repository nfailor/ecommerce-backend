const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tags);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const tag = await Tag.findByPk(tagId, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tag) {
      res.status(404).json({ message: 'Tag not found'});
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const updatedTag = await Tag.update(req.body, {
      where: { id: tagId },
    });

    if (updatedTag[0] === 0) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json({ message: 'Tag updated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const deletedTag = await Tag.destroy({
      where: { id: tagId},
    });

    if (!deletedTag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json({ message: 'Tag deleted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
