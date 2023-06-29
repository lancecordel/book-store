import * as React from 'react';
import SideBarCategories from './SideBarCategories';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, resetCart, updateQuantity, updateTotal } from '../../../store/cartSlice';
import { persistReducer, persistStore } from 'redux-persist';
import { store } from '../../../store/store';
import '../../../css/checkout.css';
import visaCard from '../../../image/visaCard.svg';
import masterCard from '../../../image/masterCard.svg';
import amexCard from '../../../image/amexCard.svg';
import discoverCard from '../../../image/discoverCard.svg';
import paypalWord from '../../../image/paypalWord.png';
import paypalP from '../../../image/paypalP.png';
import axios from 'axios';
import { setLoggedIn } from '../../../store/loginSlice';

function Checkout(props){
    const UPDATE_CUSTOMER = process.env.REACT_APP_UPDATE_CUSTOMER;
    const UPDATE_ORDER = process.env.REACT_APP_UPDATE_ORDER;
    const reduxCart = useSelector(state => state.cart);
    const reduxCustomer = useSelector(state => state.login);
    const dispatch = useDispatch();
    const [ input, setInput ] = React.useState({
        ...reduxCustomer,
    });
    const [ creditCardInput, setCreditCardInput ] = React.useState({
        cardNumber: "",
        nameOnCard: "",
        expirationDate: "",
        securityCode: "",
    });
    const [ guestInput, setGuestInput ] = React.useState({ 
        firstName:"",
        lastName:"",
        emailAddress:"",
        address:"",
        apt:"",
        city:"",
        state:"",
        zip:"",
        areaCode:"",
        phoneNumber:"",
    });
    const [ shippingFormMissingInfo, setShippingFormMissingInfo ] = React.useState(false);
    const [ creditCardRowContainer, setcreditCardRowContainer ] = React.useState({
        display:"none",
        /* border:1px solid; */
        width:"100%",
    })
    const [ inputName, setInputName ] = React.useState({
        width:"50%",
        fontSize:"11px",
        padding:'7px',
        marginTop:"5px",
        // border:'1px solid',
        display: reduxCustomer.isLoggedIn ? 'none' : 'block',
    })
    const [ customerName, setCustomerName ] = React.useState({
        width:"50%",
        fontSize:"11px",
        padding:'9px',
        marginTop:"5px",
        // backgroundColor:'white',
        // border:'1px solid',
    })
    const [ inputAreaCode, setInputAreaCode ] = React.useState({
        width:"20%",
        fontSize:"11px",
        padding:'7px',
        marginTop:"5px",
        // backgroundColor:'white',
        // border:'1px solid',
        display: reduxCustomer.isLoggedIn ? 'none' : 'block',
        marginBottom:'15px',
    })
    const [ customerAreaCode, setCustomerAreaCode ] = React.useState({
        width:"10%",
        fontSize:"11px",
        padding:'9px',
        marginTop:"5px",
        // backgroundColor:'white',
        marginBottom:'15px',
        // border:'1px solid',
    })
    const [ inputPhone, setInputPhone ] = React.useState({
        width:"80%",
        fontSize:"11px",
        padding:'7px',
        marginTop:"5px",
        // backgroundColor:'white',
        // border:'1px solid',
        display: reduxCustomer.isLoggedIn ? 'none' : 'block',
        marginBottom:'15px',
    })
    const [ customerPhone, setCustomerPhone ] = React.useState({
        width:"90%",
        fontSize:"11px",
        padding:'9px',
        marginTop:"5px",
        // backgroundColor:'white',
        marginBottom:'15px',
        // border:'1px solid',
    })
    const [ inputEmail, setInputEmail ] = React.useState({
        width:"100%",
        fontSize:"11px",
        padding:'7px',
        marginTop:"5px",
        /* border:1px solid; */
        display: reduxCustomer.isLoggedIn ? 'none' : 'block',
    })
    const [ customerEmail, setCustomerEmail ] = React.useState({
        width:"100%",
        fontSize:"11px",
        padding:'9px',
        marginTop:"5px",
        // backgroundColor:'white',
        // border:'1px solid',
    })
    const [ cartTotalAtCheckout, setCartTotalAtCheckout ] = React.useState({
        width:"100%",
        fontSize:"11px",
        padding:'9px',
        marginTop:"5px",
        backgroundColor:'white',
        border:'1px solid',
    })
    const [ paypalRowContainer, setPaypalRowContainer ] = React.useState({
        display:"flex",
        // border:"1px solid",
        width:"100%",
    })
    const [ paypalRowAgreementContainer, setPaypalRowAgreementContainer ] = React.useState({
        display:"flex",
        // border:"1px solid",
        width:"100%",
        marginTop:'20px',
    })
    const [ paypalAreementCheckbox, setPaypalAgreementCheckbox ] = React.useState({
        display:"flex",
        alignItems:'start',
        // border:"1px solid",
        marginRight:'5px',
    })
    const [ paypalAreement, setPaypalAgreement ] = React.useState({
        display:"flex",
        // border:"1px solid",
        fontSize:'11px',
        marginTop:'5px',
        marginBottom:'25px',
    })
    const [ paypalRadioContainer, setPaypalRadioContainer ] = React.useState({
        display:"flex",
        justifyContent:"space-between",
        // border:"1px solid",
        alignItems:"center",
        fontSize:'11px',
        padding:'7px 0px 7px 0px',
        marginBottom:'20px',
    })
    const [ creditCardRadioContainer, setCreditCardRadioContainer ] = React.useState({
        display:"flex",
        justifyContent:"space-between",
        // border:"1px solid",
        alignItems:"center",
        fontSize:'11px',
        padding:'7px 0px 7px 0px',
        marginTop:'20px',
        marginBottom:'20px',
    })
    const [ checkoutProcessCreditButton, setCheckoutProcessCreditButton ] = React.useState({
        padding:"12px 25px 12px 25px",
        marginRight:"10px",
        color:'white',
        fontSize:"11px",
        backgroundColor:"rgba(68, 148, 68)",
        borderRadius:"13px",
        border:"none",
        display:"none",
    })
    const [ checkoutProcessPaypalButton, setCheckoutProcessPaypalButton ] = React.useState({
        padding:"10px 25px 10px 25px",
        marginRight:"10px",
        color:'black',
        fontSize:"11px",
        backgroundColor:"white",
        borderRadius:"13px",
        border:"1px solid black",
        display:"none",
    })
    const [ checkoutCancelButton, setCheckoutCancelButton ] = React.useState({
        padding:"10px 25px 10px 25px",
        marginRight:"10px",
        color:'white',
        fontSize:"11px",
        backgroundColor:"black",
        borderRadius:"13px",
        // border:"1px solid black",
        // display:"none",
    })
    const [ editShippingButton, setEditShippingButton ] = React.useState({
        padding:"10px 25px 10px 25px",
        marginRight:"10px",
        color:'white',
        fontSize:"11px",
        backgroundColor:"rgb(99, 108, 186)",
        borderRadius:"13px",
        border:"none",
        padding:"12px"
        // border:"1px solid black",
        // display:"none",
    })
    const [ updateShippingButton, setUpdateShippingButton ] = React.useState({
        padding:"10px 25px 10px 25px",
        marginRight:"10px",
        color:'white',
        fontSize:"11px",
        backgroundColor:"rgba(68, 148, 68)",
        borderRadius:"8px",
        border:"none",
        padding:"10px",
        // border:"1px solid black",
        display:"none",
        marginBottom:'15px',
    })
    const [ updateShippingWhileLoggedOutButton, setUpdateShippingWhileLoggedOutButton ] = React.useState({
        padding:"10px 25px 10px 25px",
        marginRight:"10px",
        color:'white',
        fontSize:"11px",
        backgroundColor:"rgba(68, 148, 68)",
        borderRadius:"8px",
        border:"none",
        padding:"10px",
        // border:"1px solid black",
        // display:"none",
        marginBottom:'15px',
    })
    const [ paymentInfoContainer, setPaymentInfoContainer ] = React.useState({
        position:"relative",
        display:"flex",
        flexDirection:"column",
        border:"1px solid",
        borderLeft:"none",
        width:'50%',
    })
    const [ opacityLayer, setOpacityLayer ] = React.useState({
        top:"0px",
        left:"0px",
        // border:"3px solid",
        borderLeft:"none",
        width:'100%',
        height:'100%',
        opacity:'.8',
        backgroundColor:'white',
        zIndex:'100',
        display:'none',
    })
    const [ updatePrompt, setUpdatePrompt ] = React.useState({
        fontSize:"11px",
        color:"blue",
        marginBottom:'15px',
        display:'none',
        
    })
    const [ shippingValidationPrompt, setShippingValidationPrompt ] = React.useState({
        fontSize:"11px",
        fontWeight:"600",
        color:"red",
        marginBottom:'15px',
        display:'none',
        
    })
    const [ shippingValidationMissingFieldPrompt, setShippingValidationMissingFieldPrompt ] = React.useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        });
        setShippingValidationPrompt({
            ...shippingValidationPrompt,
            display:'none',
        });;
    };

    const handleCreditCardChange = (event) => {
        const { name, value } = event.target;
        setCreditCardInput(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        });
        setShippingValidationPrompt({
            ...shippingValidationPrompt,
            display:'none',
        });
    };

    const handleGuestChange = (event) => {
        const { name, value } = event.target;
        setGuestInput(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        });
        setShippingValidationPrompt({
            ...shippingValidationPrompt,
            display:'none',
        });
    };

    const choosePayment = (event) => {
        const current = event.target;
        if(current.value === "creditCard"){
            setcreditCardRowContainer({
                ...creditCardRowContainer,
                display: 'flex',
            });
            setCreditCardRadioContainer({
                ...creditCardRadioContainer,
                border: '2px solid silver',
            });
            setPaypalRadioContainer({
                ...paypalRadioContainer,
                border: 'none',
            });
            setCheckoutProcessPaypalButton({
                ...checkoutProcessPaypalButton,
                display: 'none',
            });
            setCheckoutProcessCreditButton({
                ...checkoutProcessCreditButton,
                display: 'block',
            });
        }

        if(current.value === 'paypal'){
            setPaypalRowContainer({
                ...creditCardRowContainer,
                display: 'flex',
            });
            setPaypalRowAgreementContainer({
                ...paypalRowAgreementContainer,
                display: 'flex',
            });
            setPaypalRadioContainer({
                ...paypalRadioContainer,
                border: '2px solid silver',
            });
            setcreditCardRowContainer({
                ...creditCardRowContainer,
                display: 'none',
            });
            setCreditCardRadioContainer({
                ...creditCardRadioContainer,
                border: 'none',
            });
            setCheckoutProcessPaypalButton({
                ...checkoutProcessPaypalButton,
                display: 'block',
            });
            setCheckoutProcessCreditButton({
                ...checkoutProcessCreditButton,
                display: 'none',
            });
        }
    }

    const editShippingDetails = (event) => {

        event.preventDefault();

        setUpdateShippingButton({
            ...updateShippingButton,
            display:"block",
        });
        setEditShippingButton({
            ...editShippingButton,
            display:"none",
        });
        setCustomerName({
            ...customerName,
            display:"none",
        });
        setInputName({
            ...inputName,
            display:"block",
        });
        setCustomerEmail({
            ...customerEmail,
            display:"none",
        });
        setInputEmail({
            ...inputEmail,
            display:"block",
        });
        setCustomerAreaCode({
            ...customerAreaCode,
            display:"none",
        });
        setInputAreaCode({
            ...inputAreaCode,
            display:"block",
        });
        setInputPhone({
            ...inputPhone,
            display:"block",
        });
        setCustomerPhone({
            ...customerPhone,
            display:"none",
        });
        setOpacityLayer({
            ...opacityLayer,
            display:"block",
        });
        setUpdatePrompt({
            ...updatePrompt,
            display:"block",
        });
    };

    const processCreditCardPayment = async() => {
        try{
            if(!reduxCustomer.isLoggedIn){
                // check for missing required values in shipping form while checking out as guest
                for(let key in guestInput){
                    // console.log("Can you see me: ", key)
                    if(key !== 'apt' && key !== 'aptUpperCase' && guestInput[key] === ""){
                        setShippingValidationMissingFieldPrompt(key);
                        return setShippingValidationPrompt({
                            ...shippingValidationPrompt,
                            display:'block',
                        });
                    }
                }
            }
            // check for missing required values in the shipping form while logged in
            for(let key in input){
                if(key !== 'apt' && key !== 'aptUpperCase' && input[key] === ""){
                    setShippingValidationMissingFieldPrompt(key);
                    return setShippingValidationPrompt({
                        ...shippingValidationPrompt,
                        display:'block',
                    });
                }
            }
            // check for missing required values in credit card form
            for(let key in creditCardInput){
                if( creditCardInput[key] === ""){
                    setShippingValidationMissingFieldPrompt(key);
                    return setShippingValidationPrompt({
                        ...shippingValidationPrompt,
                        display:'block',
                    });
                }
            }
            // set cart to close status
            await axios.post(UPDATE_ORDER, {
                ...reduxCart,
                
                shippingDetails: {
                    address: reduxCustomer.isLoggedIn ? reduxCustomer.address : guestInput.address,
                    apt: reduxCustomer.isLoggedIn ? reduxCustomer.apt : guestInput.apt,
                    city: reduxCustomer.isLoggedIn ? reduxCustomer.city : guestInput.city,
                    state: reduxCustomer.isLoggedIn ? reduxCustomer.state : guestInput.state,
                    zip: reduxCustomer.isLoggedIn ? reduxCustomer.zip : guestInput.zip,
                    areaCode: reduxCustomer.isLoggedIn ? reduxCustomer.areaCode : guestInput.areaCode,
                    phoneNumber: reduxCustomer.isLoggedIn ? reduxCustomer.phoneNumber : guestInput.phoneNumber,
                },
                openCart: false,
            })
            .then(res => {
                dispatch(resetCart());
            });
        } 
        catch (error) { 
            console.log("There was an error processing order: ", error)
        }
    };

    const saveUpdatedShippingDetails = async (event) => { 
        // check for missing required values in the shipping form while logged in
        for(let key in input){
            if(key !== 'apt' && key !== 'aptUpperCase' && input[key] === ""){
                setShippingValidationMissingFieldPrompt(key);
                return setShippingValidationPrompt({
                    ...shippingValidationPrompt,
                    display:'block',
                });
            }
        }

        try{
            const update = {
                ...input,
                // emailAddressUpperCase: input.emailAddress.toUpperCase(),
                firstNameUpperCase: input.firstName.toUpperCase(),
                lastNameUpperCase: input.lastName.toUpperCase(),
                addressUpperCase: input.address.toUpperCase(),
                aptUpperCase: input.apt.toUpperCase(),
                cityUpperCase: input.city.toUpperCase(),
                stateUpperCase: input.state.toUpperCase(),
            };

            await axios.post(UPDATE_CUSTOMER, update)
            .then(res => {
                dispatch(setLoggedIn(input));
                console.log("Response from checkout: ", res);
            });

            setUpdateShippingButton({
                ...updateShippingButton,
                display:"none",
            });
            setEditShippingButton({
                ...editShippingButton,
                display:"block",
            });
            setInputName({
                ...inputName,
                display:"none",
            });
            setCustomerName({
                ...customerName,
                display:"block",
            });
            setCustomerEmail({
                ...customerEmail,
                display:"block",
            });
            setInputEmail({
                ...inputEmail,
                display:"none",
            });
            setCustomerAreaCode({
                ...customerAreaCode,
                display:"block",
            });
            setInputAreaCode({
                ...inputAreaCode,
                display:"none",
            });
            setCustomerPhone({
                ...customerPhone,
                display:"block",
            });
            setInputPhone({
                ...inputPhone,
                display:"none",
            });
            setOpacityLayer({
                ...opacityLayer,
                display:"none",
            });
            setUpdatePrompt({
                ...updatePrompt,
                display:"none",
            });

        } catch(error){
            console.log(error)
        }
    };

    React.useEffect(() => {
        // console.log("From use effect in Checkout component: ");
    }, [input, shippingFormMissingInfo]);
    
    return (
        <>
        <div className='container-checkout'>
            {
                reduxCart.items.length !== 0 ?
                <>
                <div className='inner-container-checkout'>
                    {/* INFO and PAYMENT CONTAINER */}
                    <div className='customer-info-payment-container'>

                        {/* BILLING ADDRESS CONTAINER */}
                        <div className='infoContainer' >
                                <div className='billing-shipping-info-header'>billing/shipping information</div>
                                <div className='customer-address-container'>
                                    <div className='inner-customer-address-container'>
                                        <div className='conditions-of-use'>must be the same as your credit card address</div>
                                        {
                                            reduxCustomer.isLoggedIn ?
                                            <>
                                                <div className='address-row-container'>
                                                    <span style={customerName}>{input.firstName}</span>
                                                    <span style={customerName}>{input.lastName}</span>
                                                    <input required style={inputName} name="firstName" placeholder='first name' value={input.firstName} onChange={handleChange}/>
                                                    <input required style={inputName} name="lastName" placeholder='last name' value={input.lastName} onChange={handleChange}/>
                                                </div>
                                                <div className='address-row-container'>
                                                    <span style={customerEmail}>{input.address}</span>
                                                    <input required style={inputEmail} placeholder='address' name="address" value={input.address} onChange={handleChange} />
                                                </div>
                                                <div className='address-row-container'>
                                                    <span style={customerEmail}>{input.apt}</span>
                                                    <input style={inputEmail} placeholder='apt, unit, etc. (optional)' name="apt" value={input.apt} onChange={handleChange} />
                                                </div>
                                                <div className='address-row-container'>
                                                    <span style={customerName}>{input.city}</span>
                                                    <span style={customerName}>{input.zip}</span>
                                                    <input required style={inputName} placeholder='city' name="city" value={input.city} onChange={handleChange} />
                                                    <input required style={inputName} placeholder='zip code' name="zip" value={input.zip} onChange={handleChange} />
                                                </div>
                                                <div className='address-row-container'>
                                                    <span style={customerEmail}>{input.state}</span>
                                                    <input required style={inputEmail} placeholder='state' name="state" value={input.state} onChange={handleChange} />
                                                </div>
                                                <div className='address-row-container'>
                                                    <span style={customerAreaCode}>{input.areaCode}</span>
                                                    <span style={customerPhone}>{input.phoneNumber}</span>
                                                    <input required style={inputAreaCode} placeholder='area' name="areaCode" value={input.areaCode} onChange={handleChange}/>
                                                    <input required style={inputPhone} placeholder='phone' name="phoneNumber" value={input.phoneNumber} onChange={handleChange}/>
                                                </div>
                                                <div className='address-row-container'>
                                                    <span style={updatePrompt}>click SAVE or CANCEL before proceeding</span>
                                                </div>
                                                <div className='address-row-container'>
                                                    <span style={shippingValidationPrompt}>* {shippingValidationMissingFieldPrompt} is required!</span>
                                                </div>
                                                <button type="submit" style={updateShippingButton} onClick={saveUpdatedShippingDetails}>save updates</button>
                                            </>
                                            :
                                            <>
                                                <div className='address-row-container'>
                                                    <input required style={inputName} name="firstName" placeholder='first name'  onChange={handleGuestChange}/>
                                                    <input required style={inputName} name="lastName" placeholder='last name' onChange={handleGuestChange}/>
                                                </div>
                                                <div className='address-row-container'>
                                                    <input required style={inputEmail} placeholder='email' name="emailAddress" onChange={handleGuestChange} />
                                                </div>
                                                <div className='address-row-container'>
                                                    <input required style={inputEmail} placeholder='address' name="address" onChange={handleGuestChange} />
                                                </div>
                                                <div className='address-row-container'>
                                                    <input style={inputEmail} placeholder='apt, unit, etc. (optional)' name="apt" onChange={handleGuestChange} />
                                                </div>
                                                <div className='address-row-container'>
                                                    <input required style={inputName} placeholder='city' name="city"  onChange={handleGuestChange} />
                                                    <input required style={inputName} placeholder='zip code' name="zip" onChange={handleGuestChange} />
                                                </div>
                                                <div className='address-row-container'>
                                                    <input required style={inputEmail} placeholder='state' name="state" onChange={handleGuestChange} />
                                                </div>
                                                <div className='address-row-container'>
                                                    <input required style={inputAreaCode} placeholder='area code' name="areaCode" onChange={handleGuestChange}/>
                                                    <input required style={inputPhone} placeholder='phone' name="phoneNumber" onChange={handleGuestChange}/>
                                                </div>
                                                <div className='address-row-container' style={{flexDirection:'column'}}>
                                                    <span style={shippingValidationPrompt}>- One or more fields are missing!</span>
                                                    <span style={shippingValidationPrompt}>* {shippingValidationMissingFieldPrompt} is required!</span>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>

                                {/* BUTTON MAIN CONTAINER */}
                                <div className='main-checkout-button-container'>

                                    {/* BUTTONS ON SHIPPING ADDRESS SIDE */}
                                    <div className='checkout-button-container'>
                                        {
                                            reduxCustomer.isLoggedIn ?
                                            <>
                                                <button style={editShippingButton} onClick={editShippingDetails}>edit shipping</button>
                                            </>
                                            :
                                            <>
                                            </>
                                        }

                                    </div>
                                    {/* END BUTTONS ON SHIPPING ADDRESS SIDE */}

                                </div>
                                {/* END BUTTON MAIN CONTAINER */}

                            {/* </form> */}
                        </div>
                        {/* END BILLING ADDRESS CONTAINER */}
                        
                        {/* PAYMENT INFO CONTAINER */}
                        <div className='paymentInfoContainer'>
                            {/* <div style={opacityLayer}></div> */}
                            <div className='paymentInfoInnerContainer'>
                            
                                <div className='payment-info-header'>credit card information</div>
                                <div className='credit-card-container'>
                                    <div className='inner-credit-card-container'>
                                        <div style={creditCardRadioContainer}>
                                            <div style={{display:'flex',alignItems:'center'}}>
                                            <input style={{height:'100%', padding:'0px'}}  name="paymentType" type='radio' value="creditCard" onClick={choosePayment}/>
                                            <label htmlFor="credit card">credit card</label>
                                            </div>
                                            <div style={{marginRight:'5px'}}>
                                                <img src={visaCard}/>
                                                <img src={amexCard}/>
                                                <img src={discoverCard}/>
                                                <img src={masterCard}/>
                                            </div>
                                        </div>
                                        <div className='credit-card-row' style={creditCardRowContainer}>
                                            <input className='email-input' placeholder='card number' name="cardNumber" value={creditCardInput.cardNumber} onChange={handleCreditCardChange}/>
                                        </div>
                                        <div className='credit-card-row' style={creditCardRowContainer}>
                                            <input className='email-input' placeholder='name on card' name="nameOnCard" value={creditCardInput.nameOnCard} onChange={handleCreditCardChange} />
                                        </div>
                                        <div className='credit-card-row' style={creditCardRowContainer}>
                                            <input className='name-input' placeholder='expiration date' name="expirationDate" value={creditCardInput.expirationDate} onChange={handleCreditCardChange}/>
                                            <input className='name-input' placeholder='security code' name="securityCode" value={creditCardInput.securityCode} onChange={handleCreditCardChange}/>
                                        </div>
                                    </div>
                                    <div className='inner-paypal-container'>
                                        <div style={paypalRadioContainer}>
                                            <div style={{display:'flex',alignItems:'center'}}>
                                                <input style={{height:'100%', padding:'0px'}} name='paymentType' type='radio' value="paypal" onClick={choosePayment} />
                                                <label htmlFor="paypal">paypal</label>
                                            </div>
                                            <div style={{marginRight:'5px',alignItems:'center',justifyContent:'center'}}>
                                                {/* <img src={paypalP} height="38px"/> */}
                                                <img src={paypalWord} height="52px"/>
                                            </div>
                                        </div>
                                        <div style={paypalRowContainer}>
                                            <span style={cartTotalAtCheckout}>cart total:    ${reduxCart.total}</span>
                                        </div>
                                        <div style={paypalRowContainer}>
                                            <span style={cartTotalAtCheckout}>shipping:    -</span>
                                        </div>
                                        <div style={paypalRowContainer}>
                                            <span style={cartTotalAtCheckout}>total:    ${reduxCart.total}</span>
                                        </div>
                                        <div style={paypalRowAgreementContainer}>
                                            <div style={paypalAreementCheckbox}>
                                                <input className='email-input' type='checkbox' />
                                            </div>
                                            <div style={paypalAreement}>
                                                <span>I have read and agree to the terms & conditions and accept the return policy</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            {/* BUTTON MAIN CONTAINER */}
                            <div className='main-checkout-button-container'>

                                {/* BUTTONS ON PAYMENT SIDE */}
                                <div className='checkout-button-container'>
                                    <button style={checkoutCancelButton}>cancel</button>
                                    {
                                        opacityLayer.display === "none" ? 
                                        <>
                                        <button style={checkoutProcessCreditButton} onClick={processCreditCardPayment}>process payment</button>
                                        <button style={checkoutProcessPaypalButton}>pay with PAYPAL</button>
                                        </>
                                        :
                                        ""
                                    }
                                </div>
                                {/* END BUTTON PAYMENT SIDE */}

                            </div>
                            {/* END BUTTON MAIN CONTAINER */}

                        </div>
                        {/* END PAYMENT INFO CONTAINER */}


                    </div>
                    {/* END INFO and PAYMENT CONTAINER */}

                </div>
                </>
                :
                <>
                <h1>Thank you for placing your order!</h1>
                </>
            }
        </div>
        </>
    );
}
export default Checkout;
