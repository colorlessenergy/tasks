import Head from 'next/head';

import Nav from '../components/Nav';

export default function Home() {
    return (
        <div>
            <Head>
                <title>tasks</title>
                <meta name="description" content="tasks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />
        </div>
    );
}
