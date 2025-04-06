
export async function garageData() {

	const url = "https://rss-news-api.onrender.com/mocks/sources"

	try {
			const response = await fetch(url);
			if (!response.ok) {
					throw new Error(`Response status: ${response.status}`);
			}
			return await response.json();
	} catch (error) {
			console.error(error.message);
	}
	
}
