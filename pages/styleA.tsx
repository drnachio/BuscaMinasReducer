import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Board from '../components/Board';

const StyleA = (): JSX.Element => (
  <React.Fragment>
    <Head>
      <title>Buscaminas</title>
      <link rel="stylesheet" type="text/css" href="/css/style-a.css" />
    </Head>
    <Link href="/">
      <button type="button" className="back">
        Regresar
      </button>
    </Link>
    <Board />
  </React.Fragment>
);

export default StyleA;
