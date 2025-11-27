import type { Company, PaginatedResponse } from '../types/company';
import requestClient from './requestClient';

export async function fetchCompanies(
    page: number = 1,
    perPage: number = 50
): Promise<PaginatedResponse<Company>> {
    return requestClient.get('/companies', { params: { page, perPage } });
}
