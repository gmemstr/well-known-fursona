<script lang="ts">
	// Get domain from route
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	// Import sona types
	import type { FursonaSchema, Sona } from '$lib/Fursona';
	import Fursona from '$lib/components/Fursona.svelte';

	let fursonas = {} as FursonaSchema;
	onMount(() => {
		// Set p content
		const p = document.querySelector('p');
		requestFursona();
	});

	// Request well-known/fursona file
	function requestFursona() {
		fetch(`/api/${$page.params.domain}/fursona`)
			.then((res) => res.json())
			.then((data) => {
				// Cast data to FursonaSchema
				const sonas_data = data as FursonaSchema;
				fursonas = sonas_data;
			})
			.catch((err) => {
				// Set p content to error
				const p = document.querySelector('p');
				p.innerHTML = `Error: Fursona resource (<code>https://${$page.params.domain}/.well-known/fursona</code>) not found <br /><code>${err}</code>`;
			});
	}
</script>

<div class="flex flex-row flex-wrap items-center justify-center">
	{#if fursonas.sonas}
		{#each fursonas.sonas as sona}
			<div class="m-4 max-w-md flex flex-col items-center justify-center">
				<div class="w-full max-w-sm p-4 dark:bg-slate-500 bg-white rounded-md shadow-md">
					<Fursona fursona={sona} />
				</div>
			</div>
		{/each}
	{:else}
		<div class="m-4 max-w-md flex flex-col items-center justify-center">
			<div class="w-full max-w-sm p-4 dark:bg-slate-500 bg-white rounded-md shadow-md">
				<p class="mb-3 text-center">Loading...</p>
			</div>
		</div>
	{/if}
</div>
