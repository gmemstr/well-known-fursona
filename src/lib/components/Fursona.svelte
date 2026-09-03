<script lang="ts">
	import { onMount } from 'svelte';
	import type { FursonaSchema, Sona } from '$lib/Fursona';
	import { validateFursona, isURL } from '$lib/Fursona';

	export let fursona = {} as Sona;

	const validation = validateFursona(fursona);

	// Parse birthdate
	const sonaBirthDate = fursona.birthdate ? new Date(fursona.birthdate) : undefined;

	function toggleReasons() {
		const reasons = document.getElementById('reasons');
		if (!reasons) return;
		if (reasons.classList.contains('hidden')) {
			reasons.classList.remove('hidden');
		} else {
			reasons.classList.add('hidden');
		}
	}
</script>

<div
	class="flex flex-col items-center justify-center text-slate-900 dark:text-white dark:bg-slate-500"
>
	{#if validation.length > 0}
		<div
			class="flex flex-col items-center justify-center text-slate-900 dark:text-white dark:bg-slate-500"
		>
			<button class="text-center cursor-pointer" on:click={toggleReasons}>
				⚠️: Fursona data does not comply to schema
			</button>
			<div class="hidden" id="reasons">
				{#each validation as error}
					<ul class="list-inside text-center">
						<li>{error}</li>
					</ul>
				{/each}
			</div>
		</div>
	{/if}
	{#if fursona.avatar && fursona.avatarAlt}
		<img src={fursona.avatar} alt="{fursona.avatarAlt}" class="rounded" />
	{:else if fursona.avatar}
		<img src={fursona.avatar} alt="{fursona.name} avatar image" class="rounded" />
	{/if}
	<h1 class="text-3xl text-center leading-none md:text-3xl lg:text-3xl">
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
	{#if sonaBirthDate && fursona.age}
		<p class="mb-3 text-center">🎂{sonaBirthDate.toLocaleDateString()} ({fursona.age})</p>
	{:else if sonaBirthDate}
		<p class="mb-3 text-center">🎂{sonaBirthDate.toLocaleDateString()} ({new Date().getFullYear() - sonaBirthDate.getFullYear()})</p>
	{:else if fursona.age}
		<p class="mb-3 text-center">{fursona.age}</p>
	{/if}
	<div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
		{#if fursona.colors}
			{#each fursona.colors as color}
				<div class="m-4 flex flex-col items-center bg-white dark:bg-slate-500 rounded">
					<div class="color-square mb-2" style="background-color: {color};"></div>
					<p class="text-sm font-mono">{color}</p>
				</div>
			{/each}
		{/if}
	</div>
	{#if fursona.ref}
		<h2 class="mb-2 text-2xl leading-none md:text-2xl lg:text-2xl">Ref Sheet</h2>
		<button popovertarget="popover-refsheet-{fursona.name}" class="cursor-pointer">
			<figure class="table mx-auto">
				<img src={fursona.ref} alt="{fursona.refAlt}" class="h-auto max-w-full rounded-base" /><br />
				<figcaption class="table-caption caption-bottom">
					<h3 class="text-center wrap-break-word text-md text-blue-500 dark:text-blue-200 underline">View Ref Sheet</h3>
				</figcaption>
			</figure>
		</button>
		<div
			id="popover-refsheet-{fursona.name}"
			class="fixed inset-0 m-auto w-fit h-fit max-h-[90dvh] max-w-[90dvw] p-4 bg-white dark:bg-slate-500 dark:text-white border rounded-lg shadow-xl overflow-auto border-blue-gray-50 text-blue-gray-500 shadow-blue-gray-500/10 backdrop:bg-black/50 backdrop:backdrop-blur-sm focus:outline-none"
			popover
		>
			<figure class="table mx-auto">
				<img
					src={fursona.ref}
					alt={fursona.refAlt}
					title={fursona.refAlt}
					class="rounded-lg max-h-[calc(80dvh-2rem)] max-w-full w-auto h-auto object-contain mx-auto"
				/>
				<figcaption class="table-caption caption-bottom pt-2">
					{#if fursona.refAlt}
						<p class="text-center text-sm font-mono break-words">Alt text: {fursona.refAlt}</p>
					{/if}
				</figcaption>
			</figure>
		</div>
	{/if}
	{#if fursona.gallery}
		<h2 class="mb-2 text-2xl leading-none md:text-2xl lg:text-2xl">Gallery</h2>
		<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
			{#each fursona.gallery as image}
				<div>
					<button popovertarget="popover-{image.image}" class="cursor-pointer">
						<figure class="table mx-auto">
							<img src={image.image} alt="{image.imageAlt}" class="h-auto max-w-full rounded-base" /><br />
							<figcaption class="table-caption caption-bottom">
								<h3 class="text-center wrap-break-word text-md text-blue-500 dark:text-blue-200 underline">View image</h3>
							</figcaption>
						</figure>
					</button>
				</div>
				<div
					id="popover-{image.image}"
					class="fixed inset-0 m-auto w-fit h-fit max-h-[90dvh] max-w-[90dvw] p-4 bg-white dark:bg-slate-500 dark:text-white border rounded-lg shadow-xl overflow-auto border-blue-gray-50 text-blue-gray-500 shadow-blue-gray-500/10 backdrop:bg-black/50 backdrop:backdrop-blur-sm focus:outline-none"
					popover
				>
					<figure class="table mx-auto">
						<img
							src={image.image}
							alt={image.imageAlt}
							title={image.imageAlt}
							class="rounded-lg max-h-[calc(80dvh-2rem)] max-w-full w-auto h-auto object-contain mx-auto"
						/>
						<figcaption class="table-caption caption-bottom pt-2">
							{#if image.description}
								<h3 class="text-center text-xl font-bold wrap-break-word">{image.description}</h3>
							{/if}
							{#if image.imageAttribution}
								<p class="text-center text-sm wrap-break-word"> Attribution:
								{#if isURL(image.imageAttribution)}
									<a
											class="text-blue-800 dark:text-blue-200 underline"
											href={image.imageAttribution}
											target="_blank"
											rel="noreferrer">{image.imageAttribution}</a
										>
								{:else}
									{image.imageAttribution}
								{/if}
								</p>
							{/if}
							{#if image.imageAlt}
								<p class="text-center text-sm wrap-break-word">Alt text: {image.imageAlt}</p>
							{/if}
						</figcaption>
					</figure>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
    .color-square {
        width: 100px;
        height: 100px;
    }
</style>
