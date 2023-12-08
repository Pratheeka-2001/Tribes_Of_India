import axios from "axios";
import { useState, useEffect } from "react";
import '../stylings/tribes.css'

function Eastern()
{
    const [eastern, setEastern] = useState([]);

    const EasternData = (e) =>{
        const id = {id:3};
        try
        {
            axios.post("http://localhost:8080/tribedata", id)
            .then(response =>{
                setEastern(response.data)
            })
            console.log("sent")
        }
        catch
        {
            console.log("Not sent");
        }
    }

    useEffect(() => {
        // Call your function here when the component mounts
        EasternData();
    },[]);

    const[tribeID, setTribeID] = useState("");

    function handleButtonClick(e)
    {
        let popData = document.getElementById("clickData");
        let closeBtn = document.getElementById("close-btn");
        popData.classList.add("open-tables");
        closeBtn.classList.add("open-tables");
        setTribeID(e.target.value);
        console.log(tribeID);
    }

    function closeData()
    {
        let popData = document.getElementById("clickData");
        let closeBtn = document.getElementById("close-btn");
        popData.classList.remove("open-tables");
        closeBtn.classList.remove("open-tables");        
    }

    return(
        <div className="tribe-main" id="east">
        <center><h1>Eastern Tribes</h1></center>
        <div className="tribeComp">
            <table className="tribes">
                <tr id="tribesHead">
                    <th>ID</th>
                    <th>Name [Click on names for more info]</th>
                    <th>Region</th>
                    <th>Language</th>
                    <th>Population</th>
                </tr>
                {
                    eastern.map((item)=>(
                        <tr id="tribeDatas">
                            <td>{item.tribe_id}</td>
                            <td id="tribeName"><button type="submit" value={item.tribe_id} onClick={handleButtonClick}>{item.tribe_name}</button></td>
                            <td>{item.region}</td>
                            <td>{item.tribe_language}</td>
                            <td>{item.population}</td>
                        </tr>
                    ))
                }
            </table>
        </div>

        <div className="clickData" id="clickData">
            <div className="tables">
                <div className="close-btn" id="close-btn" onClick={closeData}>
                        X
                </div>
                <h1>Tables</h1>
            </div>
        </div>
        </div>
    )
}

export default Eastern;