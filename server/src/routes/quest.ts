const express = require('express');
const questCtrl = require('../controllers/quest');

const router = express.Router();

// Create a quest
router.post('/', questCtrl.createQuest);

// Get all quests
router.get('/', questCtrl.getQuests);

// Update a quest
router.put('/', questCtrl.updateQuest);

// Delete a quest
router.delete('/', questCtrl.deleteQuest);

module.exports = router;