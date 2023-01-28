import React, { useRef } from 'react'
import { fabric } from 'fabric'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const funButtons = React.createContext()

export const useButtons = () => {
    return React.useContext(funButtons)
}

export const CanvasProvider = ({ children }) => {
    // file
    const [numPages, setNumPages] = React.useState(null);
    const [currPage, setCurrPage] = React.useState(1);
    const [selectedFile, setFile] = React.useState(null);
    const [color, setColor] = React.useState("#f4a261");
    const [canvas, setCanvas] = React.useState('');
    const [isExporting, setExporting] = React.useState(false);

    const exportPage = useRef(null);
    const [exportPages, setExportPages] = React.useState([]);
    // canvas edits
    const [edits, setEdits] = React.useState({});
    // uploaded image

    const downloadPage = () => {
        setExporting(true);
        const doc = document.querySelector('#singlePageExport');
        html2canvas(doc)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("edge_lamp_edited.pdf");
                setExporting(false);
            });
    }

    const addImage = (e, canvi) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (f) {
            var data = f.target.result;
            fabric.Image.fromURL(data, function (img) {
                img.scaleToWidth(300);
                canvi.add(img).renderAll();
                var dataURL = canvi.toDataURL({ format: 'png', quality: 0.8 });
            });
        }
        reader.readAsDataURL(file);
        canvi.isDrawingMode = false
    }

    const addNote = (canvi) => {
        fabric.Image.fromURL(`./note/note${(Math.floor(Math.random() * 10) % 4) + 1}.png`, function (img) {
            img.scaleToWidth(100);
            canvi.add(img).renderAll();
            var dataURL = canvi.toDataURL({ format: 'png', quality: 0.8 });
        });
        canvi.isDrawingMode = false
    }

    const deleteBtn = () => {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.remove(activeObject);
        }
    }

    // add a rectangle
    const addRect = canvi => {
        const rect = new fabric.Rect({
            height: 180,
            width: 200,
            fill: color,
            cornerStyle: 'circle',
            editable: true
        });
        canvi.add(rect);
        canvi.renderAll();
        canvi.isDrawingMode = false
    }

    const addCircle = canvi => {
        const rect = new fabric.Circle({
            radius: 100,
            fill: color,
            cornerStyle: 'circle',
            editable: true
        });
        canvi.add(rect);
        canvi.renderAll();
        canvi.isDrawingMode = false
    }

    // add highlight
    const addHighlight = canvi => {
        const rect = new fabric.Rect({
            height: 20,
            width: 400,
            fill: color + '33',
            cornerStyle: 'circle',
            editable: true
        });
        canvi.add(rect);
        canvi.renderAll();
        canvi.isDrawingMode = false
    }

    // add text
    const addText = canvi => {
        const text = new fabric.Textbox("Type Here ...", {
            editable: true,
        });
        text.set({ fill: color })
        canvi.add(text);
        canvi.renderAll();
        canvi.isDrawingMode = false
    }

    const toggleDraw = canvi => {
        canvi.isDrawingMode = !canvi.isDrawingMode;
    }
    // add functions here
    const exportPdf = () => {
        setExportPages((prev) => ([...prev, exportPage.current]));
        console.log(exportPages)
    }
    return (
        <funButtons.Provider value={{ canvas, setCanvas, addRect, addCircle, addText, addImage, numPages, setNumPages, currPage, setCurrPage, selectedFile, setFile, addHighlight, toggleDraw, color, setColor, edits, setEdits, addNote, deleteBtn, exportPage, exportPdf, downloadPage, isExporting }}>
            {children}
        </funButtons.Provider>
    )
}
