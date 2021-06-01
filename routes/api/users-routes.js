const router = require('express').Router();
const { User, Product, Thought } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  res.json(await User.find({}));
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  // find one category by its `id` value
  // be sure to include its associated Products
  res.json(await User.findOne({ userId: id }).exec());
});

router.post('/', async (req, res) => {
  // create a new category
  const name = req.body.username;
  const email = req.body.email;
  const record = new User({ username: name, email: email });
  record.save();
  res.json(record);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const id  = req.params.id;
  const update = {};
  if (req.body.username) {
    update.username = req.body.username;
  }
  if (req.body.email) {
    update.email = req.body.email;
  }

  const record = await User.updateOne({userId: id }, update);
  res.json(record);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const id  = req.params.id;
  const record = await User.findOneAndDeleteOne({ userId: id });
  // Bonus: delete thoughts for deleted user
  await Thought.deleteMany({ username: record.username });
  res.json(record);
});

router.post('/:id/friends/:friendId', async (req, res) => {
  const id = req.params.id;
  const friend = req.params.friendId;
  const user = await User.findOne({userId: id}).exec();
  user.friends.push(friend);
  user.save();
  const friendData = await User.findOne({userId: friend}).exec();
  friendData.friends.push(id);
  friendData.save();
  res.json({
    user: user,
    newFriend: friendData
  });
});

router.delete('/:id/friends/:friendId', async (req, res) => {
  const id = req.params.id;
  const friend = req.params.friendId;
  const user = await User.findOne({userId: id}).exec();
  user.friends = user.friends.filter((value, index, arr) => {
    return value != friend;
  });
  user.save();
  res.json(user);
});

module.exports = router;
