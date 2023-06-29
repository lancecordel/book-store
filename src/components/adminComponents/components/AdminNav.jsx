import * as React from 'react';

const container = {
    display:'flex',
    justifyContent:'space-between',
    width:'100%',
    border:'1px solid silver',
    backgroundColor:'#ebefe9',
    height:'35px',
    fontFamily:'Arial, sans-serif',
};
const logoContainer = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'15%',
    fontSize:'20px',
    // border:'1px solid',
    fontWeight:'900',
    color:'#2c844f',
};
const loginContainer = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'10%',
    color:'#2c844f',
    fontWeight:'600',
    // border:'1px solid'
};

function AdminNav(props){
    
    return (
        <div style={container}>
            <div style={logoContainer}>Lonas</div>
            <div style={loginContainer}>admin</div>
        </div>
    );
}
export default AdminNav;
