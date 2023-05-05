<script lang="ts">
	import { onMount } from 'svelte';
	// On mount
	onMount(() => {
		// Attach a listener to form submit
		document.querySelector('form').addEventListener('submit', (e) => {
			// Prevent default form submission
			e.preventDefault();
			// Get the value of the input
			const domain = e.target.querySelector('input').value;
			if (!domain) return;
			// Strip protocol from domain name
			const d = domain.replace(/(^\w+:|^)\/\//, '');
			// Navigate to the domain page
			window.location.href = `/${d}`;
		});
	});
</script>

<div class="flex flex-col items-center justify-center h-screen">
	<div class="w-full max-w-sm p-4 mx-auto dark:bg-slate-500 bg-white rounded-md shadow-md">
		<h1 class="text-3xl font-bold text-center text-gray-900 dark:text-white">Fursona Lookup</h1>
		<p class="mb-4 text-center text-gray-700 dark:text-gray-200">
			Enter a domain name to lookup a fursona, using <a
				class="text-blue-500 dark:text-blue-200 underline"
				href="https://github.com/theHedgehog0/fursona-schema">.well-known/fursona</a
			>.
		</p>
		<!-- Alert -->
		<span class="hidden mb-4 text-sm text-red-600" id="alert" />
		<form>
			<input
				type="text"
				class="w-full px-4 py-2 mb-4 dark:bg-white border rounded-md focus:outline-none focus:border-indigo-500"
				placeholder="Domain Name"
			/>
			<input
				type="submit"
				value="Search"
				class="w-full px-4 py-2 text-lg font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
			/>
		</form>
	</div>
</div>
