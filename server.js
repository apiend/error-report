const express = require('express');

const app = express();
const router = express.Router();
router.get('/', function (req, res, next) {
    req.url = './index.html';
    next();
});
app.use(router);

console.log("localhost:3300");
app.use(express.static('./example/'));
const server = app.listen(3300)