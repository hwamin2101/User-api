import { Router } from 'express';
const router = Router();
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

// POST /api/users/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, dateOfBirth } = req.body;
    const result = await createUser(name, email, password, dateOfBirth);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/users (get all user)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/users/:id (get user by id)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await getUserById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/users/:id (update user)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await updateUser(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/users/:id ( delete user)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    res.status(204).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;