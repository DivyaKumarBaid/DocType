import FileUpload from "../src/components/FileUpload";
import { CanvasProvider } from "../src/context/CanvasContext";
import Head from 'next/head'

export default function Home() {
  return (
    <CanvasProvider>
      <Head>
        <title>!DocType</title>
        <meta
          name="description"
          content="Edit your pdf online in an instant and download instantly."
        />
        <link rel="icon" href="./logo.png" />
      </Head>
      <FileUpload />
    </CanvasProvider>
  );
}
