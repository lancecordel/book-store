import * as React from 'react';
import SideBarCategories from './SideBarCategories';
import { authors } from '../../../database/authors';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { setProduct } from '../../../store/productSlice';
import  book1  from '../../../image/book1.png';
import { Link } from 'react-router-dom';

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
    fontSize:'15px',
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
    width:'50%',
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
    paddingLeft:'15px'
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
    width:'30%',
    fontWeight:'500',
};
const value = {
    display:'flex',
    // border:'1px solid',
    fontSize:'13px',
    width:'70%',
    color:'#807878'
};
const priceContainer = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'start',
    // border:'1px solid green',
    width:'25%',
};
const price = {
    display:'flex',
    justifyContent:'end',
    // border:'1px solid green',
    fontSize:'20px',
    fontWeight:'600',
    paddingRight:'15px'
    // width:'15%',
};
const addToCartContainer = {
    display:'flex',
    justifyContent:'end',
    alignItems:'center',
    // border:'1px solid green',
    fontSize:'20px',
    marginTop:'15px',
    marginRight:'15px'
};
const cartWrapper = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
};
const goToCartContainer = {
    display:'flex',
    justifyContent:'end',
    width:'100%',
    // border:'1px solid',
    marginTop:'15px',
    // alignItems:'center',
};
const toCartButton = {
    padding:'5px 50px 5px 50px',
    border:'1px solid',
    borderColor:'#a18f14',
    backgroundColor:'#f4d608',
    borderRadius:'5px',
    fontWeight:'600',
    display:'none',
};
const checkoutButton = {
    padding:'5px 50px 5px 50px',
    border:'1px solid',
    borderColor:'#a18f14',
    backgroundColor:'#f4d608',
    borderRadius:'10px',
    fontWeight:'600',
};


function SearchResults(props){
    // const INSERT_ORDER = process.env.REACT_APP_UPDATE_ORDER;
    const reduxSearch = useSelector(state => state.search);
    const reduxProduct = useSelector(state => state.product);
    const reduxCart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const insertOrder = async (reduxCart) => {
    //     await axios.post(INSERT_ORDER, reduxCart);
    // };

    const handleCart = (event, item, index) => {
        const deleteIcon = document.getElementById(`result-remove-cart-${index}`);
        const addIcon = document.getElementById(`result-add-cart-${index}`);
        const toCartButton = document.getElementById(`to-cart-button-${index}`);
        const button = event.target;
        if(button.getAttribute('id') === `result-add-cart-${index}`){
            dispatch(addToCart({ ...item, quantity: 1 }));
            addIcon.style.display = 'none';
            deleteIcon.style.display = 'flex';
            deleteIcon.style.color = 'red';
            deleteIcon.style.fontSize = '35px';
            toCartButton.style.display = 'block';
        } 
        if(button.getAttribute('id') === `result-remove-cart-${index}`){
            dispatch(removeFromCart(item));
            deleteIcon.style.display = 'none';
            addIcon.style.display = 'flex';
            addIcon.style.color = 'green';
            addIcon.style.fontSize = '35px';
            toCartButton.style.display = 'none';
        }         
    };

    const retainCartStatusInSearch = () => {
        reduxSearch.results.forEach((resultItem, index) => {
            reduxCart.items.forEach(cartItem => {
                if(cartItem.bookId === resultItem.bookId){
                    const deleteIcon = document.getElementById(`result-remove-cart-${index}`);
                    const addIcon = document.getElementById(`result-add-cart-${index}`);
                    const toCartButton = document.getElementById(`to-cart-button-${index}`);
                    addIcon.style.display = 'none';
                    deleteIcon.style.display = 'flex';
                    deleteIcon.style.color = 'red';
                    deleteIcon.style.fontSize = '35px';
                    toCartButton.style.display = 'block';
                }
            })
        });
    };
    const navigateToCart = () => {
        navigate('/cart');
    };

    const navigateToProduct = (event, product) => {
        // const productItem = reduxSearch.results.filter(item => item.bookId === product.bookId)
        dispatch(setProduct(product));
        navigate('/product');
    };
    
    React.useEffect(() => {
        retainCartStatusInSearch();
        // console.log("From search component: Items in Cart ---> ", reduxCart.items)
        console.log("From search component: redux cart object ---> ", reduxCart)
        // console.log("From search component: Items in Search Results ---> ", reduxSearch.results)
    }, [reduxCart.items, reduxSearch.results]);
    
    return (
        <div>
        {/* <div style={backgroundColor}></div> */}
        <div style={container}>
            <div style={innerContainer}>
                <SideBarCategories/>
                <div style={productContainer}>
                    <div style={cartTitle}>{reduxSearch.results.length} products: {reduxSearch.keyword}</div>

                    {/* INDIVIDUAL PRODUCT START*/}
                    {reduxSearch.results.map((book, index) => (
                    <div key={index} style={productInfoContainer}>
                        <div style={imageContainer}>
                            <div style={imageWrapper} onClick={(event) => navigateToProduct(event, book)}>
                                {/* <div>IMAGE</div> */}
                                <img src={book1} width="150px" style={{marginTop:'15px'}}/>
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
                            </div>
                        </div>
                        <div style={priceContainer}>
                            <div style={price}>${book.price}</div>
                            <div style={addToCartContainer}>
                                <Link onClick={(event) => handleCart(event, book, index)}>
                                    <div style={cartWrapper} >
                                        <AddShoppingCartIcon id={`result-add-cart-${index}`} sx={{ fontSize:35, color:'#718966' }} />
                                    </div>
                                </Link>
                                <Link onClick={(event) => handleCart(event, book, index)}>
                                    <div style={cartWrapper}>
                                        <RemoveShoppingCartIcon id={`result-remove-cart-${index}`}  sx={{ fontSize:35, color:'#e63b3b', display:'none' }} />
                                    </div>
                                </Link>
                                {/* <DeleteIcon sx={{ fontSize:30, color:'#e63b3b' }} /> */}
                            </div>
                            <div style={goToCartContainer}>
                                <button id={`to-cart-button-${index}`} onClick={navigateToCart} style={toCartButton}>IN CART</button>
                            </div>
                        </div>
                    </div>
                    ))}
                    {/* INDIVIDUAL PRODUCT END */}

                </div>
            </div>
        </div>
        </div>
    );
}
export default SearchResults;
