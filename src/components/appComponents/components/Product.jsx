import * as React from 'react';
import '../../../css/Product.css';
import SideBarCategories from './SideBarCategories';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCartOutlined';

const stockImage = process.env.REACT_APP_STOCK;

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
    justifyContent:'center',
    width:'80%',
    // border:'1px solid silver',
    borderTop:'1px solid silver',
    marginLeft:'15px',
};
const categoryName = {
    display:'flex',
    justifyContent:'start',
    // border:'1px solid green',
    borderBottom:'1px solid silver',
    fontSize:'20px',
    // color:'#a01010',
    fontWeight:'600',
    paddingBottom:'15px',
    margin:'15px 0px 15px 15px'
};
const productInfoContainer = {
    display:'flex',
    // border:'1px solid green',
    width:'100%',
    // fontFamily:'Arial, sans-serif'
};
const imageContainer = {
    display:'flex',
    justifyContent:'center',
    // border:'1px solid green',
    width:'30%',
    margin:'0px 15px 0px 15px'
};
const imageWrapper = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    border:'1px solid green',
    height:'40%',
    width:'100%'
    // fontFamily:'Arial, sans-serif'
};
const imageFile = {
    dispay:'flex',
    // border:'1px solid green',
    height:'60%',
    // width:'70%',
    // fontFamily:'Arial, sans-serif'
};
const productDetailsContainer = {
    display:'flex',
    flexDirection:'column',
    // border:'1px solid green',
    width:'70%'
    // fontFamily:'Arial, sans-serif'
};
const bookTitle = {
    display:'flex',
    // border:'1px solid',
    width:'90%',
    fontWeight:'600',
    // color:'#bf9000',
    padding:'15px 0px 15px 0px'
};
const publicationContainer = {
    display:'flex',
    flexDirection:'column',
    // border:'1px solid',
    width:'100%',
};
const keyValuePairContainer = {
    display:'flex',
    // border:'1px solid',
    width:'100%',
};
const key = {
    display:'flex',
    // border:'1px solid',
    width:'30%',
    fontWeight:'500',
};
const value = {
    display:'flex',
    // border:'1px solid',
    width:'70%',
    color:'#807878'
};
const productDetails = {
    display:'flex',
    // border:'1px solid',
    width:'90%',
    padding: '15px 0px 30px 0px'
};
const price = {
    display:'flex',
    // border:'1px solid',
    borderBottom:'1px solid silver',
    width:'100%',
    fontSize:'30px',
    fontWeight:'600',
    padding: '10px 0px 15px 0px'
};
const quantityAddContainer = {
    display:'flex',
    alignItems:'center',
    // border:'1px solid',
    width:'100%',
    height: '30px',
    padding: '10px 0px 15px 0px'

};
const addToCartStyle = {
    // width:'20%',
    border:'none',
    color:'white',
    backgroundColor:'#2c844f',
    border:'2px solid green',
    display: 'block',
};
const inCartStyle = {
    padding:'5px 50px 5px 50px',
    border:'1px solid',
    borderColor:'#a18f14',
    backgroundColor:'#f4d608',
    borderRadius:'5px',
    marginRight:'10px',
    fontWeight:'600',
    display:'none',
};
function Product(props){
    const reduxProduct = useSelector(state => state.product);
    // const reduxSearch = useSelector(state => state.search);
    const reduxCart = useSelector(state => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        const qtyDOM = document.getElementById(`product-page-quantity-${reduxProduct.bookId}`).value;
        const quantity = qtyDOM !== "" ? qtyDOM : 1;
        dispatch(addToCart({ 
            ...reduxProduct, 
            quantity: parseInt(quantity), 
        }));
    };

    const cartStatusinProductPage = () => {
        const inCartButton = document.getElementById(`in-cart-button-in-product-page-${reduxProduct.bookId}`);
        const addToCartButton = document.getElementById(`add-to-cart-button-in-product-page-${reduxProduct.bookId}`);
        const deleteFromCartIcon = document.getElementById(`remove-from-cart-icon-in-product-page-${reduxProduct.bookId}`);
        reduxCart.items.forEach((cartItem, index) => {
            if(cartItem.bookId === reduxProduct.bookId){
                inCartButton.style.display = 'block';
                addToCartButton.style.display = 'none';
                deleteFromCartIcon.style.display = 'block';
                // console.log("This product is in the cart: ", reduxProduct);
                return;
            }
            inCartButton.style.display = 'none';
            deleteFromCartIcon.style.display = 'none';
            console.log("This product is NOT in the cart!")
        })
    };

    const handleNavigateToCart = () => {
        navigate('/cart');
    };

    const deleteFromCart = (event) => {
        const addToCartButton = document.getElementById(`add-to-cart-button-in-product-page-${reduxProduct.bookId}`);
        const deleteFromCartIcon = document.getElementById(`remove-from-cart-icon-in-product-page-${reduxProduct.bookId}`);
        const inCartButton = document.getElementById(`in-cart-button-in-product-page-${reduxProduct.bookId}`);
        dispatch(removeFromCart(reduxProduct));
        addToCartButton.style.display = 'block';
        deleteFromCartIcon.style.display = 'none';
        inCartButton.style.display = 'none';
    };

    React.useEffect(() => {
        cartStatusinProductPage();
        console.log("From Product component: Product --> ", reduxProduct);
        console.log("From Product component: In Cart --> ", reduxCart.items);
    }, [reduxProduct, reduxCart.items ]);
    
    return (
        <div>
        {/* <div style={backgroundColor}></div> */}
        <div style={container}>
            <div style={innerContainer}>
                <SideBarCategories/>
                <div style={productContainer}>
                    <div style={categoryName}>{reduxProduct.category}</div>
                    <div style={productInfoContainer}>
                        <div style={imageContainer}>
                            <div style={imageWrapper}>
                                <img style={imageFile} src={stockImage}/>                      </div>
                        </div>
                        <div style={productDetailsContainer}>
                            <div style={bookTitle}>{reduxProduct.title.toUpperCase()}</div>
                            <div style={publicationContainer}>
                                <div style={keyValuePairContainer}>
                                    <div style={key}>By: </div>
                                    <div style={value}>  {reduxProduct.by.toUpperCase()}</div>
                                </div>
                                <div style={keyValuePairContainer}>
                                    <div style={key}>Publication Date: </div>
                                    <div style={value}>{reduxProduct.publicationDate}</div>
                                </div>
                                <div style={keyValuePairContainer}>
                                    <div style={key}>Format: </div>
                                    <div style={value}>{reduxProduct.format}</div>
                                </div>
                                <div style={keyValuePairContainer}>
                                    <div style={key}>Trim Size: </div>
                                    <div style={value}>{reduxProduct.trimSize}</div>
                                </div>
                                <div style={keyValuePairContainer}>
                                    <div style={key}>ISBN: </div>
                                    <div style={value}>{reduxProduct.isbn}</div>
                                </div>
                                <div style={keyValuePairContainer}>
                                    <div style={key}>Category: </div>
                                    <div style={value}>{reduxProduct.category.toUpperCase()}</div>
                                </div>
                            </div>
                            <div style={productDetails}>
                            About This Item:  Bring beauty in the form of nature into your home and your lifestyle, no matter where you live, through artful floral arrangements, as well as indoor and outdoor flowering plants. The Artistry of Flowers encourages everyone to live with florals and to appreciate their beauty as we appreciate art. Celebrated floral designer Gabriela Salazar teaches us how to look at flowers and understand their characteristics from an artist's perspective. By exploring different shapes, colors, and textures, she shows us how to understand flowers and their living, transitory nature. Drawing on her painting background, Salazar looks at floral arrangements as compositions. She highlights which type of blooms are best for different designs and shares building blocks for floral designs ranging from simple and sculptural to complex and colorful, including arrangements for any mood and different decor. Salazar inspires us to explore our creativity, empowering us to design our own arrangements. Combining philosophical and practical tips, such as appreciating how flowers change over time and working with fragility The Artistry of Flowers is a treatise on flower appreciation. The stunning photography by Ngoc Minh Ngo--known for Rizzoli books such as In Bloom and Eden Revisited--complements Salazar's enthusiastic instruction.
                            </div>
                            <div style={price}>${parseFloat(reduxProduct.price).toFixed(2)}</div>
                            <div style={quantityAddContainer}>
                                <div style={{marginRight:'10px'}}>QTY: </div>
                                <input style={{width:'50px',marginRight:'5px',textAlign:'center'}} placeholder='1' id={`product-page-quantity-${reduxProduct.bookId}`} type="number" min="1" max="100"/>
                                <button id={`in-cart-button-in-product-page-${reduxProduct.bookId}`} onClick={handleNavigateToCart} style={inCartStyle}>IN CART</button>
                                <button id={`add-to-cart-button-in-product-page-${reduxProduct.bookId}`} onClick={handleAddToCart} style={addToCartStyle}>ADD TO CART</button>
                                <RemoveShoppingCartIcon id={`remove-from-cart-icon-in-product-page-${reduxProduct.bookId}`} onClick={(event) => deleteFromCart(event)}  sx={{ fontSize:35, color:'#e63b3b', display:'none' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
export default Product;
