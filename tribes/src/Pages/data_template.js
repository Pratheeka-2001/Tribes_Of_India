import NavBarComp from "../Components/Navbar"
import { Outlet } from "react-router-dom";


function DataTemplate()
{
    return(
        <>
        <NavBarComp/>
        <Outlet/>
        </>
    )
}

export default DataTemplate;