import React, { Fragment} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import style from 'styles/grid.module.css'
import { Button } from './button/button';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function FullWidthGrid() {

    const [ menuu, setMenuu ] = useState([])
    const [ overlay, setOverlay] = useState(null)
    const [ overlayCollapse, setOverlayCollapse] = useState(false)

    useEffect(() => {

        fetch('/api/menu')
            .then(response => response.json())
            .then(data => {
            setMenuu(data.menu)
            console.log(data.menu)
        })
        
    })

    useEffect(() => {
        console.log(menuu)
    })

    const menu = [

        {product: 'Chips', more: [
            {price: '20.00', list: 'small'},
            {price: '60.00', list: 'large'},
            {price: '40.00', list: 'medium'}
        ]},

        {product: 'Egg bread Sandwiche',  more: [
            {price: '8.80', list: '2 slice'},
            {price: '12.80', list: '3 slice'},
            {price: '14.80', list: '4 slice'},
            {price: '16.80', list: '6 slice'},
        ]},

        {product: 'Sphathlo',  more: [
            {price: '35.90',list: 'Russion and cheese'},
            {price: '37.90', list: 'Russion, cheese and latice'},
            {price: '30.90', list: 'vienna and polony'},
            {price: '45.90', list: 'Russion ,Vienna'}
        ]},
        {product: 'Burger',  more: [
            {price: '55.99', list: 'Cheese Burger'},
            {price: '60.99', list: 'Chicken Burger'},
            {price: '70.99', list: 'Beef Burger'},
            {price: '79.99', list: 'Ribs Burger'}
        ]},
        {product: 'Drinks/ Bevs', more: [
            { price: '19.99', list: ' 500ml Straberry Milkshake'},
            { price: '24.90', list: '2l Cold drink'},
            { price: '15.90', list: '500ml Slush'}
        ]}

    ]

  return (
    <Fragment>     
        <Box  sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                {
                    menu && menu.map((item) => (
                        <Grid xs={12} md={4} s={4} key={item.product}>
                            <Item>
                                <Image 
                                    // src={item.image} 
                                    src={'next.svg'} 
                                    alt='image' 
                                    width={200} 
                                    height={200} 
                                />
                                <h2>{item.product}</h2>
                         
                                {
                                    item.more.map((item2) => {
                                        return (
                                            <div key={item2.list} className={style.menuList} onClick={() => {
                                                setOverlayCollapse(true)
                                                setOverlay({product : item.product, list:item2.list, price:item2.price})
                                            }}>
                                                <h4>{item2.list}</h4>
                                                <p className={style.price}>{item2.price} R</p>
                                            </div>
                                        )
                                    })
                                }

                            </Item>
                        </Grid> 
                    ))
                }
            </Grid>
        </Box>

        { overlayCollapse && 
            <div className={style.overlay}>
                {
                    overlay && 

                    <div>
                        <h1>{overlay.product}</h1>
                        <p>{overlay.list}</p>
                        <p>R {overlay.price}</p>

                        <div className={style.button}>
                            <Button 
                                name={'CLOSE'} 
                                click ={() => setOverlayCollapse(false)}
                            />
                        </div>
                    </div>
                }
            </div>
        }
    </Fragment>
  );
}