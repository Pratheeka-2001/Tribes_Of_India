import slide1 from '../images/slide1.jpg';
import slide2 from '../images/slide2.jpg';
import slide3 from '../images/slide3.jpg';
import slide4 from '../images/slide4.jpg';
import Carousel from 'react-bootstrap/Carousel';
import '../stylings/slide.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylings/slide.css';

// import ExampleCarouselImage from 'components/ExampleCarouselImage';

function Slides() {

    const imgstyle={
        height:"85vh",
        width:"100%",
        margin:"0px",
        backgroundSize:"cover",
        
    }
  return (
   
        <div className='slides'>
    <Carousel>
    <Carousel.Item interval={1500}>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <img style={imgstyle} src={slide4} alt=''/>
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>

      <Carousel.Item interval={1500}>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <img style={imgstyle} src={slide1} alt=''/>
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <img style={imgstyle} src={slide2} alt=''/>
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item interval ={1500}>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <img style={imgstyle} src={slide3} alt=''/>
        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
    </div>
    
  );
}

export default Slides;