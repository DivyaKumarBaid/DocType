import Header from "../src/components/Header";
import FileUpload from "../src/components/FileUpload";
import { CanvasProvider } from "../src/context/CanvasContext";

export default function Home() {
  return (
    <CanvasProvider>
      <FileUpload />
    </CanvasProvider>
  );
}
