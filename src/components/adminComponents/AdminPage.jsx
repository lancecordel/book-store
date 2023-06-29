import * as React from 'react';
import Navbar from '../appComponents/components/Navbar';
import Footer from '../appComponents/components/Footer';
import FileUpload from './components/FileUpload';
import AdminNav from './components/AdminNav';

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

function AdminPage() {
  return (
    <div style={container}>
      <AdminNav/>
      <FileUpload/>
      <Footer/>
    </div>
  );
}

export default AdminPage;
