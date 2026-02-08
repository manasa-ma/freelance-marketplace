const express = require('express');
const { 
  createGig, 
  getGigs, 
  deleteGig, 
  getGig  // <--- ADD THIS HERE
} = require('../controllers/gig.controller');
const { verifyToken } = require('../middleware/jwt');

const router = express.Router();

router.post("/", verifyToken, createGig);
router.get("/", getGigs);
router.get("/single/:id", getGig); // This will now work
router.delete("/:id", verifyToken, deleteGig);

module.exports = router;