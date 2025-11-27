export interface Company {
    ID: string;
    COMPANY_TYPE?: string;
    TITLE: string;
    INDUSTRY?: string;
    REVENUE?: string;
    CURRENCY_ID?: string;
    EMPLOYEES?: string;
    DATE_CREATE?: string;
    DATE_MODIFY?: string;
    ADDRESS?: string;
    PHONE?: string;
    EMAIL?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
}
