import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Login from './Login';
import SetPasswordPage from './SetPasswordPage';

const App = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate('/login');
  };

  return (
    <>
      <div className='dark'>
        <h1 className='text-3xl font-bold underline'>UI Service</h1>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <button onClick={goToLoginPage} className="login-btn">
          Go to Login
        </button> {/* Button to redirect to the login page */}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <div className='dark bg-background p-3 flex flex-wrap gap-3 justify-center'>
        <div className='badge bg-politics-color/10 text-politics-color ring-politics-color'>Politics</div>
        <div className='badge bg-business-color/10 text-business-color ring-business-color'>Business</div>
        <div className='badge bg-technology-color/10 text-technology-color ring-technology-color'>Technology</div>
        <div className='badge bg-health-color/10 text-health-color ring-health-color'>Health</div>
        <div className='badge bg-science-color/10 text-science-color ring-science-color'>Science</div>
        <div className='badge bg-entertainment-color/10 text-entertainment-color ring-entertainment-color'>Entertainment</div>
        <div className='badge bg-sports-color/10 text-sports-color ring-sports-color'>Sports</div>
        <div className='badge bg-world-color/10 text-world-color ring-world'>World</div>
        <div className='badge bg-opinion-color/10 text-opinion-color ring-opinion-color'>Opinion</div>
      </div>

      {/* Define the routes here */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/set-password' element={<SetPasswordPage />} />
      </Routes>
    </>
  );
}

export default App;
