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
            setInsertformdata({});
          });
        }
        catch
        {
          console.log("not sent");
        }

      }


    return(
        <>
        <div className="main">
            <div className="left">
                <AdminNav/>
            </div>
            <div className="right">
                <h1>Insert page of admin.</h1>
                <TableList props={setBtnValue}/>
                
            <div className='downDiv' id='downDiv'>
                <button onClick={downDivClose} id="close">
                    X
                </button>
                <h3>{btnValue} table</h3>
                <div className='downDivForm' id='downDivForm'>
                    <form id='insertForm' onSubmit={handleInsertForm}>
                        {
                            formFields.map((item)=>(
                                <div>
                                    <label htmlFor={item.Field}>{item.Field+" :"}</label>
                                    <input onChange={handleFormChange} name={item.Field} style={{margin:"5px"}} type='text' placeholder={"Enter "+item.Field} required></input>
                                </div>
                            ))
                        }
                        <input id='btn-btn' type='submit' value="Insert Data"></input>
                    </form>
                </div>

            </div>
            </div>
        </div>
        </>
    )
}

export default InsertData;