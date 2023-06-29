import * as React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Orders from './components/Orders';

const container = {
  // border:'1px solid',
  width:'100%',
  position:'absolute',
  top:'0px',
  left:'0px',
  height:'95vh',
  minWidth:'700px',
}

function SearchPage() {
  return (
    <div style={container}>
      <Navbar/>
      <Orders/>
      <Footer/>
    </div>
  );
}

export default SearchPage;
