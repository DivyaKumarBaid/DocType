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
        <div className={`min-h-[90vh] ${contextValues.theme && "text-white bg-[rgb(20,20,20)]"}`}>
            {contextValues.selectedFile && <SideBar />}
            {contextValues.selectedFile ?
                <div className={`w-full py-8 ${contextValues.theme ? "text-white bg-[rgb(20,20,20)]" : "text-black bg-white"}`}>
                    <div className='p-2 bg-red-500 shadow-sm rounded-md text-white fixed top-5 right-5 cursor-pointer' onClick={() => contextValues.setFile(null)}>
                        <MdClose className='text-white text-xl' />
                    </div>

                    <div className={`flex justify-center items-center ${contextValues.theme ? "text-white bg-[rgb(20,20,20)]" : "text-black bg-white"}`}>

                        <div id="singlePageExport" className={`${contextValues.theme ? "text-white bg-[rgb(20,20,20)]" : "text-black bg-white"}`}>
                            <Document file={contextValues.selectedFile} onLoadSuccess={onDocumentLoadSuccess} className="flex justify-center" id="doc">

                                <div className='absolute z-[9] px-4 py-4'>
                                    <canvas id="canvas" />
                                </div>
                                <div className={`px-4 py-4 ${!contextValues.isExporting && contextValues.theme ? "bg-[rgb(25,25,25)] shadow-[0px_0px_16px_rgb(0,0,0)] border-none" : "shadow-lg border"}`}>
                                    <Page pageNumber={contextValues.currPage} id="docPage" width={595} height={842} />
                                </div>

                            </Document>
                        </div>
                    </div>
                    <div className='fixed bottom-2 flex items-center justify-center w-full gap-3 z-50'>
                        {contextValues.currPage > 1 && <button onClick={() => changePage(-1)} className='px-4 py-2 bg-gray-700 rounded-md text-white'>{'<'}</button>}
                        <div className='px-4 py-2 bg-gray-700 rounded-md text-white'>Page {contextValues.currPage} of {contextValues.numPages}</div>
                        {contextValues.currPage < contextValues.numPages && <button onClick={() => changePage(1)} className='px-4 py-2 bg-gray-700 rounded-md text-white'>{'>'}</button>}
                    </div>
                </div>
                : <div className="w-full min-h-[80vh] py-8 flex items-center justify-center" {...getRootProps()}>
                    <div className="flex w-[40vw] h-[40vh] justify-center items-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                            {/* <svg
                                className="mx-auto h-16 w-16 text-gray-400"
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
                            </svg> */}
                            <svg className="mx-auto my-6" viewBox="0 0 126.63 224.51" width={80}><polygon points="72.39 149.79 71.46 33.07 119.41 1.84 119.41 178.41 72.39 149.79" fill="none" stroke="#646464" stroke-miterlimit="10" stroke-width="2" /><polygon points="119.41 1.84 125.63 3.54 125.63 174.54 119.41 178.41 119.41 1.84" fill="none" stroke="#646464" stroke-miterlimit="10" stroke-width="2" /><path d="M-3064.68,636.74a1.45,1.45,0,0,1-1-.44,1.45,1.45,0,0,1-.42-1l.12-46.06a1.46,1.46,0,0,1,.69-1.24l123.81-76.64v49.45a1.45,1.45,0,0,1-.7,1.25l-121.7,74.49A1.46,1.46,0,0,1-3064.68,636.74Z" transform="translate(3067.14 -444.97)" fill="none" stroke="#646464" stroke-miterlimit="10" stroke-width="2" /><path d="M-3060.3,649.17a1.43,1.43,0,0,1-1.41-1.06,1.43,1.43,0,0,1,.64-1.65l119.55-74.14V619.8c-30.62,19-47,29.18-47.31,29.36l-.16.07a1.44,1.44,0,0,1-.51.09h0Z" transform="translate(3067.14 -444.97)" fill="none" stroke="#646464" stroke-miterlimit="10" stroke-width="2" /><path d="M-2974.27,651.77a1.44,1.44,0,0,1,.69-1.24l32-20v16.71a1.46,1.46,0,0,1-.71,1.25l-32,19.18Z" transform="translate(3067.14 -444.97)" fill="none" stroke="#646464" stroke-miterlimit="10" stroke-width="2" /></svg>
                            <div className={`flex text-md ${contextValues.theme ? "text-gray-400" : "text-gray-600"}`} >
                                <label
                                    className="relative cursor-pointer rounded-md bg-transparent font-medium text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    <span>Upload a file</span>
                                </label>
                                <input type="file" className="sr-only" accept="application/pdf"
                                    {...getInputProps()}
                                />
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-sm">PDF</p>
                        </div>
                    </div>
                </div>}
        </div>
    );
}