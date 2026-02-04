import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    // We run both fetches in parallel for speed
    const [mediumRes, githubRes] = await Promise.all([
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@dincertekin`),
        fetch(`https://api.github.com/users/dincertekin/repos?per_page=15`)
    ]);

    const mediumData = await mediumRes.json();
    const githubData = await githubRes.json();

    return {
        posts: mediumData.items || [],
        // Sort and slice on the server
        repos: Array.isArray(githubData) 
            ? githubData.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 4)
            : []
    };
};