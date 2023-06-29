import * as React from 'react';
import SideBarCategories from './SideBarCategories';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, updateTotal } from '../../../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import book1 from '../../../image/book1.png';
import axios from 'axios';

const container = {
    display:'flex',
    justifyContent:'center',
    width:'100%',
    // border:'1px solid green',
    fontFamily:'Arial, sans-serif',
    marginTop:'30px',
    marginBottom:'30px',
};
const innerContainer = {
    display:'flex',
    justifyContent:'center',
    width:'80%',
    // border:'1px solid green',
    maxWidth:'1500px',
};
const productContainer = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'start',
    width:'80%',
    minWidth:'740px',
    // border:'1px solid silver',
    borderTop:'1px solid silver',
    marginLeft:'15px',
};
const cartTitle = {
    display:'flex',
    justifyContent:'start',
    // border:'1px solid green',
    borderBottom:'1px solid silver',
    fontSize:'20px',
    // color:'#a01010',
    fontWeight:'600',
    padding:'15px 0px 15px 15px'
    // margin:'15px 0px 15px 15px'
};
const productInfoContainer = {
    display:'flex',
    height:'150px',
    width:'100%',
    paddingTop:'18px',
    borderBottom:'1px solid silver',
};
const checkBoxContainer = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    // border:'1px solid green',
    width:'10%',
};
const imageContainer = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'start',
    alignItems:'center',
    // border:'1px solid green',
    width:'25%',
};
const imageWrapper = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    width:'80%',
    height:'80%',
    border:'1px solid green',
    // width:'25%',
};
const descriptionContainer = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'start',
    // border:'1px solid green',
    width:'45%',
};
const productTitle = {
    display:'flex',
    justifyContent:'start',
    // border:'1px solid green',
    fontWeight:'600',
    fontSize:'14px',
    width:'80%',
    paddingLeft:'15px',
    paddingBottom:'10px',
};
const publicationContainer = {
    display:'flex',
    flexDirection:'column',
    // border:'1px solid',
    width:'100%',
    paddingLeft:'15px',
    // paddingRight:'20px'
};
const keyValuePairContainer = {
    display:'flex',
    // border:'1px solid',
    width:'100%',
};
const key = {
    display:'flex',
    // border:'1px solid',
    fontSize:'13px',
    width:'40%',
    fontWeight:'500',
};
const value = {
    display:'flex',
    // border:'1px solid',
    fontSize:'13px',
    width:'60%',
    color:'#807878'
};
const priceContainer = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'start',
    // border:'1px solid green',
    width:'20%',
};
const priceQuantityContainer = {
    display:'flex',
    // flexDirection:'column',
    justifyContent:'end',
    alignItems:'center',
    // border:'1px solid green',
    // width:'25%',
};
const price = {
    display:'flex',
    justifyContent:'end',
    alignItems:'center',
    // border:'1px solid green',
    fontSize:'20px',
    fontWeight:'600',
    paddingRight:'15px'
    // width:'15%',
};
const quantity = {
    display:'flex',
    justifyContent:'end',
    alignItems:'center',
    // border:'1px solid green',
    fontSize:'20px',
    fontWeight:'400',
    paddingRight:'15px'
    // width:'15%',
};
const cartTotalContainer = {
    display:'flex',
    justifyContent:'end',
    marginTop:'15px',
    paddingBottom:'20px'
};
const totalPrice = {
    display:'flex',
    // border:'1px solid',
    fontSize:'20px',
    fontWeight:'600',
    paddingRight:'15px'
};
const totalText = {
    display:'flex',
    // border:'1px solid',
    fontSize:'20px',
    fontWeight:'400',
    paddingRight:'15px'
};
const quantityContainer = {
    display:'flex',
    paddingTop:'10px',
    // border:'1px solid',
    width:'100%',
};
const quantityInput = {
    marginRight:'5px',
};
const individualItemQuantity = {
    width:'20px',
    border:'1px solid',
    textAlign:'center',
    marginRight:'10px',
};
const proceedToCheckoutContainer = {
    display:'flex',
    justifyContent:'start',
    width:'70%',
    // border:'1px solid',
    textAlign:'center',
    marginRight:'10px',
};
const checkoutButton = {
    padding:'5px 50px 5px 50px',
    border:'1px solid',
    borderColor:'#a18f14',
    backgroundColor:'#f4d608',
    borderRadius:'10px',
    fontWeight:'600',
    marginRight:'10px',
};
// const saveCartButton = {
//     padding:'5px 50px 5px 50px',
//     border:'1px solid',
//     borderColor:'#a18f14',
//     backgroundColor:'orange',
//     // borderRadius:'10px',
//     fontWeight:'600',
// };

function Cart(props){
    const INSERT_ORDER = process.env.REACT_APP_UPDATE_ORDER;
    const navigate = useNavigate();
    const reduxCart = useSelector(state => state.cart);
    const reduxLogin = useSelector(state => state.login);
    const dispatch = useDispatch();
    const [ saveCartButton, setSaveCartButton ] = React.useState({
        padding:'5px 50px 5px 50px',
        border:'1px solid',
        borderColor:'#a18f14',
        backgroundColor:'orange',
        // borderRadius:'10px',
        fontWeight:'600',
    })
    const [ savedCartButton, setSavedCartButton ] = React.useState({
        padding:'5px 50px 5px 50px',
        border:'1px solid',
        borderColor:'#a18f14',
        backgroundColor:'silver',
        // borderRadius:'10px',
        fontWeight:'600',
        display:'none',
    })
    const [individualItemQuantity, setindividualItemQuantity] = React.useState({});
    const handleRemoveFromCart = (event, item) => {
        dispatch(removeFromCart(item));
    };

    const handleQuantityChange = (event, bookId, book) => {
        const quantity = document.getElementById(`cart-page-quantity-${bookId}`);
        const quantityId = quantity.getAttribute('id');
        const { value } = event.target;
        const currentQuantity = event.target;
        const currentQuantityId = currentQuantity.getAttribute(`id`);
        if(quantityId === currentQuantityId){
            individualItemQuantity[bookId] = parseInt(value);
            setindividualItemQuantity(prevState => {
                return {
                    ...prevState,
                    ...individualItemQuantity[bookId]
                }
            });
            dispatch(updateQuantity({
                ...book,
                quantity: individualItemQuantity[bookId],
            }))
            setSavedCartButton({
                ...savedCartButton,
                display: 'none',
            });
            setSaveCartButton({
                ...saveCartButton,
                display: 'block',
            });
        }
    };

    const calculateTotalBasedOnQuantity = () => {
        const totalForEachProduct = []; 
        reduxCart.items.forEach(bookInCart => {
            const individualBookTotal = parseFloat(bookInCart.price).toFixed(2) * bookInCart.quantity;
            totalForEachProduct.push(individualBookTotal);
        });
        const newCartTotal = totalForEachProduct.reduce((a, b) => a + b, 0);
        dispatch(updateTotal(newCartTotal));
        return totalForEachProduct;
    };

    const handleCheckout = async () => {
        try {
            if(reduxLogin.isLoggedIn){
                await axios.post(INSERT_ORDER, reduxCart);
            }
            navigate('/checkout');
        } 
        catch (error){
            console.log(error)
        }
    };

    const saveCart = async () => {
        try {
            // if(reduxLogin.isLoggedIn){
                await axios.post(INSERT_ORDER, reduxCart);
                setSavedCartButton({
                    ...savedCartButton,
                    display: 'block',
                });
                setSaveCartButton({
                    ...saveCartButton,
                    display: 'none',
                });
            // }
        } 
        catch (error){

        }
    };

    React.useEffect(() => {
        calculateTotalBasedOnQuantity()
    }, [reduxCart.items, individualItemQuantity]);
    
    return (
        <div>
        <div style={container}>
            <div style={innerContainer}>
                <SideBarCategories/>
                <div style={productContainer}>
                    <div style={cartTitle}>Shopping Cart</div>

                    {/* INDIVIDUAL PRODUCT START*/}
                    {reduxCart.items.map((book, index) => (
                    <div key={index} style={productInfoContainer}>
                        <div style={checkBoxContainer}>
                            <input type="checkbox"  />
                        </div>
                        <div style={imageContainer}>
                            <div style={imageWrapper}>
                                {/* <div>IMAGE</div> */}
                                <img src={book1} width="150px" style={{marginTop:'20px'}}/>
                            </div>
                        </div>
                        <div style={descriptionContainer}>
                            <div style={productTitle}>{book.title.toUpperCase()}</div>
                            <div style={publicationContainer}>
                                <div style={keyValuePairContainer}>
                                    <div style={key}>By: </div>
                                    <div style={value}>  {book.by.toUpperCase()}</div>
                                </div>
                                <div style={keyValuePairContainer}>
                                    <div style={key}>Publication Date: </div>
                                    <div style={value}>{book.publicationDate}</div>
                                </div>
                                <div style={keyValuePairContainer}>
                                    <div style={key}>Format: </div>
                                    <div style={value}>{book.format}</div>
                                </div>
                                <div style={keyValuePairContainer}>
                                    <div style={key}>Category: </div>
                                    <div style={value}>{book.category}</div>
                                </div>
                                <div style={quantityContainer}>
                                    <div style={quantityInput}>Qty: </div>
                                    <input onChange={(event)=>handleQuantityChange(event, book.bookId, book)} 
                                        name="cartQuantity" 
                                        style={{width:'50px',marginRight:'5px', textAlign:'center'}} 
                                        placeholder='1' 
                                        id={`cart-page-quantity-${book.bookId}`} 
                                        type="number" 
                                        min="1" 
                                        max="100" 
                                        value={book.quantity}
                                    />
                                    <DeleteIcon onClick={(event) => handleRemoveFromCart(event, book)} sx={{ fontSize:20, color:'#e63b3b' }} />
                                </div>
                            </div>
                        </div>
                        <div style={priceContainer}>
                           <div style={priceQuantityContainer}>
                                <div style={price}>${book.price}</div>
                                <div style={quantity}>X {book.quantity}</div>
                            </div>
                        </div>
                    </div>
                    ))}
                    {/* INDIVIDUAL PRODUCT END */}

                    <div style={cartTotalContainer}>
                        {
                            reduxCart.items.length !== 0 ?
                            <>
                            <div style={proceedToCheckoutContainer}>
                                <button style={checkoutButton} onClick={handleCheckout}>Proceed to checkout</button>
                                {
                                    reduxLogin.isLoggedIn? 
                                    <>
                                    <button style={saveCartButton} onClick={saveCart}>Save cart</button>
                                    <button style={savedCartButton}>Cart saved</button>
                                    </>
                                    :
                                    <>
                                    </>
                                }
                            </div>
                            <div style={totalText}>Total: &nbsp; <b>${reduxCart.total}</b></div>
                            <div style={totalPrice}></div>
                            </>
                            :
                            <div style={{display:'flex',justifyContent:'center',width:'100%'}}>
                            <h1>Shopping cart is empty</h1>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
export default Cart;
