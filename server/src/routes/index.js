import { Router } from 'express';
import { getCompanies } from '../services/bitrixService.js';

const router = Router();

router.get('/companies', async (req, res) => {
    try {
        const page = Number.parseInt(req.query.page, 10) || 1;
        const perPage = Number.parseInt(req.query.perPage, 10) || 50;

        const companies = await getCompanies();

        const start = (page - 1) * perPage;
        const end = start + perPage;

        const items = companies.slice(start, end);
        const total = companies.length;

        res.json({ items, total });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch companies' });
    }
});

export default router;
