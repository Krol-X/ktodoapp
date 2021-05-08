const router = require('express').Router();

router.use('/todoitem', require('./todoitem/api'));

router.use((err, req, res) => {
  console.log(err.stack);

  res.status(err.status || 500)
    .json({
      'errors': {
        message: err.message,
        error: err
      }
    });
});

module.exports = router;