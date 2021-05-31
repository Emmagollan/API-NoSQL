const router = require('express').Router();
const { Thought, User, Reaction } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  res.json(await Thought.find({}));
});

// get one product
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  res.json(await Thought.findOne({ thoughtId: id }).exec());
});

// create new product
router.post('/', async (req, res) => {
  const text = req.body.thoughtText;
  const name = req.body.username;
  const thought = new Thought({ thoughtText: text, username: name });
  thought.save();
  const user = await User.findOne({ username: name });
  user.thoughts.push(thought.thoughtId);
  user.save();
  res.json(thought);
});

// update product
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const text = req.body.thoughtText;
  const record = await Thought.updateOne({ thoughtId: id, thoughtText: text});
  res.json(record);
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  const id  = req.params.id;
  const record = await Thought.findOneAndDelete({thoughtId: id });
  const user = await User.findOne({username: record.username});
  if (user) {
    user.thoughts = user.thoughts.filter((value, index, arr) => {
      return value != id;
    });
    user.save();
  }
  record.save();
  res.json(record);
});

router.post('/:id/reactions', async (req, res) => {
  // delete one product by its `id` value
  const id  = req.params.id;
  const record = await Thought.findOne({ thoughtId: id });
  const reaction = { reactionBody: req.body.reactionBody, username: req.body.username };
  record.reactions.push(reaction);
  record.save();
  res.json(record);
});

router.delete('/:id/reactions/:reactionId', async (req, res) => {
  // delete one product by its `id` value
  const id  = req.params.id;
  const reaction = req.params.reactionId;
  const record = await Thought.findOne({ thoughtId: id });
  record.reactions = record.reactions.filter((value, index, arr) => {
    return value.reactionId != reaction;
  });
  record.save();
  res.json(record);
});

module.exports = router;
