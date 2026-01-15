const { createClient } = require('next-sanity');

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-14',
    useCdn: false,
});

async function run() {
    console.log('Connecting to Sanity...');
    console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

    try {
        const post = await client.fetch(`*[_type == "post"][0]`);
        if (!post) {
            console.log('No posts found. Please ensure you have content in your dataset and the schema type is "post".');
            return;
        }

        console.log('Found post:', post.title);

        const content = post.content || post.body;
        console.log('Content field name found:', post.content ? 'content' : (post.body ? 'body' : 'UNKNOWN'));
        console.log('Content Type:', typeof content);
        console.log('Is Array?', Array.isArray(content));

        if (Array.isArray(content) && content[0]?._type === 'block') {
            console.log('RESULT: Content is PORTABLE TEXT.');
        } else if (typeof content === 'string') {
            console.log('RESULT: Content appears to be MARKDOWN or STRING.');
        } else {
            console.log('RESULT: Unknown content structure.');
            console.log(JSON.stringify(content, null, 2));
        }

    } catch (error) {
        console.error('Error fetching from Sanity:', error.message);
    }
}

run();
