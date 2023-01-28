import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useDropzone } from 'react-dropzone';
import { fabric } from 'fabric';
import { useButtons } from '../context/CanvasContext';
import SideBar from './SideBar';
import { MdClose } from 'react-icons/md';


export default function FileUpload() {
    const contextValues = useButtons();
    const [isExporting, setExporting] = React.useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: files => contextValues.setFile(files[0])
    })

    function onDocumentLoadSuccess({ numPages }) {
        contextValues.setEdits({});
        contextValues.setNumPages(numPages);
        contextValues.setCurrPage(1);
        contextValues.setCanvas(initCanvas());
    }

    function changePage(offset) {
        const page = contextValues.currPage;
        contextValues.edits[page] = contextValues.canvas.toObject();
        contextValues.setEdits(contextValues.edits);
        contextValues.setCurrPage(page => page + offset);
        contextValues.canvas.clear()
        contextValues.edits[page + offset] && contextValues.canvas.loadFromJSON(contextValues.edits[page + offset]);
        contextValues.canvas.renderAll();
    }

    // fabric js
    const initCanvas = () => {
        return (new fabric.Canvas('canvas', {
            isDrawingMode: false,
            height: 842,
            width: 595,
            backgroundColor: 'rgba(0,0,0,0)'
        }))
    }

    // fabric js

    React.useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }, [])

    return (
        <div>
            {contextValues.selectedFile && <SideBar />}
            {contextValues.selectedFile ?
                <div className="w-full py-8">
                    <div className='p-2 bg-red-500 shadow-sm rounded-md text-white fixed top-5 right-5' onClick={() => contextValues.setFile(null)}><MdClose className='text-white text-xl' /></div>
                    <div className="flex justify-center items-center">
                        <div id='singlePageExport'>
                            <Document file={contextValues.selectedFile} onLoadSuccess={onDocumentLoadSuccess} className="flex justify-center" id="doc">

                                <div className='absolute z-[9]'>
                                    <canvas id="canvas" />
                                </div>

                                <Page pageNumber={contextValues.currPage} id="docPage" className={`px-4 py-2 ${!contextValues.isExporting && "shadow-lg border"}`} width={595} height={842} />

                            </Document>
                        </div>
                    </div>
                    <div className='fixed bottom-2 flex items-center justify-center w-full gap-3 z-50'>
                        {contextValues.currPage > 1 && <button onClick={() => changePage(-1)} className='px-4 py-2 bg-gray-700 rounded-md text-white'>{'<'}</button>}
                        <div className='px-4 py-2 bg-gray-700 rounded-md text-white'>Page {contextValues.currPage} of {contextValues.numPages}</div>
                        {contextValues.currPage < contextValues.numPages && <button onClick={() => changePage(1)} className='px-4 py-2 bg-gray-700 rounded-md text-white'>{'>'}</button>}
                    </div>
                </div>
                : <div className="w-full py-8 flex items-center justify-center" {...getRootProps()}>
                    <div className="flex w-1/2 justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                                <label
                                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    <span>Upload a file</span>
                                </label>
                                <input type="file" className="sr-only" accept="application/pdf"
                                    {...getInputProps()}
                                />
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PDF</p>
                        </div>
                    </div>
                </div>}
        </div>
    );
}