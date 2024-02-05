import express from 'express';
import * as User from '../Controllers/User.js';

const router = express.Router();

router.post('/register', User.register);
router.post('/login', User.login);
router.get('/', User.getUsers);
router.get('/:id', User.getUserById);
router.put('/:id', User.updateUser);
router.delete('/:id', User.deleteUser);

export default router;