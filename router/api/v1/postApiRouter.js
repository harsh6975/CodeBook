const express = require("express");
const postApiController =require('../../../controllers/api/v1/postApi');

const router = express.Router();

router.get('/',postApiController.index);
router.delete('/:id',postApiController.destroy);

module.exports = router;