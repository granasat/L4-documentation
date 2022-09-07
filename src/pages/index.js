import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className='flex items-center justify-center'>
      <div className='p-10 flex flex-col items-center justify-center h-12/12'>
        <h1 className=" flex items-center justify-center text-6xl">{siteConfig.title}</h1>
        <p className="flex items-center justify-center text-3xl text-center">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
      wrapperClassName='flex flex-col'
      >
      <div className='my-auto'>
        <HomepageHeader />
      </div>
      
      {/* <main>
        <HomepageFeatures />
      </main> */}
    </Layout>
  );
}
