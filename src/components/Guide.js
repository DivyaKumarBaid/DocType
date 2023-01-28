import React from "react";
import { AiFillGithub } from "react-icons/ai";

export default function Guide() {
    return (
        <div className="flex flex-col items-center w-full h-full gap-8">
            <h1 className=" my-4 heading text-5xl tracking-wider font-[Montserrat] text-center pt-5 text-[#2e2e2e]"><b>Useful Tools</b></h1>
            <ol className="orderedList text-indigo-600 text-white text-black my-2 rounded-2xl flex flex-col gap-8 mb-16">
                <li className="points shadow-[1px_1px_5px_rgba(0,0,0,0.15)] z-50 pt-5 px-4 pb-5"> <b>Salient Features</b>
                    <ul>
                        <li className="tool pt-7 py-3 border-b p-10 z-70 text-indigo-420"><b>Sticky Notes</b> <br /><p className="px-10 py-3 text-indigo-400">- Allows users to add a Sticky Notes on any page of the PDF document.</p></li>
                        <li className="tool py-5 border-b p-10 z-71 text-indigo-420"><b>Shape Tool</b>  <br /><p className="px-10 py-3 text-indigo-400">- Allows users to add a rectangle or a circle on any page of the PDF document.</p></li>
                        <li className="tool py-5 border-b p-10 z-73 text-indigo-420"><b>Text Box</b>  <br /><p className="px-10 py-3 text-indigo-400">-     Allows users to add an editable text box on any page of the PDF document.</p></li>
                        <li className="tool py-5 border-b p-10 z-74 text-indigo-420"><b>Image</b>  <br /><p className="px-10 py-3 text-indigo-400">-     Allows users to add an image on any page of the PDF document.</p></li>
                        <li className="tool py-5 border-b p-10 z-73 text-indigo-420"><b>Pencil</b>  <br /><p className="px-10 py-3 text-indigo-400">-     Allows users to draw any shape or make freehand annotations on the PDF document.</p></li>
                        <li className="tool py-5 border-b p-10 z-72 text-indigo-420"><b>Highlighter</b>  <br /><p className="px-10 py-3 text-indigo-400">-     Allows users to highlight any text or image on any page of the PDF document.</p></li>
                        <li className="tool py-5 border-b p-10 z-71 text-indigo-420"><b>Delete</b>  <br /><p className="px-10 py-3 text-indigo-400">-     Allows users to remove unwanted annotations or shapes from the PDF document.</p></li>
                        <li className="tool py-5 border-b p-10 z-70 text-indigo-420"><b>Delete All</b>  <br /><p className="px-10 py-3 text-indigo-400">-     Allows users to clear all annotations or shapes from a specific page of the PDF document.</p></li>
                        <li className="tool py-5 border-b p-10 z-70 text-indigo-420"><b>Download PDF</b>  <br /><p className="px-10 py-3 text-indigo-400">-     Allows users to download the updated PDF document in .pdf format.</p></li>
                        <li className="tool py-5 border-b p-10 z-70 text-indigo-420"><b>Download Page</b>  <br /><p className="px-10 py-3 text-indigo-400">-     Allows users to download a specific page from the PDF document in .pdf format.</p></li>
                        <li className="tool py-5 p-10 z-69 text-indigo-420"><b>Colour Picker</b>  <br /><p className="px-10 py-3 text-indigo-400">-     Allows users to pick a color of their choice. <br /> - The selected color will be applied to all subsequent annotations or shapes created with the other tools</p></li>
                    </ul>
                </li>
            </ol>
        </div>
    )
}
