import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { list, get, update, remove, create } from '../controllers/users.js';

const router = express.Router();

const validate = (checks) => async (req, res, next) => {
    for (const c of checks) await c.run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

router.get('/', list);
router.get('/:id', validate([param('id').isInt()]), get);
router.post('/', validate([
    body('name').isString().notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
]), create);
router.put('/:id', validate([
    param('id').isInt(),
    body('name').optional().isString(),
    body('email').optional().isEmail(),
    body('password').optional().isLength({ min: 6 })
]), update);
router.delete('/:id', validate([param('id').isInt()]), remove);

export default router;