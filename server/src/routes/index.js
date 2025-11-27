import { Router } from 'express';
import { getCompanies } from '../services/bitrixService.js';

const router = Router();

router.get('/companies', async (req, res) => {
    try {
        const page = Number.parseInt(req.query.page, 10) || 1;
        const perPage = Number.parseInt(req.query.perPage, 10) || 50;

        if (Number.isNaN(page) || page < 1) {
            return res.status(400).json({ error: 'Invalid page parameter. Must be >= 1' });
        }

        const allowedPerPage = [10, 25, 50];
        if (Number.isNaN(perPage) || !allowedPerPage.includes(perPage)) {
            return res.status(400).json({ error: 'Invalid perPage parameter. Must be one of 10, 25, 50' });
        }

        const { items, total } = await getCompanies(page, perPage);

        res.json({ items, total });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch companies' });
    }
});

export default router;
