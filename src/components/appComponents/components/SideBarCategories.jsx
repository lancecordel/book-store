import * as React from 'react';

const container = {
    display:'flex',
    flexDirection:'column',
    width:'20%',
    border:'1px solid silver',
    borderTopLeftRadius:'20px',
    borderBottomLeftRadius:'20px',
    fontFamily:'Arial, sans-serif',
    paddingBottom:'50px',
    minWidth:'130px',
    maxWidth:'170px'
    // boxShadow:'3px 3px rgba(200, 200, 200, .5)',

};
const categoriesHeader = {
    display:'flex',
    alignItems:'center',
    fontSize:'17px',
    // color:'#a01010',
    fontWeight:'600',
    padding:'15px 0px 10px 15px',
    borderBottom:'1px solid silver',
    
    // margin:'0px 15px 0px 15px',
    paddingTop:'20px'
};
const category = {
    display:'flex',
    alignItems:'center',
    fontSize:'12px',
    // fontWeight:'700,',
    // paddingLeft:'15px',
    borderBottom:'1px solid silver',
    margin:'0px 15px 0px 15px',
    paddingTop:'15px'
};


function SideBarCategories(props){
    
    return (
        <div style={container}>
            <div style={categoriesHeader}>Categories</div>
            <div style={category}>Engineering</div>
            <div style={category}>History</div>
            <div style={category}>DIY</div>
            <div style={category}>Fiction</div>
            <div style={category}>Non-Fiction</div>
            <div style={category}>Science</div>
            <div style={category}>Lifestyle</div>
            <div style={category}>Computing</div>

        </div>
    );
}
export default SideBarCategories;
