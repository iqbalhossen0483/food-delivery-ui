import React, { FC, useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { ProductSchema } from '../../../pages/adminPages/addProduct/AddProduct';

interface Props{
    setShowCart: (active: boolean) => void;
}

const CartProduct: FC<Props> = ({ setShowCart }) => {
    const [products, setProducts] = useState<ProductSchema[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const auth = useAuth();
    const cart: string | undefined = auth?.userFromDb?.cart.join(" ");


    useEffect(() => {
        setLoading(true);
        if (cart) {
            fetch(`https://fooddelivery-server.herokuapp.com/products/cart`, {
                headers: {
                    carts: cart
                }
            })
                .then(res => res.json())
                .then(data => {
                    setProducts(data);
                    setLoading(false);
                })
                .catch(err => setLoading(false));
        };
    }, [cart]);

    return (
        <div
            onMouseLeave={() => setShowCart(false)}
            className='cart-prduct'>
            {products && !loading ?
                products.map(item => {
                    return (
                        <div className='grid grid-cols-2 w-52 gap-3 border-b mb-3'>
                            <img src={item.imgUrl} alt="" />
                            <p>{item.name}</p>
                        </div>
                    )
                })
                :
                auth?.userFromDb?.cart.length ?
                    <p>Loading...</p>
                    :
                    <p>No Product</p>
            }
            {products &&
                <div className='flex justify-center'>
                    <button className='px-3 py-1 text-sm'>view cart</button>
                </div>
            }
        </div>
    );
}

export default CartProduct