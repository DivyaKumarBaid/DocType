import React from 'react'
import { CgFormatText } from 'react-icons/cg'
import { TbBookDownload } from 'react-icons/tb'
import { BiImageAdd } from 'react-icons/bi'
import { BsBorderWidth, BsCircle, BsSquare } from 'react-icons/bs'
import { AiOutlineClear, AiOutlineDelete, AiOutlineHighlight } from 'react-icons/ai'
import { HiPencil } from 'react-icons/hi'
import { TfiNotepad } from 'react-icons/tfi'
import { FiSave } from 'react-icons/fi'
import { useButtons } from '../context/CanvasContext';
import { Popover, Slider } from '@mui/material'
import Tooltip from '@mui/material/Tooltip';
import { SketchPicker } from 'react-color'
import ExportPopup from './ExportPopup'

export default function SideBar() {

    const contextValues = useButtons();
    const [openColor, setOpenColor] = React.useState(false);
    const [openBorderColor, setOpenBorderColor] = React.useState(false);
    const [openStroke, setOpenStroke] = React.useState(false);
    const [openExporter, setOpenExporter] = React.useState(false);

    return (
        <div className="fixed z-50 top-[85%] md:top-0 left-0 md:h-[100vh] md:w-max h-[15vh] w-[100vw] flex md:flex-col flex-row items-center justify-center md:mx-16">
            <div className={`"md:mx-10 border max-h-[65vh] flex md:flex-col flex-wrap flex-row items-center justify-center shadow-lg rounded-lg md:py-8 py-2 px-4 md:text-[1.5rem] text-[1.2rem] min-w-[8vw] gap-8 ${contextValues.theme ? "border-[rgba(36,36,36,0.5)] bg-[rgb(25,25,25)] text-white shadow-[0px_0px_8px_rgb(0,0,0)]" : "bg-white text-black"}`}>

                <ExportPopup className="text-[1.5rem] cursor-pointer" open={openExporter} setOpen={setOpenExporter} />

                <Tooltip title="Sticky Notes">
                    <div>
                        <TfiNotepad className={`cursor-pointer text-[1.6rem]`} onClick={() => contextValues.addNote(contextValues.canvas)} />
                    </div>
                </Tooltip>

                <Tooltip title="Square">
                    <div>
                        <BsSquare className='cursor-pointer text-[1.3rem]' onClick={() => contextValues.addRect(contextValues.canvas)} />
                    </div>
                </Tooltip>

                <Tooltip title="Circle">
                    <div>
                        <BsCircle className='cursor-pointer' onClick={() => contextValues.addCircle(contextValues.canvas)} />
                    </div>
                </Tooltip>

                <Tooltip title="TextBox">
                    <div>
                        <CgFormatText className='md:text-[1.8rem] text-[1.5rem] cursor-pointer' onClick={() => contextValues.addText(contextValues.canvas)} />
                    </div>
                </Tooltip>

                <Tooltip title="Add Image">
                    <div>
                        <label htmlFor="img-input">
                            <BiImageAdd className='md:text-[1.8rem] text-[1.5rem] cursor-pointer' />
                        </label>
                        <input type="file" id="img-input" accept='image/*' style={{ display: "none" }} onChange={(e) => contextValues.addImage(e, contextValues.canvas)} />
                    </div>
                </Tooltip>

                <Tooltip title="Draw">
                    <div>
                        <HiPencil className='md:text-[1.8rem] text-[1.5rem] cursor-pointer' onClick={() => contextValues.toggleDraw(contextValues.canvas)} />
                    </div>
                </Tooltip>

                <Tooltip title="Highlight">
                    <div>
                        <AiOutlineHighlight className='md:text-[1.8rem] text-[1.5rem] cursor-pointer' onClick={() => contextValues.addHighlight(contextValues.canvas)} />
                    </div>
                </Tooltip>

                <Tooltip title="Delete Selected">
                    <div>
                        <AiOutlineDelete className='md:text-[1.8rem] text-[1.5rem] cursor-pointer' onClick={() => contextValues.deleteBtn()} />
                    </div>
                </Tooltip>

                <Tooltip title="Reset Page">
                    <div>
                        <AiOutlineClear className='md:text-[1.8rem] text-[1.5rem] cursor-pointer' onClick={() => contextValues.canvas.clear()} />
                    </div>
                </Tooltip>

                <Tooltip title="Download Current Page">
                    <div>
                        <TbBookDownload className="md:text-[1.8rem] text-[1.5rem] cursor-pointer" onClick={() => contextValues.downloadPage()} />
                    </div>
                </Tooltip>

                <Tooltip title="Download Whole PDF">
                    <div>
                        <FiSave className='md:text-[1.8rem] text-[1.5rem] cursor-pointer' onClick={() => {
                            contextValues.edits[contextValues.currPage] = contextValues.canvas.toObject();
                            setOpenExporter(true);
                        }} />
                    </div>
                </Tooltip>

                <Tooltip title="Border Color">
                    <div className="md:w-[1.6rem] md:h-[1.6rem] w-[1.3rem] h-[1.3rem] rounded cursor-pointer" style={{ border: `4px dotted ${contextValues.borderColor}` }} onClick={(e) => setOpenBorderColor(e.currentTarget)}></div>
                </Tooltip>
                <Popover
                    id="simple-popover"
                    open={Boolean(openBorderColor)}
                    anchorEl={openBorderColor}
                    onClose={() => setOpenBorderColor(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <SketchPicker
                        color={contextValues.borderColor}
                        onChangeComplete={col => contextValues.setBorderColor(col.hex)}
                    />
                </Popover>

                <Tooltip title="Fill Color Picker">
                    <div className="md:w-[1.6rem] md:h-[1.6rem] w-[1.3rem] h-[1.3rem] rounded-[50%] cursor-pointer" style={{ background: contextValues.color }} onClick={(e) => setOpenColor(e.currentTarget)}></div>
                </Tooltip>
                <Popover
                    id="simple-popover"
                    open={Boolean(openColor)}
                    anchorEl={openColor}
                    onClose={() => setOpenColor(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <SketchPicker

                        color={contextValues.color}
                        onChangeComplete={col => contextValues.setColor(col.hex)}
                    />
                </Popover>

                <Tooltip title="Stroke Width">
                    <div className='cursor-pointer'>
                        <BsBorderWidth onClick={(e) => setOpenStroke(e.currentTarget)} />
                    </div>
                </Tooltip>
                <Popover
                    id="simple-popover"
                    open={Boolean(openStroke)}
                    anchorEl={openStroke}
                    onClose={() => setOpenStroke(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}

                >
                    <div className={`min-w-[20vw] min-h-[8vh] flex flex-col items-start justify-center p-8 gap-2 ${contextValues.theme && "bg-[rgba(26,26,26)] text-white"}`}>
                        <div>Stoke Width</div>
                        <Slider
                            aria-label="Small steps"
                            value={contextValues.strokeWidth}
                            step={1}
                            min={0}
                            max={10}
                            onChange={(e) => contextValues.setStrokeWidth(e.target.value)}
                            valueLabelDisplay="auto"
                        />
                    </div>
                </Popover>

            </div>
        </div >
    )
}
