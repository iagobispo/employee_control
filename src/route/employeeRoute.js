const express = require('express');
const router = express.Router();
const Controller = require('../controllers/EmployeeController');


router.get('/employees', Controller.index);

router.get('/search/:search', Controller.show);

router.post('/create', Controller.create)

router.put('/employee/:id', Controller.update);

router.delete('/employee/:id', Controller.remove);


module.exports = router;
