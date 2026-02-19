import type { PageLoad } from './$types';

interface MediumPost {
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    enclosure: {
        link: string;
        type: string;
        length: number;
    };
    categories: string[];
}

interface MediumResponse {
    status: string;
    feed: {
        title: string;
        link: string;
        author: string;
        description: string;
        image: string;
    };
    items: MediumPost[];
}

export const load: PageLoad = async ({ fetch }) => {
    const [mediumRes, githubRes] = await Promise.all([
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@dincertekin`),
        fetch(`https://api.github.com/users/dincertekin/repos?per_page=15`)
    ]);

    const mediumData = await mediumRes.json() as MediumResponse;
    const githubData = await githubRes.json();

    return {
        posts: mediumData.items ?? [],
        repos: Array.isArray(githubData) 
            ? githubData.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 4)
            : []
    };
};