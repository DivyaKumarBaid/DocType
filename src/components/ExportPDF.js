import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { fabric } from 'fabric';
import { useButtons } from '../context/CanvasContext';

export default function ExportPDF() {
    const contextValues = useButtons();
    const [exportCanvas, setExportCanvas] = useState(null);
    const [numPages, setNumPages] = React.useState(null);
    const [currPage, setCurrPage] = React.useState(1);

    useEffect(() => {
        if (exportCanvas) {
            contextValues.edits[currPage] && exportCanvas.loadFromJSON(contextValues.edits[currPage]);
        }
    }, [contextValues.edits, currPage, exportCanvas])
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setCurrPage(1);
        setExportCanvas(initCanvas());
    }

    function changePage(offset) {
        const page = currPage;
        setCurrPage(page => page + offset);
        exportCanvas.clear()
        contextValues.edits[page + offset] && exportCanvas.loadFromJSON(contextValues.edits[page + offset], exportCanvas.renderAll.bind(exportCanvas));
    }

    // fabric js
    const initCanvas = () => (
        new fabric.StaticCanvas('canvas-export', {
            isDrawingMode: false,
            height: 842,
            width: 595,
            backgroundColor: 'rgba(0,0,0,0)'
        })
    )

    // fabric js

    React.useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }, [])

    return (
        <div>
            {contextValues.selectedFile ?
                <div className="w-full py-8">
                    <div ref={contextValues.exportPage} id="toExport">
                        <Document file={contextValues.selectedFile} onLoadSuccess={onDocumentLoadSuccess} className="flex justify-center">

                            <div className='absolute z-[9]'>
                                <canvas id="canvas-export" />
                            </div>

                            <Page pageNumber={currPage} id="docPage" className="px-4 py-2 shadow-lg border" width={595} height={842} />
                        </Document>
                    </div>
                    <div className='fixed top-1 flex items-center justify-center w-full gap-3 mt-3 opacity-70'>
                        {currPage > 1 && <button onClick={() => changePage(-1)} className='px-2 py-1 text-sm bg-gray-700 rounded-md text-white'>{'<'}</button>}
                        <div className='px-2 py-1 text-sm bg-gray-700 rounded-md text-white'>Page {currPage} of {numPages}</div>
                        {currPage < numPages && <button onClick={() => changePage(1)} className='px-2 py-1 text-sm bg-gray-700 rounded-md text-white'>{'>'}</button>}
                    </div>
                </div>
                : null}
        </div>
    );
}