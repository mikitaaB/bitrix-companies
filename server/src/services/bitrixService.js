import axios from 'axios';

export async function getCompanies(page, perPage) {
    const WEBHOOK_URL = process.env['BITRIX_WEBHOOK_URL'];
    if (!WEBHOOK_URL) {
        throw new Error('BITRIX_WEBHOOK_URL is not defined');
    }

    const offset = (page - 1) * perPage;
    const batchStart = Math.floor(offset / 50) * 50;

    const response = await axios.get(`${WEBHOOK_URL}/crm.company.list`, {
        params: {
            start: batchStart,
            select: ["ID","TITLE","COMPANY_TYPE","INDUSTRY","REVENUE","CURRENCY_ID","EMPLOYEES","DATE_CREATE","DATE_MODIFY"]
        },
        timeout: 60000
    });

    const batch = response.data.result || [];
    const startInBatch = offset % 50;
    const items = batch.slice(startInBatch, startInBatch + perPage);
    const total = response.data.total;

    return { items, total };
}
