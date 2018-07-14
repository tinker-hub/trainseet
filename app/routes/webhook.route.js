const express = require ('express');
const router = express.Router();

router.get('/webhook/', (req, res) => {
  if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    return res.send(req.query['hub.challenge']);
  }
  res.send('wrong token');
});


module.exports = router;