import * as React from 'react';
import '../../../css/SplashImage.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const container = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    // borderTop:'2px solid black',
    // borderBottom:'2px solid black',
    height:'40%',
    fontFamily:'Arial, sans-serif',
    backgroundColor:'#728991'
};
const text = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    width:'30%',
    minWidth:'410px',
    fontSize:'20px',
    // border:'1px solid green',
    fontWeight:'400',
    lineHeight:'1.5',
    color:'white',
    height:'70%',
    minHeight:'210px'
};
const arrowBackgroundStyle = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#f90505',
    width:'40px',
    height:'40px',
    borderRadius:'50px',
    // border:'2px solid',
}
const splashTextTop = {
    textDecoration:'underline',
    fontWeight:'600',
    fontSize:'20px'
    // textDecoration:'underline'
}

function SplashImage(props){
    
    return (
        <div className='container' style={container}>
            <div className='transparencyLayer'>
                <div style={text}>
                    <div style={splashTextTop}>
                        Discover a world       
                    </div>
                    <div style={splashTextTop}>
                        of literary wonders today    
                    </div>
                    <div style={{padding:'20px'}}>
                        <div className='splashTextBottom'>
                            Great deals on    
                        </div>
                        <div className='splashTextBottom'>
                            Science Fiction, History, and more    
                        </div>
                    </div>
                    <div style={arrowBackgroundStyle}>
                        <div className='downward-arrow'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SplashImage;