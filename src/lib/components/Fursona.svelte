<script lang="ts">
	import { onMount } from 'svelte';
	import type { FursonaSchema, Sona } from '$lib/Fursona';
	export let fursona = {} as Sona;

	// Parse birthdate
	if (fursona.birthdate) {
		fursona.birthdate = new Date(fursona.birthdate);
	}
</script>

<div
	class="flex flex-col items-center justify-center text-slate-900 dark:text-white dark:bg-slate-500"
  >
    {#if fursona.avatar}
	  <img src={fursona.avatar} alt="{fursona.name} avatar image" class="rounded" />
	{/if}
	<h1 class="text-3xl leading-none md:text-3xl lg:text-3xl">
	  {fursona.name}
	  {#if fursona.pronouns}
		({fursona.pronouns})
	  {/if}
	</h1>
	<h2 class="mb-2 text-2xl leading-none md:text-2xl lg:text-2xl">
	  {#if fursona.gender}
	    {fursona.gender}
	  {/if}
	  {fursona.species}
	</h2>
	<p class="mb-3 text-center">{fursona.description}</p>
	{#if fursona.birthdate && fursona.age}
	  <p class="mb-3 text-center">🎂{fursona.birthdate.toLocaleDateString()} ({fursona.age})</p>
	{:else if fursona.birthdate}
	  <p class="mb-3 text-center">🎂{fursona.birthdate.toLocaleDateString()}</p>
	{:else if fursona.age}
	  <p class="mb-3 text-center">{fursona.age}</p>
	{/if}
	<div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
		{#each fursona.colors as color}
			<div class="m-4 flex flex-col items-center bg-white dark:bg-slate-500 rounded">
				<div class="color-square mb-2" style="background-color: {color};" />
				<p class="text-sm font-mono">{color}</p>
			</div>
		{/each}
	  </div>
	{#if fursona.ref}
	<a
		href={fursona.ref}
		target="_blank"
		class="mb-4 mt-4 text-md text-blue-500 dark:text-blue-200 underline">View Ref Sheet</a>
	{/if}
</div>

<style>
	.color-square {
		width: 100px;
		height: 100px;
	}
</style>
