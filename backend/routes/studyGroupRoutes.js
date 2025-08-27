const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Hamara Guard
const StudyGroup = require('../models/studyGroupModel');

// Route: GET /api/groups
// Description: Saare study groups fetch karein
// Access: Private (Sirf logged-in user hi access kar sakta hai)
router.get('/', protect, async (req, res) => {
    try {
        // Humne middleware me req.user set kiya tha, isliye humein yahan user mil jayega
        console.log(`Fetching groups for user: ${req.user.name}`);

        const groups = await StudyGroup.find({}).populate('createdBy', 'name'); // createdBy field me user ka naam bhi le aao
        res.status(200).json(groups);
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;