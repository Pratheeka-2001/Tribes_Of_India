import 'bootstrap/dist/css/bootstrap.min.css'; 
import AdminNav from '../../Components/adminNav';
import '../../stylings/admin.css'
import { useEffect, useState } from 'react';
import TableList from '../../Components/tablesList';
import axios from 'axios';

function InsertData(){
        const [btnValue, setBtnValue] = useState("")
        const [formFields, setFormFields] = useState([])

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

    const [UpdateData, setUpdateformdata] = useState({

    });

    function downDivClose()
    {
        const down = document.getElementById("downDiv");
        down.classList.remove('downDiv-pop')
        setBtnValue("");
        setUpdateformdata({});
    }

    useEffect(()=>{
        btnValueChange();
    },[btnValue]);

    
      const handleFormChange = (e) =>{
        const {name,value} = e.target;
        console.log(name, value)
        setUpdateformdata({
          ...UpdateData,
          [name]:value,
        })
      }


      
      const handleInsertForm = (e) =>{
        console.log(UpdateData)
        e.preventDefault();
        const frm = document.getElementById('updateForm');
        console.log(UpdateData)
        try{
          axios.post("http://localhost:8080/update",{table:btnValue,data:UpdateData})
          .then(response=>{
            alert(response.data);
            frm.reset();
            setUpdateformdata({});
          });
        }
        catch
        {
          console.log("not sent");
        }

      }


      //id
    //   const [whereID, setWhereID] = useState("");
    //   const [searchedData, setSearchedData] = useState([])
    //   const dic = searchedData[0];
    //   console.log("search",searchedData)
    //   const handleSearch = (e) =>
    //   {
    //     e.preventDefault();
    //     axios.post("http://localhost:8080/where",{id:whereID, table:btnValue})
    //     .then(response=>{
    //         const colsName = response.data.keys;
    //         const actualData = response.data.datas;
    //         setSearchedData(actualData)
            
    //     })
    //   }

    //   const handleIDChange = (e) =>{
    //     const {name, value} = e.target;
    //     setWhereID(value);
    //   }

    //   const RenderForm = ()=>{
        
    //     return(
    //         <>

    //         </>
    //     )
    //   }

    //   useEffect(()=>{
    //     RenderForm();
    //   },searchedData);

    return(
        <>
        <div className="main">
            <div className="left">
                <AdminNav/>
            </div>
            <div className="right">
                <h1>Update page of admin.</h1>
                <TableList props={setBtnValue}/>
                
            <div className='downDiv' id='downDiv'>
                <button onClick={downDivClose} id="close">
                    X
                </button>
                <h3>{btnValue} table</h3>

                {/* <div>
                    <form id='' onSubmit={handleSearch}>
                        Where?:
                        <input onChange={handleIDChange} name='uniqueID' placeholder=' Unique id of table'></input>
                        <input type='submit' value="submit"></input>
                    </form>
                    <div>
                    {
                        searchedData?(
                        Object.values(dic).map((item, index)=>{
                            
                            console.log({item})
                        })):"hello"
                    }
                    <p>After</p>
                    </div>
                </div> */}
                <div className='downDivForm' id='downDivForm'>
                    <form id='updateForm' onSubmit={handleInsertForm}>
                        {
                            formFields.map((item, index)=>(
                                <div>
                                    <label htmlFor={item.Field}>{item.Field+" :"}</label>
                                    <input onChange={handleFormChange} id={index} name={item.Field} style={{margin:"5px"}} type='text' placeholder={"Enter "+item.Field} {...(index === 0 ? { required: 'required' } : {})}></input>
                                    
                                </div>
                                
                            ))  
                            
                        }
                        <input id='btn-btn' type='submit' value="Update Data"></input>
                    </form>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default InsertData;