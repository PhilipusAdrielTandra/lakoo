import shirt from '../assets/shirt.jpg'
import shoe from '../assets/shoe.jpg'
import jeans from '../assets/jeans.png'
function Landing() {
  return (
    <div className='h-full md:w-3/6 mx-auto my-8'>
      <h1 className="text-6xl font-hk text-center text-lakoo-red">lakoo</h1>
      <h2 className="text-3xl md:mr-24 font-medium text-center">What's it all about?</h2>
      <div className="flex md:mx-64 my-8 mx-9">
        <div className="w-2/3">
          <h1 className='font-hk text-2xl text-lakoo-red'>about us</h1>
          <p className='text-left'>lakoo is a community based social group dedicated to fashion specific thrifting in Indonesia</p>
        </div>
        <div className="w-1/3 my-auto">
          <img className='' src={shirt}></img>
        </div>
      </div>
      <div className="flex md:mx-64 my-8 mx-9">
      <div className="w-1/3 my-auto">
          <img className='' src={shoe}></img>
        </div>
        <div className="w-2/3">
          <h1 className='font-hk text-2xl text-right text-lakoo-red'>our vision</h1>
          <p className='text-right'>lakoo wants to not only create a platform, but a community of thrifters who love to purchase and represent fashion in a sustainable way</p>
        </div>
      </div>
      <div className="flex md:mx-64 my-8 mx-9">
        <div className="w-2/3">
          <h1 className='font-hk text-2xl text-lakoo-red'>how we work</h1>
          <p className=''>currently, lakoo operates through a whatsapp community. lakoo acts as a consignment where we take in secondhand fashion goods to brocast and sell to groupchat participants</p>
        </div>
        <div className="w-1/3 my-auto">
          <img className='' src={jeans}></img>
        </div>
      </div>
      <div className='mx-auto text-center'>
        <h1 className='font-bold my-4 text-lg'>click below</h1>
        <a href='https://chat.whatsapp.com/DcaQ1bjLOkY3kz2GrYgPVs'>
        <button className='bg-lakoo-red p-3 font-hk text-white rounded-2xl text-3xl'>join the movement</button>
        </a>
      </div>
    </div>
  );
}

export default Landing;
