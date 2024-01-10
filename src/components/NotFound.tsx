import { useNavigate } from 'react-router-dom';
import lakooSad from "../assets/images/lakoosad.png";

function NotFound() {
  
  return (
    <div className="bg-cover bg-no-repeat bg-center h-screen" style={{backgroundImage: 'url("src/assets/images/background.jpeg")'}}>
      <div className="text-center">
        <h1 className="mb-12 pt-40 text-6xl font-semibold text-red-700 font-size-m">404</h1>
        <p className="mb-8 text-lg text-white">Oops! Looks like you're lost.</p>
        <div className="animate-bounce">
          <svg className="mx-auto h-16 w-16 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </div>
        <p className="mt-8 text-white">Let's get you back <a href="/home" className="text-red-700">home</a>.</p>
      </div>
    </div>

  );
}

export default NotFound;
