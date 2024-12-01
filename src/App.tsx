import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./pages/login/Login"
import Dashboard from "./pages/dashboard/Dashboard"
import index from "./pages/device/index";
import DeviceList from './pages/device/index';

// function App() {
//   const [isLogin, setIsLogin] = useState(false);
//   const receivelogin = (isLogin: boolean) => {
//     setIsLogin(isLogin);
//   }
//   return (
//     <div className="App">
//       {!isLogin ? <Login handleSuccess={receivelogin} /> : <Dashboard />}

//     </div>
//   );
// }

function App() {

  return (

    <DeviceList />
  );
}

export default App;
