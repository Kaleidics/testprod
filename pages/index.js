import { useEffect, useState } from 'react';
import Head from 'next/head';
import Post from '../components/post';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = publicRuntimeConfig;


const client = require('contentful').createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_ACCESS_TOKEN
});

function HomePage() {
    async function fetchEntries() {
        const entries = await client.getEntries();
        if (entries.items) return entries.items;
        console.log(`Error getting Entries for ${contentType.name}.`);
    }

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const allPosts = await fetchEntries();
            setPosts([...allPosts]);
        }
        getPosts();
    }, []);

    return (
        <>
            <Head>
                <title>Next.js + Contentful</title>
                <link rel='stylesheet' href='https://css.zeit.sh/v1.css' type='text/css' />
            </Head>
            {posts.length > 0
                ? posts.map(p => (
                      <Post
                          alt={p.fields.alt}
                          date={p.fields.date}
                          key={p.fields.title}
                          image={p.fields.image}
                          title={p.fields.title}
                          url={p.fields.url}
                      />
                  ))
                : null}
        </>
    );
}

export default HomePage;
