import '../stylings/admin.css';
import {Link} from "react-router-dom";

function AdminNav()
{
    return(
        <div className="side-nav">
        <div>
            <Link to="/admin" style={{textDecoration:"none"}}>
            <h1>
                Hello <span>Admin!</span>
            </h1>
            </Link>
        </div>
        <ul>
            <Link to="/admin/insert/" style={{textDecoration:"none", color:"white"}}><li>Insert data</li></Link>
            <Link to="/admin/update" style={{textDecoration:"none", color:"white"}}><li>Update data</li></Link>
            <Link to="/admin/delete" style={{textDecoration:"none", color:"white"}}><li>Delete data</li></Link>
        </ul>
        <div className='btns-div'>
            <ul>
                <Link to="/"><li>Logout</li></Link>
                <Link to="/"><li>View Page</li></Link>
            </ul>
        </div>
    </div>
    )
}

export default AdminNav;