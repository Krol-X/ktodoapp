const router = require('express').Router();
const TodoItem = require('./model');

router.post('/', (req, res) => {
  if (!req.body.title) {
    return res.status(500);
  }
  const item = new TodoItem(req.body);

  TodoItem.addItem(item, (err) => {
    if (err) {
      return res.status(500);
    } else {
      res.status(200).json(item);
    }
  });
});

router.get('/', (req, res) => {
  TodoItem.findItems(req.body, (err, items) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).json(items || {});
    }
  });
});

router.delete('/', (req, res) => {
  if (!req.body._id) {
    return res.status(500);
  }
  const id = req.body._id;

  TodoItem.findItemById({_id: id}, (err, item) => {
    if (err) {
      return res.status(500);
    }
    item.deleteItem((err) => {
      if (err) {
        res.status(500);
      } else {
        res.status(200);
      }
    });
  });
});


module.exports = router;