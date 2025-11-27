<template>
	<v-app>
		<v-main>
			<CompaniesView />
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
import CompaniesView from './views/CompaniesView.vue';
</script>

<style>
body {
	margin: 0;
	font-family: Roboto, sans-serif;
}
</style>
