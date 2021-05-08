const router = require('express').Router();
const TodoItem = require('./model');
const tools = require('../tools');

router.post('/', (req, res, next) => {
  const all = req.body;
  if (!all.title) return res.status(500).json();
  const item = new TodoItem(all);

  TodoItem.collection.insertOne(item)
    .then(item => res.json(item.ops[0]))
    .catch(next);
});

router.get('/', (req, res, next) => {
  const all = req.body;

  TodoItem.find(tools.removeMyEmpty(all))
    .then(items => res.json(items || []))
    .catch(next);
});

router.put('/', (req, res, next) => {
  const all = req.body;
  const new_data = Object.assign({
    title: all.title,
    done: all.done,
    description: all.description
  });

  TodoItem.findByIdAndUpdate(all._id, new_data)
    .then(item => {
      if (item) {
        res.json({
          changes: new_data,
          old: item
        });
      } else {
        res.status(500).json({
          errors: {
            message: 'Cannot find item to update',
            err: all
          }
        });
      }
    })
    .catch(next);
});

router.delete('/', (req, res, next) => {
  const all = req.body;

  TodoItem.findByIdAndRemove(all._id)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        res.status(500).json({
          errors: {
            message: 'Cannot find item to delete',
            err: all
          }
        });
      }
    })
    .catch(next);
});

module.exports = router;