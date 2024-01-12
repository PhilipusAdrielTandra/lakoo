import { useNavigate } from 'react-router-dom'; 

export default function Success() {
    const navigate = useNavigate();

    const handleReturn = () => {
      navigate('/form');
    };

    return (
      <>
        <div className="bg-cover bg-no-repeat bg-center h-screen" style={{backgroundImage: 'url("src/assets/images/background.jpeg")'}}>
        <div className="flex flex-col lg:flex-row items-center justify-center h-screen">
          <div className="mx-auto max-w-full lg:max-w-screen-xl rounded-3xl overflow-hidden bg-white" style={{width:'38%'}}>
            <div className="min-h-full px-6 py-12 lg:px-8">
              <div className=" " > 
{/* 
                <img
                  className="mx-auto h-50 w-auto"
                  src="src/assets/images/inreview.png"
                  alt="Thank you for choosing us image"
                /> */}
                <div className="animate-bounce mt-12">
                  <img
                    className="mx-auto mt-2 h-20 w-auto" style={{width:'20%', height:'20%'}}
                    src="src/assets/images/logo_circle.png"
                    alt="Lakoo Logo"
                  />
                </div>

                <h2 className="mt-10 text-center text-5xl font-bold leading-9 tracking-tight text-gray-900">
                  Your item is in review!
                </h2>
                <p className="mt-10 mx-auto mb-12 text-xl text-black text-center font-bold w-auto" style={{maxWidth:'80%'}}>We will process your submission within <a className='text-red-700 font-bold ' >3 business days</a>, please check your  <a className='text-red-700 font-bold ' >WhatsApp messages</a> regularly.</p>

                <div className="mt-5 flex justify-center mb-5">
                    <button
                      onClick={handleReturn}
                      className="flex w-60 mx-5 justify-center rounded-md bg-red-700 text-white  hover:bg-red-800  px-3 pt-3 pb-3 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      List Another Item
                    </button>
                    <button
                      onClick={handleReturn}
                      className="flex w-60 mx-5 justify-center rounded-md bg-red-700 text-white  hover:bg-red-800  px-3 pt-3 pb-3  text-xl font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Track Progress
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </>
    )
  }
  