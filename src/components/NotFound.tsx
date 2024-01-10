import { useNavigate } from 'react-router-dom';
import lakooSad from "../assets/images/lakoosad.png";

function NotFound() {
  
  return (
    <div className="bg-cover bg-no-repeat bg-center h-screen" style={{backgroundImage: 'url("src/assets/images/background.jpeg")'}}>
      <div className="text-center">
      <h1 className="mb-12 pt-40 text-6xl font-semibold text-red-700" style={{ textShadow: '5px 5px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black' }}>
        404
      </h1>
        <p className="mb-8 text-lg text-white font-bold">Oops! Looks like you're lost.</p>
        <div className="animate-bounce">
        <img
                  className="mx-auto h-20 w-auto"
                  src="src/assets/images/lakoosad.png"
                  alt="Lakoo Logo"
                />
        </div>
        <p className="mt-8 text-white font-semibold text-xl">Let's get you back <a href="/" className="text-yellow-300 hover:text-yellow-500 hover:underline font-bold text-xl">home</a>.</p>
      </div>
    </div>

  );
}

export default NotFound;
