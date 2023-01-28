import { AiFillGithub } from "react-icons/ai";
import { TiInfoLarge } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="md:flex md:items-center md:justify-between px-6 py-4 shadow-md">
      <a href="/">
        <img src="./navLogo.png" className="ml-8" width={140} alt="" /></a>
      <div className="flex justify-between gap-10 items-center mr-16">
        <a href="https://github.com/VishalChoubey1019/Njack_Hack-It-Out-edgelamp"><AiFillGithub className="text-4xl" /></a>
        <a href="/guide"> <TiInfoLarge className="text-3xl cursor-pointer" /></a>
      </div>
    </div>
  )
}
