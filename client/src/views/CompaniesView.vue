<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Company List</h1>
                <v-data-table
					:headers="headers"
					:items="companies"
					:items-length="total"
					:items-per-page="perPage"
					:loading="loading"
					class="elevation-1"
					@update:items-per-page="onPerPageChange"
				>
					<template v-slot:loading>
						<v-skeleton-loader type="table" />
					</template>
				</v-data-table>

				<v-pagination
					v-model="page"
					:length="totalPages"
					class="mt-4"
					@update:modelValue="loadCompanies"
				/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { fetchCompanies } from '../api/bitrix';
import type { Company, PaginatedResponse } from '../types/company';

const companies = ref<Company[]>([]);
const headers = [
    { title: 'ID', key: 'ID' },
    { title: 'Title', key: 'TITLE' },
    { title: 'Type', key: 'COMPANY_TYPE' },
    { title: 'Industry', key: 'INDUSTRY' },
    { title: 'Revenue', key: 'REVENUE' },
    { title: 'Currency', key: 'CURRENCY_ID' },
    { title: 'Employees', key: 'EMPLOYEES' },
    { title: 'Created', key: 'DATE_CREATE' },
    { title: 'Modified', key: 'DATE_MODIFY' }
];
const page = ref(1);
const perPage = ref(50);
const total = ref(0);
const totalPages = ref(1);
const loading = ref(false);

const loadCompanies = async () => {
    loading.value = true;
    try {
        const data: PaginatedResponse<Company> = await fetchCompanies(page.value, perPage.value)
        companies.value = data.items.map(item => ({
            ...item,
            DATE_CREATE: formatDate(item.DATE_CREATE),
            DATE_MODIFY: formatDate(item.DATE_MODIFY),
        }))
        total.value = data.total
        totalPages.value = Math.ceil(total.value / perPage.value)
    } finally {
        loading.value = false
    }
};

const onPerPageChange = async (newPerPage: number) => {
    perPage.value = newPerPage;
	page.value = 1;
    await loadCompanies();
};

const formatDate = (dateStr?: string): string => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

onMounted(loadCompanies);
</script>
