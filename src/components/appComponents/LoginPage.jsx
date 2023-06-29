import * as React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';

const container = {
  display:'flex',
  flexDirection:'column',
  justifyContent:'space-between',
  alignItems:'center',
  // border:'1px solid',
  width:'100%',
  position:'absolute',
  top:'0px',
  left:'0px',
  height:'98vh',
  minWidth:'700px',
};

function LoginPage() {
  return (
    <div style={container}>
      {/* <Navbar/> */}
      <Navbar/>
      <Login/>
      <Footer/>
    </div>
  );
}

export default LoginPage;
