import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { loading, notLoading } from '../../../store/loadingSlice';
import { FileUploadOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { setLoggedIn } from '../../../store/loginSlice';
import { addCustomerId, setCart } from '../../../store/cartSlice';

const Container = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'start',
    alignItems:'center',
    height:'70%',
    width:'80%',
    // border:'1px solid',
};

const loginContainer = {
    display:'flex', 
    justifyContent:'space-between', 
    flexDirection:'column', 
    height:'180px',
    width:'350px',
    alignItems:'center',
    border:'1px solid silver',
    borderRadius:'10px',
    paddingBottom:'30px',
    boxShadow:'3px 3px 3px rgba(200, 200, 200, .5)',
};

const submitContainer = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'80%',
    marginTop:'15px',
    // border:'1px solid',
};
const userNameContainer = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    width:'80%',
};
const passwordContainer = {
    display:'flex',
    justifyContent:'space-between',
    width:'80%',
};
const userNameStyle = {
    fontSize:'12px', 
    textAlign:'center', 
    width:'97%',
};
const passwordStyle = {
    fontSize:'12px', 
    textAlign:'center', 
    width:'100%',
};
const submitStyle = {
    backgroundColor:'green',
    color:'white',
    border:'none',
    width:'55%',
    padding:'5px',
    borderRadius:'10px',
};

function Login(props) {
    const USER_LOGIN = process.env.REACT_APP_LOGIN;
    const GET_CART = process.env.REACT_APP_GET_CART;

    const navigate = useNavigate();
    const reduxLogin = useSelector(state => state.login);
    const dispatch = useDispatch();
    const[input, setInput] = useState({
        emailAddress: "",
        password: "",
    });
    const [emailORpasswordValidation, setemailORpasswordValidation ] = useState({
        color:'red',
        display:'none',
    })

    const handleChange = (e) => {
        setemailORpasswordValidation({
            ...emailORpasswordValidation,
            display: 'none',
        });
        const{name, value} = e.target;
        setInput(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    ;}

    const loginUser = async (event) => {
        event.preventDefault();
        try{
            await axios.post(USER_LOGIN, input)
            .then( async (res) => {
                const body = JSON.parse(res.data.body);
                if(body.statusCode === 200){
                    dispatch(setLoggedIn(body.user));
                    dispatch(addCustomerId(body.user));
                    await axios.post(GET_CART, body.user)
                    .then(res => {
                        const cart = JSON.parse(res.data.body);
                        if(cart.statusCode === 200){
                            dispatch(setCart({ 
                                ...cart.openCart,
                                emailAddress: body.user.emailAddress,
                             }));
                        } else {
                            dispatch(setCart({
                                orderId: "",
                                customerId: body.user.customerId,
                                isLoggedIn: true,
                                emailAddress: body.user.emailAddress,
                                shippingDetails: {
                                    address: "",
                                    apt: "",
                                    city: "",
                                    state: "",
                                    zip: "",
                                    areaCode: "",
                                    phoneNumber: "",
                                },
                                items: [],
                                total: 0,
                                openCart: true,
                                fullfilled: false,
                                paymentProcessed: false,
                            }));
                        }
                        // console.log("Cart populated on login: ", cart)
                    });
                    return navigate('/');
                }
                setemailORpasswordValidation({
                    ...emailORpasswordValidation,
                    display: 'block',
                });
            });
        } catch(error){
            console.log(error)
        }
    }

    React.useEffect(() => {
        // console.log(input)
        console.log(reduxLogin)
    }, [input, reduxLogin]);
  return (
        <div style={Container}>
            <form action="POST" onSubmit={(event)=>loginUser(event)}>
            <div style={loginContainer}>
                <h4 style={{color:'grey'}}>User LOGIN</h4>
                <div  style={userNameContainer}>
                    <input required style={userNameStyle} name='emailAddress' type='email' placeholder='email address' value={input.emailAddress} onChange={handleChange}/>
                </div>
                <div style={passwordContainer}>
                    <input required style={passwordStyle} name='password' type='password' placeholder='password' value={input.password} onChange={handleChange}/>
                </div>
                <div style={submitContainer}>
                        <input type="submit" value="SUBMIT" style={submitStyle}/>
                </div>
        </div>
        </form>
        <div style={emailORpasswordValidation}>
            <h4>* Invalid Email or Password!</h4>
        </div>
    </div>
  );
}

export default Login;
