import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../stylings/nav.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBarComp() {
  const navigate = useNavigate();

  
  // let pop1 = document.getElementById("login1");
  // let pop2 = document.getElementById("login2");
  // let close1 = document.getElementById("close");

  const [formData, setformdata] = useState({
    email:"",
    password:""
  });

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setformdata({
      ...formData,
      [name]:value,
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(formData)
    try{
      axios.post("http://localhost:8080/admin",formData)
      .then(response=>{
        console.log(response.data)
        if(response.data === "Sucess")
        {
          navigate("/admin");
        }
        else{
          alert("Wrong credentials");
        }
      });
    }
    catch
    {
      console.log("not sent");
    }
  }

  var pop = "";
  var close2 = "";
  function openPop()
  {
    pop = document.getElementById("login");
    close2 = document.getElementById("close2");
    pop.classList.add("open-pop");
    close2.classList.add("open-pop");
  }
  function closePop(){
    pop = document.getElementById("login");
    close2 = document.getElementById("close2");
    pop.classList.remove("open-pop");
    close2.classList.remove("open-pop");
  }
  return (
    <>
    <Navbar  collapseOnSelect expand="lg" className="nav-height just-media"   data-bs-theme="dark"  style={{height:"max-content", background:"#040D12",padding:"30px 20px" }}>
      <Container>
        <Navbar.Brand href="/" className='heading' style={{fontWeight:"bold", fontSize:"28px",paddingRight:"12px", borderRight:"1px solid white"}}>Tribal Data Of India</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className='btns'>Home</Nav.Link>
            <Nav.Link href="/#mainContent" className='btns'>Data</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {/* <Nav>
            <Nav.Link href="/admin"></Nav.Link>
          </Nav> */}
          <button style={{background:"none", padding:"10px", border:"1px", color:"gray"}} onClick={openPop}>Admin</button>
        </Navbar.Collapse>
      </Container>
    </Navbar>


    <div className="login-pop" id="login">

        <div className='login-form' id='login1'>
          <div>
            <button className='close' id='close2' onClick={closePop}>X</button>
          </div>
         
         <div style={{textAlign:"center",marginTop:"5px"  }} id='login2'>
         <h4>Admin-Login</h4><hr/>
         <div id='close1'>
         <form onSubmit={handleSubmit}>
            <input onChange={handleChange} name='email' type='text' placeholder='Enter email'></input><br/>
            <input onChange={handleChange} name='password' type='password' placeholder='Enter password'></input><br/>
            <input type='submit' value="login"></input>
          </form>
         </div>
         </div>
        </div>
    </div>
    </>
  );
}

export default NavBarComp;