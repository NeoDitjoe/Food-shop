import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import style from 'styles/grid.module.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function FullWidthGrid() {

    // const [ menu, setMenu ] = useState([])

    // useEffect(() => {

    //     fetch('/api/menu')
    //         .then(response => response.json())
    //         .then(data => {
    //         setMenu(data.menu)
    //     })
        
    // }, [])

    const menu = [
        {work: 'Chips', more: [
            {price: ' R20.00', list: 'small'},
            {price: ' R60.00', list: 'large'},
            {price: ' R40.00', list: 'medium'}
        ]},

        {work: 'Egg bread Sandwiche',  more: [
            {price: 'R 8.80', list: '2 slice'},
            {price: 'R 12.80', list: '3 slice'},
            {price: 'R 14.80', list: '4 slice'},
            {price: 'R 16.80', list: '6 slice'},
        ]},

        {work: 'Sphathlo',  more: [
            {price: 'R 35.90',list: 'Russion and cheese'},
            {price: 'R 35.90', list: 'Russion, cheese and latice Russion, cheese and latice'},
            {price: 'R 35.90', list: 'vienna and polony'},
            {price: 'R 35.90', list: 'Russion Vienna'}
        ]},
        {work: 'Burger',  more: [
            {price: 'R 79.99', list: 'Cheese Burger'},
            {price: 'R 79.99', list: 'Chicken Burger'},
            {price: 'R 79.99', list: 'Beef Burger'},
            {price: 'R 79.99', list: 'Ribs Burger'}
        ]},
        {work: 'Drinks/ Bevs', more: [
            { price: 'R19.99', list: ' 500ml Straberry Milkshake'},
            { price: 'R24.90', list: '2l Cold drink'},
            { price: 'R15.90', list: '500ml Slush'}
        ]}
    ]

  return (
    <React.Fragment>     
        <Box  sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                {
                    menu && menu.map((item) => (
                        <Grid xs={12} md={4} s={4} key={item.work}>
                            <Item>
                                <Image 
                                    // src={item.image} 
                                    src={'next.svg'} 
                                    alt='image' 
                                    width={300} 
                                    height={200} 
                                />
                                <h2>{item.work}</h2>
                         
                                {
                                    item.more.map((item2) => {
                                        return (
                                            <div key={item2.list} className={style.menuList}>
                                                <h4>{item2.list}</h4>
                                                <p className={style.price}>{item2.price}</p>
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
    </React.Fragment>
  );
}
