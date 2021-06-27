const express = require('express');
const router = express.Router();
const Controller = require('../controllers/EmployeeController');


router.get('/employees', Controller.index);

router.get('/search/:search', Controller.show);

router.post('/create', Controller.create)

router.put('/posts/:id', async function (req, res) {

});

router.delete('/posts/:id', async function (req, res) {

});






module.exports = router;
