import React from 'a2r/react';
import Head from 'a2r/head';
import Link from 'a2r/link';

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