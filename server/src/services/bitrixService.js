import axios from 'axios';

export async function getCompanies(limit = 10000) {
    const WEBHOOK_URL = process.env['BITRIX_WEBHOOK_URL'];
    if (!WEBHOOK_URL) {
        throw new Error('BITRIX_WEBHOOK_URL is not defined');
    }
    let allCompanies = [];
    let start = 0;

    while (allCompanies.length < limit) {
        const response = await axios.get(`${WEBHOOK_URL}/crm.company.list`, {
            params: { start },
            timeout: 60000
        });

        const companies = response.data.result;
        allCompanies.push(...companies);

        if (!response.data.next) break;
        start = response.data.next;
    }

    return allCompanies.slice(0, limit);
}
