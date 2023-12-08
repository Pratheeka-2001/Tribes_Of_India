import axios from "axios";
import { useEffect, useState } from "react"
import '../stylings/admin.css'

function TableList(props)
{
    const parentFun = props;

    const [tablesData, setTables] = useState([])

    function RetrieveTables()
    {
        try
        {
            axios.post("http://localhost:8080/tables")
            .then(response=>{
                setTables(response.data);
            })
        }
        catch
        {
            console.log("NO DATA"); 
        }
    }

    const handleTableClick = (e) =>{
        e.preventDefault();
        const btnV = e.target.value;
        // console.log(btnV);
        // console.log(btnV)
        parentFun.props([btnV]);
    }

    useEffect(()=>{
        RetrieveTables();
    },[]);

    return(
        <div className="table-list">
            <table id="list-table">
                <tr>
                    <th>S No.</th>
                    <th>Table Name</th>
                </tr>
                {
                    tablesData.map((item,index)=>(
                        <tr id="table-list-tr">
                            <td>{index}</td>
                            <td><button onClick={handleTableClick} className="tables-btn" value={item.Tables_in_tribes} id={item.Tables_in_tribes}>{item.Tables_in_tribes}</button></td>
                        </tr>
                    ))
                }
            </table>
        </div>
    );
}

export default TableList;