import { AiFillGithub } from "react-icons/ai";
import { TiInfoLarge } from "react-icons/ti";
import Link from 'next/link'
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useButtons } from "../context/CanvasContext";

export default function Header() {
  const contextValues = useButtons();

  return (
    <div className={`md:flex h-[10vh] md:items-center md:justify-between px-6 py-2 z-[1200] fixed w-[100%]`}>
      <Link href="/">
        <img src={contextValues.theme ? "./darkNavLogo.png" : "./lightNavLogo.png"} className="ml-8" width={120} alt="" /></Link>
      <div className="flex justify-between gap-10 items-center mr-16">
        <Link href="https://github.com/DivyaKumarBaid/DocType"><AiFillGithub className={`${!contextValues.theme ? "text-black" : "text-white"} text-4xl`} /></Link>
        {!contextValues.theme ? <MdDarkMode className="text-black text-4xl cursor-pointer" onClick={() => contextValues.setTheme(prev => !prev)} /> : <CiLight className={`text-white text-4xl cursor-pointer`} onClick={() => contextValues.setTheme(prev => !prev)} />}
        <Link href="/guide"> <TiInfoLarge className={`text-3xl cursor-pointer ${contextValues.theme ? "text-black bg-white" : "text-white bg-black"} rounded-[50%]`} /></Link>
      </div>

    </div>
  )
}
