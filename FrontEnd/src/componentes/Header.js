import React from "react";
import { Link } from "react-router-dom";

function Header(){
    return(
        <div>
        <nav class="bg-black w-full h-[50px] flex flex-row justify-center items-center">
            <div class="mr-5">
               <ul class="text-white flex flex-row font-light">
                   <li class="mr-4 hover:font-normal">
                       <Link to={"/"}>Problema</Link>
                   </li>
                   <li class="mr-4 hover:font-normal">
                       <Link to={"/solucion"}>Solucion</Link>
                   </li>
               </ul>

            </div>
        </nav>
   </div>
    )
}
export default Header;