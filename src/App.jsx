import {Routes,Route} from 'react-router-dom';
import Login from './pages/Login.jsx';
import AdminDash from './pages/AdminDash.jsx';
import {ToastContainer} from 'react-toastify';
export const backendURL = import.meta.env.VITE_BACKEND_URL;


function App() {

  


  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[7vw]">
      <ToastContainer />
      
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/admin-dashboard" element={<AdminDash/>} />
      </Routes>
    </div>
  );
}

export default App;
