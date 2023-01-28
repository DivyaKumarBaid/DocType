import Header from "./components/Header";
import FileUpload from "./components/FileUpload";
import { CanvasProvider } from "./context/CanvasContext";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Guide from "./components/Guide";

function App() {
  return (
    <CanvasProvider>
      <Header />
      <Router>
        <Routes>
          <Route exact path='/' element={
            <>
              <FileUpload />
            </>}
          />
          <Route exact path='/guide' element={<Guide />} />
        </Routes>
      </Router>
    </CanvasProvider>
  );
}

export default App;