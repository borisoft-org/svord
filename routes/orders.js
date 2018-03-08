const express = require("express");
const router = express.Router();

/* Order-related pages */
router.get('/list', (req, res) => {
	res.send('<h1>GET Request sent to "/orders/list"</h1>');
});

module.exports = router;
