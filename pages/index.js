import FileUpload from "../src/components/FileUpload";
import Head from 'next/head'
import React from "react";

export default function Home() {

  return (
    <div>
      <Head>
        <title>!DocType</title>
        <meta
          name="description"
          content="Edit your pdf online in an instant and download instantly."
        />
        <link rel="icon" href="./logo.png" />
      </Head>
      <FileUpload />
    </div>
  );
}
