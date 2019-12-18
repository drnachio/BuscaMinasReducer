import React from 'a2r/react';
import Head from 'a2r/head';
import Link from 'a2r/link';
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
