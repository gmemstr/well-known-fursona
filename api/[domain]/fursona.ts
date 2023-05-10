export const config = {
	runtime: 'edge'
};

async function fetcher(url: string) {
	console.log(`https://${url}/.well-known/fursona`);
	let res = await fetch(`https://${url}/.well-known/fursona`);
	// If 404, return null
	if (res.status === 404) {
		res = await fetch(`https://${url}/.well-known/fursona.json`);
		if (res.status === 404) {
			return null
		}
	}
	// Try to parse json, if not return null
	try {
		const json = await res.json();
		return json;
	} catch (e) {
		return null;
	}
}


export default async (request: Request) => {
	// Proxy the request to the `req.url` value and return it as a JSON string.
	const params = new URL(request.url).searchParams;
	const domain = params.get('domain') as string;
	const data = await fetcher(domain);
	if (data === null) {
		return new Response('Not Found', { status: 404 });
	}
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': 'public, max-age=300, must-revalidate',
		}
	});
};
