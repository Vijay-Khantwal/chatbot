import { useNavigate } from 'react-router-dom';


function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white text-primary shadow-md">
      <div className="max-w-7xl mx-auto flex h-20 justify-between items-center">
        <div className="p-0 flex items-center">
          <img className="w-15 aspect-square" src="./bg.png"></img>
          <a className='cursor-pointer' onClick={() => navigate('/about')}>
            <h1 className="text-2xl text-primary font-bold">Vigil AI</h1>
          </a>
        </div>
        <div>
          <h1 className="text-2xl font-bold p-2 rounded-2xl bg-amber-200">
            Vijay Khantwal | 12306478
          </h1>
        </div>
        <div>
          {/* Add your header details here */}
          <span className="text-sm font-bold">
            User: Guest | Date: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
