import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex h-20 justify-between items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-12 aspect-square rounded-full shadow-md bg-chatBg">

          <img  src="./bg.png" alt="Logo" />
          </div>
          <a className="cursor-pointer" onClick={() => navigate('/about')}>
            <h1 className="text-3xl font-bold tracking-tight hover:text-blue-200 transition-colors duration-200">Vigil AI</h1>
          </a>
        </div>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full shadow-md">
          <h1 className="text-xl font-semibold">Vijay Khantwal | 12306478</h1>
        </div>
        <div className="text-sm font-medium text-blue-100">
          <span>User: Guest | Date: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;