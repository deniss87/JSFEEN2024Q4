
export interface NewsData {
	articles?: {
			source: { 
				name: string 
			};
			author?: string;
			title: string;
			description: string;
			url: string;
			urlToImage?: string;
			publishedAt: string;
	}[];
}

export interface NewsItem {
	source: { 
		name: string 
	};
	author?: string;
	title: string;
	description: string;
	url: string;
	urlToImage?: string;
	publishedAt: string;
};

export interface SourcesData {
	sources?: { 
			id: string;
			name: string 
	}[];
}

export interface SourcesItems {
	id: string;
	name: string;
};