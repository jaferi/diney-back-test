const express = require('express');
const {
    createProperty,
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty
} = require('../controllers/PropertyController');

const router = express.Router();

router.route('/properties')
    .get(getAllProperties)      // GET /properties
    .post(createProperty);      // POST /properties

router.route('/properties/:id')
    .get(getPropertyById)       // GET /properties/:id
    .put(updateProperty)        // PUT /properties/:id
    .delete(deleteProperty);    // DELETE /properties/:id

module.exports = router;
