import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { loading, notLoading } from '../../../store/loadingSlice';

const Container = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'start',
    alignItems:'center',
    height:'70%',
    width:'80%',
    // border:'1px solid',

};

const phoneContainer = {
    display:'flex',
    justifyContent:'space-between',
    width:'80%',
};

const submitContainer = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'80%',
    marginTop:'15px',
    // border:'1px solid',
};

const nameContainer = {
    display:'flex',
    justifyContent:'space-between',
    width:'80%',
};
const addressContainer = {
    display:'flex',
    justifyContent:'space-between',
    width:'80%',
};
const userNameContainer = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    width:'80%',
};

const cityStateZipContainer = {
    display:'flex',
    justifyContent:'space-between',
    width:'80%',
};

const passwordStyle = {
    fontSize:'12px', 
    textAlign:'center', 
    width:'45%',
};
const areaCodeStyle = {
    fontSize:'12px', 
    textAlign:'center', 
    width:'22%',
};
const phoneNumberStyle = {
    fontSize:'12px', 
    textAlign:'center', 
    width:'70%',
};
const addressStyle = {
    fontSize:'12px', 
    textAlign:'center', 
    width:'75%',
};
const aptStyle = {
    fontSize:'12px', 
    textAlign:'center', 
    width:'15%',
};
const cityStyle = {
    fontSize:'12px', 
    textAlign:'center', 
    width:'45%',
};
const stateStyle = {
    fontSize:'12px', 
    textAlign:'center', 
    width:'15%',
};
const zipStyle = {
    fontSize:'12px', 
    textAlign:'center', 
    width:'25%',
};
const nameStyle = {
    fontSize:'12px', 
    textAlign:'center', 
    width:'45%',
};
const submitStyle = {
    backgroundColor:'green',
    color:'white',
    border:'none',
    width:'55%',
    padding:'5px',
    borderRadius:'10px',
};
const inputField = {
    fontSize:'12px', 
    textAlign:'center', 
    width:'30%',
};

function Register(props) {
    const REGISTER_URL = process.env.REACT_APP_REGISTER_USER;
    const [userNameStyle, setUserNameStyle ] = useState({
        fontSize:'12px', 
        textAlign:'center', 
        width:'97%',
        border:'1px default black'
    })
    const [validationPromptEmail, setValidationPromptEmail ] = useState({
        color:'red',
        display:'none',
    })

    const [validationPromptPassword, setValidationPromptPassword] = useState({
        color:'red',
        display:'none',
    })
    const [registrationComplete, setregistrationComplete ] = useState({
        color:'green',
        display:'none',
    })
    const [registerContainer, setRegisterContainer] = useState({
        display:'flex', 
        justifyContent:'space-between', 
        flexDirection:'column', 
        height:'300px',
        width:'350px',
        alignItems:'center',
        border:'1px solid silver',
        borderRadius:'10px',
        paddingBottom:'30px',
        boxShadow:'3px 3px 3px rgba(200, 200, 200, .5)',
    })
    const [passwordContainer, setPasswordContainer] = useState({
        display:'flex',
        justifyContent:'space-between',
        width:'80%',
    });

    const isLoading = useSelector(state => state.loading);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const[input, setInput] = useState({
        emailAddress: "",
        password: "",
        confirmPassword:"",
        firstName: "",
        lastName:"",
        areaCode:"",
        phoneNumber:"",
        address:"",
        apt:"",
        city:"",
        state:"",
        zip:"",
    })

    const handleChange = (e) => {
        setValidationPromptEmail({
            ...validationPromptEmail,
            display: 'none',
        });
        setValidationPromptPassword({
            ...validationPromptPassword,
            display:'none',
        });
        const{name, value} = e.target;
        setInput(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    ;}

    const registerUser = async (event) => {
        event.preventDefault();
        try{
            if(input.password !== input.confirmPassword){
                setValidationPromptPassword({
                    ...validationPromptPassword,
                    display:'block',
                });
                return;
            }
            await axios.post(REGISTER_URL, input)
            .then((res) => {
                console.log("Here is the response: ", res);
                if(res.data.statusCode === 200){
                    setInput({
                        emailAddress: "",
                        password: "",
                        confirmPassword:"",
                        firstName: "",
                        lastName:"",
                        areaCode:"",
                        phoneNumber:"",
                        address:"",
                        apt:"",
                        city:"",
                        state:"",
                        zip:"",
                    });

                    setregistrationComplete({
                        ...registrationComplete,
                        display:'block',
                    });
                    setRegisterContainer({
                        ...registerContainer,
                        display:'none',
                    });
                    return;
                }
                if(res.data.statusCode === 409){
                    setValidationPromptEmail({
                        ...validationPromptEmail,
                        display: 'block',
                    });
                    return;
                } 
            });
        } catch(error){
            console.log(error)
        }
    }

    React.useEffect(() => {
        console.log("Here is the input: ", input)
    }, [input]);
  return (
        <div style={Container}>
            <form action="POST" onSubmit={(event)=>registerUser(event)}>
                <div style={registerContainer}>
                    <h4 style={{color:'grey'}}>User Registration</h4>
                        <div style={userNameContainer}>
                            <input required id={`registration-email-${input.emailAddress}`} style={userNameStyle} name='emailAddress' type='email' placeholder='email address' value={input.emailAddress} onChange={(event)=>handleChange(event)}/>
                        </div>
                        <div style={passwordContainer}>
                            <input required style={passwordStyle} name='password' type='password' placeholder='password' value={input.password} onChange={handleChange}/>
                            <input required style={passwordStyle} name='confirmPassword' type='password' placeholder='confirm password' value={input.confirmPassword} onChange={handleChange}/>                
                        </div>
                        <div style={nameContainer}>
                            <input required style={nameStyle} name='firstName' type='text' placeholder='first name' value={input.firstName} onChange={handleChange}/>
                            <input required style={nameStyle} name='lastName' type='text' placeholder='last name' value={input.lastName} onChange={handleChange}/>
                        </div>
                        <div style={phoneContainer}>
                            <input required style={areaCodeStyle} name='areaCode' type='text' placeholder='area code' value={input.areaCode} onChange={handleChange}/>
                            <input required style={phoneNumberStyle} name='phoneNumber' type='text' placeholder='phone number' value={input.phoneNumber} onChange={handleChange}/>
                        </div>
                        <div style={addressContainer}>
                            <input required style={addressStyle} name='address' type='text' placeholder='address' value={input.address} onChange={handleChange}/>
                            <input style={aptStyle} name='apt' type='text' placeholder='apt' value={input.apt} onChange={handleChange}/>
                        </div>
                        <div style={cityStateZipContainer}>
                                <input required style={cityStyle} name='city' type='text' placeholder='city' value={input.city} onChange={handleChange}/>
                                <input required style={stateStyle} name='state' type='text' placeholder='state' value={input.state} onChange={handleChange}/>
                                <input required style={zipStyle} name='zip' type='text' placeholder='zip' value={input.zip} onChange={handleChange}/>
                        </div>
                        <div style={submitContainer}>
                                <input type='submit' value="SUBMIT" style={submitStyle} />
                        </div>
                </div>
            </form>
            <div style={validationPromptEmail}>
                <h4>* Email Already Exists for {input.emailAddress}!</h4>
            </div>
            <div style={validationPromptPassword}>
                <h4>* Password Confirmation Did NOT match</h4>
            </div>
            <div style={registrationComplete}>
                <h4><i>Registration Complete. THANK YOU.</i></h4>
            </div>
        </div>
  );
}

export default Register;
