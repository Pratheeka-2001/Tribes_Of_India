import 'bootstrap/dist/css/bootstrap.min.css'; 
import AdminNav from '../../Components/adminNav';
import '../../stylings/admin.css'
import { useEffect, useState } from 'react';
import TableList from '../../Components/tablesList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InsertData(){
        const navigate = useNavigate();
        const [btnValue, setBtnValue] = useState("")
        const [formFields, setFormFields] = useState([])
    // function propFun(m)
    // {
    //     setBtnValue(m);
    // }

    function btnValueChange()
    {
        if(btnValue !== "")
        {
            console.log(btnValue);
            const down = document.getElementById("downDiv");
            down.classList.add('downDiv-pop');
            try{
                axios.post("http://localhost:8080/form",btnValue)
                .then(response=>{
                    console.log("recieved")
                    console.log(response.data)
                    setFormFields(response.data)
                    console.log(formFields)
                })
            }
            catch{
                console.log("NO DATA");
            }
        }
    }

    const [InsertData, setInsertformdata] = useState({

    });

    function downDivClose()
    {
        const down = document.getElementById("downDiv");
        down.classList.remove('downDiv-pop')
        setBtnValue("");
        setInsertformdata({})
    }

    useEffect(()=>{
        btnValueChange();
    },[btnValue]);

    
      const handleFormChange = (e) =>{
        const {name,value} = e.target;
        setInsertformdata({
          ...InsertData,
          [name]:value,
        })
      }
    
      const handleInsertForm = (e) =>{
        e.preventDefault();
        const frm = document.getElementById('insertForm');
        console.log(InsertData)
        try{
          axios.post("http://localhost:8080/insert",{table:btnValue,data:InsertData})
          .then(response=>{
            alert("Record Inserted")
            frm.reset();
          });
        }
        catch
        {
          console.log("not sent");
        }

      }

    const [whereID, setWhereID] = useState("");
    const handleIDChange = (e) =>{
        const {name, value} = e.target;
        setWhereID(value);
    }

    const handleSearch = (e) =>
    {
        e.preventDefault();
        console.log(whereID);
        const frm5 = document.getElementById("where");
        axios.post("http://localhost:8080/where",{id:whereID, table:btnValue})
        .then(response=>{
            alert(response.data);
            frm5.reset();
        })
    }

    return(
        <>
        <div className="main">
            <div className="left">
                <AdminNav/>
            </div>
            <div className="right">
                <h1>Delete page of admin.</h1>
                <TableList props={setBtnValue}/>
                
            <div className='downDiv' id='downDiv'>
                <button onClick={downDivClose} id="close">
                    X
                </button>
                <h3>{btnValue} table</h3>
                <div className='searchForm'>
                    <h5>Which Record?</h5>
                    <form onSubmit={handleSearch} id='where'>
                        <input onChange={handleIDChange} type='text' placeholder='Unique ID' ></input>
                        <input id='dlt-btn' type='submit' value="Delete"></input>
                    </form>
                </div>

            </div>
            </div>
        </div>
        </>
    )
}

export default InsertData;