import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setKeyword, setResults } from '../../../store/searchSlice';
import { setLoggout } from '../../../store/loginSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { persistor } from '../../../store/store';
import { removeCustomerId, resetCart } from '../../../store/cartSlice';

const container = {
    display:'flex',
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
const searchContainer = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'45%',
    // border:'1px solid'
};
const searchInputStyle = {
    // marginRight:'15px',
    width:'50%',
};
const searchButtonStyle = {
    width:'20%',
    border:'none',
    color:'white',
    backgroundColor:'#2c844f',
    border:'2px solid green',
    // borderRadius:'20px',
};
const homeContainer = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'7%',
    color:'#2c844f',
    fontWeight:'600',
    // border:'1px solid',
    borderRight:'1px solid silver',
    borderLeft:'1px solid silver',
};
const loginContainer = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'7%',
    color:'#2c844f',
    fontWeight:'600',
    // border:'1px solid'
    borderRight:'1px solid silver',
};
const accountIconContainer = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'7%',
    color:'#2c844f',
    fontWeight:'600',
    // border:'1px solid'
    borderRight:'1px solid silver',
};
const registerContainer = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'7%',
    color:'#2c844f',
    fontWeight:'600',
    // border:'1px solid'
    borderRight:'1px solid silver',
};
const adminContainer = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'7%',
    color:'#2c844f',
    fontWeight:'600',
    // border:'1px solid'
};
const cartContainer = {
    display:'flex',
    position:'relative',
    justifyContent:'center',
    alignItems:'center',
    width:'7%',
    color:'#2c844f',
    fontWeight:'600',
    // border:'1px solid'
};
const cartCountLayer = {
    display:'flex',
    position:'absolute',
    top:'6px',
    left:'1x',
    // border:'1px solid',
    width:'35px',
    height:'28px',
    justifyContent:'center',
    alignItems:'start',
    color:'white',
    fontSize:'13px',
    // border:'1px solid'
};
const cartTotalContainer = {
    display:'flex',
    justifyContent:'start',
    alignItems:'center',
    width:'5%',
    color:'#2c844f',
    fontWeight:'600',
    // border:'1px solid',
    borderRight:'1px solid silver',
};

function Navbar(props){
    const reduxSearch = useSelector(state => state.search);
    const reduxLogin = useSelector(state => state.login);
    const reduxCart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input, setInput ] = React.useState({
        search: "",
    });
    const QUERY_DATA = process.env.REACT_APP_QUERY_DATA_DIRECT;

    const navigations = {
        toHome: () => navigate('/'),
        toCart: () => navigate('/cart'),
        toRegister: () => navigate('/register'),
        toLogin: () => navigate('/login'),
        toOrders: () => navigate('/orders'),
    };

    const handleSearch = async () => {
        if(input.search === "") return;
        dispatch(setKeyword(input.search));
        try {
            const { data } = await axios.post(QUERY_DATA, input);
            const body = JSON.parse(data.body);
            dispatch(setResults(body));
            navigate('/search');
        } catch(error) {
            console.log(error)
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    };

    const logOut = () => {
        navigate('/login');
        dispatch(setLoggout());
        dispatch(removeCustomerId());
        dispatch(resetCart());
    };

    // TEMP USE ONLY TO PURGE STATE
    const purgeState = () => {
        persistor.purge();
    };

    React.useEffect(() => {

    }, [reduxCart.items]);
    
    return (
        <div style={container}>
            {/* <div style={logoContainer} onClick={navigations.toHome}>Lonas<button onClick={purgeState}>purge</button></div> */}
            <div style={logoContainer} onClick={navigations.toHome}>Lonas</div>
            <div style={searchContainer}>
                <input name='search' value={input.search} onChange={handleChange} style={searchInputStyle} type="text"/>
                <button onClick={handleSearch} style={searchButtonStyle}>Search</button>
            </div>
            <div style={homeContainer} onClick={navigations.toHome}>home</div>
            {
                reduxLogin.isLoggedIn ?
                <>
                    <div style={loginContainer} onClick={logOut}>logout</div>
                    <div style={loginContainer} onClick={navigations.toOrders}>orders</div>
                    <div style={accountIconContainer}>
                        <AccountCircleIcon sx={{ fontSize:25, color:'#2c844f' }} onClick={navigations.toCart}/>
                        <span>{reduxLogin.firstName[0]}{reduxLogin.lastName[0]}</span>
                    </div>
                </>
                :
                <>
                    <div style={loginContainer} onClick={navigations.toLogin}>login</div>
                    <div style={registerContainer} onClick={navigations.toRegister}>register</div>
                </>
            }
            {/* <div style={adminContainer}>admin</div> */}
            <div style={cartContainer}>
                <ShoppingCartIcon sx={{ fontSize:25, color:'#2c844f' }} onClick={navigations.toCart}/>
                {/* <div style={cartCountLayer} onClick={navigations.toCart}>{reduxCart.items.length}</div> */}
                <div onClick={navigations.toCart}>{reduxCart.items.length}</div>
            </div>
        </div>
    );
}
export default Navbar;
