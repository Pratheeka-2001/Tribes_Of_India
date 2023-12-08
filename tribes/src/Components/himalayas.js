import axios from "axios";
import { useState, useEffect } from "react";
import '../stylings/tribes.css'

function Himalayas()
{
    const [himalayan, setHimalaya] = useState([]);

    const HimalayanData = async(e) =>{
        const id = {id:1};
        try
        {
            await axios.post("http://localhost:8080/tribedata", id)
            .then(response =>{
                setHimalaya(response.data)
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
        window.scrollTo(0, 0);
        HimalayanData();
    },[]);

    const[tribeID, setTribeID] = useState("");

    const[showData, setShowData] = useState([])

    const handleButtonClick = async(e) =>
    {
        let popData = document.getElementById("clickData");
        let closeBtn = document.getElementById("close-btn");
        popData.classList.add("open-tables");
        closeBtn.classList.add("open-tables");
        window.scrollTo(0, 0);
        setTribeID(e.target.value);
        console.log(tribeID);
        try
        {
            await axios.post("http://localhost:8080/tribeinfo",[tribeID])
            .then(response=>{
                console.log(response.data)
                setShowData(response.data)
                console.log(showData);
            })
        }
        catch
        {
            console.log("Not Sent");
        }
    }

    function closeData()
    {
        let popData = document.getElementById("clickData");
        let closeBtn = document.getElementById("close-btn");
        popData.classList.remove("open-tables");
        closeBtn.classList.remove("open-tables");        
    }

    return(
        <div className="tribe-main" id="himalaya">
        <center><h1>Himalayas</h1></center>
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
                    himalayan.map((item)=>(
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
                <div>
                    
                {showData.length > 0 && (
                <div className='retTable' style={{borderBottom:"1px solid white",borderTop:"1px solid white"}}>
                    {showData[0].map((item) => (
                    <div className='cards-after' key={item.practice_name}>
                        <h5>Practice Name: {item.practice_name}</h5>
                        <h5>Festival: {item.festival}</h5>                        
                    </div>
                    ))}
                    </div>)}
                        
                    {showData.length >  0 && (
                        <div>
                            {
                                showData[1].map((item)=>(
                                    <div>
                                        <h6>Tribe Name: {item.tribe_name}</h6>
                                        <h6>Literacy Rate: {item.literacy_rate}</h6>
                                    </div>
                                ))
                            }
                        </div>
                    )}

                </div>
            </div>
        </div>
        </div>
    )
}

export default Himalayas;