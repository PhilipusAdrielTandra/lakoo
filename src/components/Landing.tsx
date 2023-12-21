import shirt from '../assets/images/shirt.jpg';
import shoe from '../assets/images/shoe.jpg';
import jeans from '../assets/images/jeans.png';
import Carousel from './Carousel';

function Landing() {
  let slides = [
    "src/assets/images/carousel.png",
    "src/assets/images/carousel.png",
    "src/assets/images/carousel.png",
  ]
  return (
    <div className="mx-56 mt-14">
      <div className="flex justify-between items-center">
        {/* Left Column */}
        <div className="flex items-center">
          <a href="#" className="font-hk font-semibold">MEN</a>
          <a href="#" className="font-hk font-semibold ml-3">WOMEN</a>
          <a href="#" className="font-hk font-semibold ml-3">UNISEX</a>
        </div>

        {/* Middle Column */}
        <div className="text-center flex items-center">
          <h1 className='text-center font-black font-hk text-lakoo-red text-6xl'>lakoo</h1>
        </div>

        {/* Right Column */}
        <div className="flex items-center">
          <a href="#" className="font-hk mr-3">Search</a>
          <a href="#" className="font-hk">Cart</a>
        </div>
      </div>

      {/* Carousel in the middle */}
      <div className="text-center my-12">
        <Carousel slides={slides}/>
      </div>

      <h1 className='text-center '>SHOP OUR LATEST DROP</h1>
    </div>
  );
}

export default Landing;
