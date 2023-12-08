// import '../stylings/nav.css'
import '../stylings/footer.css';
import cpr from '../images/logos/copyright-svgrepo-com.svg';
import fb from '../images/logos/facebook-svgrepo-com (1).svg';
import ig from '../images/logos/social-instagram-svgrepo-com.svg';
import tw from '../images/logos/social-twitter-svgrepo-com.svg'

function Footer()
{
    return(
        <div className="foot">
            <footer id="foot-id">
            <div id="socials">
                <h6>SOCIALS</h6>
                <ul class="soc-list">
                <li><img src={fb} alt=""/></li>
                <li><img src={ig} alt="Instagram"/></li>
                <li><img src={tw} alt="Twitter"/></li>
                </ul>
            </div>
            <div class="terms">
                Terms of use - Privacy Policy
            </div>
            <div id="copy">
                <img id="cp" src={cpr} alt="@"/>
                2023 - @pratheeka_mu
            </div>
            </footer>
        </div>
    )
}

export default Footer;