import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Index =  (): JSX.Element => (
  <React.Fragment>
    <Head>
      <title>Buscaminas</title>
    </Head>
    <h1>Buscaminas</h1>
    <p>
      <Link href="/styleA">
        <a className="menu">Versión A</a>
      </Link>
    </p>
    <p>
      <Link href="/styleB">
        <a className="menu">Versión B</a>
      </Link>
    </p>
  </React.Fragment>
);

export default Index;