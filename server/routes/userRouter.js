const router = require("express").Router();

router.get("/test", (req, res) => {
  res.send("Hello!! This is working!");
});

module.exports = router;
