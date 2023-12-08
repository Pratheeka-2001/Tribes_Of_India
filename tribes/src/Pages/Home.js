import { NavLink } from "react-router-dom";
import NavbarComp from "../Components/Navbar";
import Slides from "../Components/Slides";
import '../stylings/Home.css';
import Footer from "../Components/Footer";
import c1 from '../images/cards/himalaya.jpg'
import c2 from '../images/cards/north.jpg'
import c3 from '../images/cards/south.jpg'
import c4 from '../images/cards/west.jpg'
import c5 from '../images/cards/east.jpg'
import c6 from '../images/cards/central.jpg'

function Home()
{
    return(
        <>
            <NavbarComp/>
            <Slides/>
            <div className="mainContent" id="mainContent">
                <div className="Category">
                    <div className="cards">
                        <NavLink to="/data/himalayas">
                        <img src={c1}></img>
                        <div className="title">
                            <h4>The Himalayas</h4>
                        </div>
                        </NavLink>
                    </div>
                    <div className="cards">
                        <NavLink to="/data/north">
                        <img src={c2}></img>
                        <div className="title">
                            <h4>Northern India</h4>
                        </div>
                        </NavLink>
                    </div>
                    <div className="cards">
                        <NavLink to="/data/east">
                        <img src={c5}></img>
                        <div className="title">
                            <h4>Eastern India</h4>
                        </div>
                        </NavLink>
                    </div>
                    <div className="cards">
                        <NavLink to="/first">
                        <img src={c6}></img>
                        <div className="title">
                            <h4>Central India</h4>
                        </div>
                        </NavLink>  
                    </div>
                    <div className="cards">
                        <NavLink to="/first">
                        <img src={c4}></img>
                        <div className="title">
                            <h4>Western India</h4>
                        </div>
                        </NavLink>
                    </div>
                    <div className="cards">
                        <NavLink to="/first">
                        <img src={c3}></img>
                        <div className="title">
                            <h4>Southern India</h4>
                        </div>
                        </NavLink>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}

export default Home;