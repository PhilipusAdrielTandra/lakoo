import shirt from '../assets/images/shirt.jpg';
import shoe from '../assets/images/shoe.jpg';
import jeans from '../assets/images/jeans.png';

function Landing() {
  return (
    <nav className="mx-56 mt-14">
      <div className="flex justify-between items-center">
        <div className="float-left flex items-center">
          <a href="#" className="font-hk font-semibold">MEN</a>
          <a href="#" className="font-hk font-semibold ml-3">WOMEN</a>
          <a href="#" className="font-hk font-semibold ml-3">UNISEX</a>
        </div>

        <div className="text-center flex items-center">
          <h1 className='text-center font-black font-hk text-lakoo-red text-6xl'>lakoo</h1>
        </div>

        <div className="float-right flex items-center ">
          <a href="#" className="font-hk mr-3">Search</a>
          <a href="#" className="font-hk">Cart</a>
        </div>
      </div>
    </nav>
  );
}

export default Landing;
