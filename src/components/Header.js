import { AiFillGithub } from "react-icons/ai";
import { TiInfoLarge } from "react-icons/ti";
import Link from 'next/link'

export default function Header() {
  return (
    <div className="md:flex md:items-center md:justify-between px-6 py-2 shadow-md">
      <Link href="/">
        <img src="./navLogo.png" className="ml-8" width={120} alt="" /></Link>
      <div className="flex justify-between gap-10 items-center mr-16">
        <Link href="https://github.com/VishalChoubey1019/Njack_Hack-It-Out-edgelamp"><AiFillGithub className="text-4xl" /></Link>
        <Link href="/guide"> <TiInfoLarge className="text-3xl cursor-pointer" /></Link>
      </div>
    </div>
  )
}
