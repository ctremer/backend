const express = require('express');
const router = express.Router({ mergeParams: true });
const scholarshipController = require('../../controller/scholarshipController');

router.get('/fetch', scholarshipController.fetch);
router.post('/create', scholarshipController.create);
router.delete('/delete/:id', scholarshipController.delete);
router.put('/update/:id', scholarshipController.update);

module.exports = router;
