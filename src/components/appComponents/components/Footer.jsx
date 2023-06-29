import * as React from 'react';
import '../../../css/Footer.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const container = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    // border:'1px solid green',
    height:'14%',
};
const textContainer = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    width:'50%',
    // border:'1px solid green',
    height:'100%',
};
const topRow = {
    display:'flex',
    justifyContent:'center',
    textAlign:'center',
    color:'#2c844f',
    fontWeight:'600',
};

function Footer(props){
    
    return (
        <div  style={container}>
            <div style={textContainer}>
                <div style={topRow}>Lorus enum plorus edabut snolfner snarl zupm apneoid bloid clarl ducfs</div>
                <div className='bottomRow' >
                © 2023 Lonas Books. All rights reserved. Lonas Name and the Lonas Company Logo are trademarks of Lonas.
                </div>
            </div>
        </div>
    );
}
export default Footer;