const express = require('express');
const {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  completeTask
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.post('/', addTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/complete', completeTask);

module.exports = router;
