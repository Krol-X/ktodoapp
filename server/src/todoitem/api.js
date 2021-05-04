const router = require('express').Router();
const TodoItem = require('./model');

router.post('/', (req, res) => {
  const item = req.body;
  // TODO: add check empty title
  // TODO: fix this bug with empty body!
  console.log(req.body)
  TodoItem.addItem(item, (err) => {
    if (err) {
      return res.status(500);
    } else {
      res.status(200).json(item);
    }
  });
});

router.get('/', (req, res) => {
  TodoItem.findItems({}, (err, items) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).json(items || {});
    }
  });
});

module.exports = router;