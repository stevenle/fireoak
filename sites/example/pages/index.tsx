import type {NextPage} from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {withEditor} from 'fireoak-editor';
import {Document} from 'fireoak-server';

interface HomePageData {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
  };
}

const Home: NextPage = withEditor(({data}: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{data?.meta?.title || 'Untitled'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        hello world: {JSON.stringify(data)}
      </main>
    </div>
  )
}, {
  docId: 'pokemongo/Page/home',
  schema: {},
});

export default Home;

export async function getStaticProps() {
  const doc = new Document<HomePageData>('example/Page/home');
  const data = await doc.getData({env: 'staging'});
  return {
    props: {
      initialData: data,
    },
  };
}
