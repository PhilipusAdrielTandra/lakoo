function Landing() {
  return (
    <div className='overflow-hidden h-screen mx-auto flex justify-center items-center bg-white flex-col text-lakoo-red'>
      <div className="flex items-center">
        <h1 className='font-hk text-6xl md:text-9xl'>lakoo</h1>
        <p className='font-hk text-base md:text-xl ml-4'>JOIN THE MOVEMENT <br/><a className='underline' href="https://chat.whatsapp.com/DcaQ1bjLOkY3kz2GrYgPVs">CLICK ME</a></p>
      </div>
      <p className="text-center text-xs md:text-base">Join the group and message the admins for more information</p>
      <br className="hidden md:block"/>
      <p className='mt-1 font-hk text-sm md:text-base'>STAY TUNED FOR THE OFFICAL LAUNCH</p>
    </div>
  );
}

export default Landing;
