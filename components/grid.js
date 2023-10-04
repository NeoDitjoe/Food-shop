import React, { Fragment} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import style from 'styles/grid.module.css'
import Overlay from './overlay';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function FullWidthGrid({menu}) {

    const [ overlay, setOverlay] = useState(null)
    const [ overlayCollapse, setOverlayCollapse] = useState(false)

  return (
    <Fragment>     
        <Box  sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                {
                    menu.map((item) => (
                        <Grid xs={12} md={4} s={4} key={item.product}>
                            <Item>
                                <Image 
                                    src={item.image}
                                    alt='image' 
                                    width={500} 
                                    height={250} 
                                    className={style.img}
                                />
                                <h2>{item.product.charAt(0).toUpperCase() + item.product.slice(1)}</h2>

                                {
                                    item.menu && item.menu.map((item2) => {
                                        return (
                                            <div key={item2.item} className={style.menuList} onClick={() => {
                                                setOverlayCollapse(true)
                                                setOverlay({product : item.product, item:item2.item, price:item2.price})
                                            }}>
                                                <h4>{item2.item}</h4>
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

        { overlayCollapse && overlay &&
            <Overlay 
                price={overlay.price}
                item={overlay.item}
                product={overlay.product}
                click = {() => setOverlayCollapse(false)}
                addtoCart = {() => console.log('Add to Cart')}
                orderNow = {() => console.log('Order Now')}
            />
        }

    </Fragment>
  );
}


export function FormsGrid(props){
    return(

        <Fragment>     
        <Box  sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid xs={12} md={6} s={2} >
                    <Item style={{backgroundColor:'transparent'}}> 
                        <h1>Create a new menu</h1>
                        <br/>
                        {props.addMenu}
                    </Item>
                </Grid> 
                <Grid xs={12} md={6} s={2}>
                    <Item style={{backgroundColor:'transparent'}}>
                        <h1>Add more Items to Existing menu</h1>
                        <br/>
                        {props.updateMenu}
                    </Item>
                </Grid> 
                
            </Grid>
        </Box>
    </Fragment>

    )
}