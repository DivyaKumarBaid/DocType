import { Fragment } from 'react'
import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { fabric } from 'fabric';
import { Dialog, Transition } from '@headlessui/react'
import ExportPDF from './ExportPDF'
import { useButtons } from '../context/CanvasContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Backdrop, CircularProgress } from '@mui/material';

export default function ExportPopup(props) {

  const contextValues = useButtons();
  const [exportCanvas, setExportCanvas] = React.useState(null);
  const [numPages, setNumPages] = React.useState(null);
  const [currPage, setCurrPage] = React.useState(1);
  const [isExporting, setExporting] = React.useState(false);

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


  const onExport = () => {
    setCurrPage(1);
    setExporting(true)
    const docToExport = document.querySelector("#toExport");
    const pdf = new jsPDF("p", "mm", "a4");
    setTimeout(() => {
      let i = 0;
      let intervalId = setInterval(() => {
        html2canvas(docToExport)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0);
          });
        i = i + 1;
        i <= numPages ? changePage(1) : stopInterval();
        pdf.addPage();
        pdf.setPage(i);
      }, 3000)

      const stopInterval = () => {
        clearInterval(intervalId);
        var pageCount = pdf.internal.getNumberOfPages();
        pdf.deletePage(pageCount)
        pdf.save("Edge_lamp_editor.pdf");
        setExporting(false);
        props.setOpen(false);
      }

    }, 1000)

  }

  return (
    <>
      <Transition.Root show={props.open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={props.setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 w-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all">
                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isExporting}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <div className="mt-2">
                        <div>
                          {contextValues.selectedFile ?
                            <div className="w-full py-4">
                              <div ref={contextValues.exportPage} id="toExport" style={{ opacity: currPage <= numPages ? '1' : '0' }}>
                                <Document file={contextValues.selectedFile} onLoadSuccess={onDocumentLoadSuccess} className="flex justify-center">

                                  <div className='absolute z-[9]'>
                                    <canvas id="canvas-export" />
                                  </div>

                                  <Page pageNumber={currPage} id="docPage" className={`px-4 py-2 ${!isExporting && 'shadow-lg border'}`} width={595} height={842} />

                                </Document>
                              </div>
                              <div className='fixed top-1 flex items-center justify-center w-full gap-3 mt-3 opacity-70' style={{ opacity: currPage <= numPages ? '1' : '0' }}>
                                {currPage > 1 && <button onClick={() => changePage(-1)} className='px-2 py-1 text-sm bg-gray-700 rounded-md text-white'>{'<'}</button>}
                                <div className='px-2 py-1 text-sm bg-gray-700 rounded-md text-white'>Page {currPage} of {numPages}</div>
                                {currPage < numPages && <button onClick={() => changePage(1)} className='px-2 py-1 text-sm bg-gray-700 rounded-md text-white'>{'>'}</button>}
                              </div>
                            </div>
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                      onClick={() => onExport()}
                    >
                      {isExporting ? <span>Exporting...</span> : <span>Export</span>}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
