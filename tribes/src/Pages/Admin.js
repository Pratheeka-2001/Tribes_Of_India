import 'bootstrap/dist/css/bootstrap.min.css'; 
import AdminNav from "../Components/adminNav";
import '../stylings/admin.css'

function Admin(){
    return(
        <>
        <div className="main">
            <div className="left">
                <AdminNav/>
            </div>
            <div className="right">
                <h1>Main page of admin.</h1>
                <div className='nameless'>
                <div className='query-box'>
                    <h4>Query</h4>
                    <form>
                        <textarea cols='80' rows='2' placeholder='Enter your sql query here...'></textarea><br/><br/>
                        <input type='submit' value='Execute Query' id='query-exe'></input>
                    </form>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Admin;

