import { Link } from "react-router"

export const XpensoLogo = ()=>{
    return(
        <Link to="/">
          <div className="flex items-center">
            <img className="w-13" src="https://i.ibb.co.com/hxm4mvxP/Chat-GPT-Image-Aug-16-2025-02-37-12-PM.png" alt="" />
          <h1 className="text-2xl font-semibold mb-2">Xpenso</h1>
          </div>
        </Link>
    )
}