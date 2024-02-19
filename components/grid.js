import React, { Component, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import Image from 'next/image';
import style from 'styles/grid.module.css'
import Overlay from './overlay';
import StateContext from '@/usecontext/stateContext';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: 'transparent',
    boxShadow: 'none',
}));


/**
 * 
 * @param {String} menu - Menu is a prop, which is defined in the main index file 
 * {@link menu } props carries the data that will be mapped over.
 *  
 * @returns {Component} 
 * {@link Box} is a components from material UI, which structure how the front page menu will be displayed.
 */
export default function FullWidthGrid({ menu }) {

    /**
     *Carries the data that will be used on the overlay,
     * which is displayed from a component that is imported {@link Overlay}
     */
    const [overlay, setOverlay] = useState(null)

    //hiddes and/or displays the add order overlay
    const { overlayCollapse, setOverlayCollapse } = StateContext()

    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    {
                        menu && menu.map((item) => (
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
                                                    setOverlay({ product: item.product, item: item2.item, price: item2.price, img: item.image })
                                                }}>
                                                    <h4>{item2.item}</h4>
                                                    <p className={style.price}>{Number(item2.price).toFixed(2)} R</p>
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

            {overlayCollapse && overlay &&
                <Overlay
                    img={overlay.img}
                    price={overlay.price}
                    item={overlay.item}
                    product={overlay.product}
                    click={() => setOverlayCollapse(false)}
                    orderNow={() => alert('Feature is being updated')}
                />
            }

        </Fragment>
    );
}

/**
 * 
 * @param {Prop} props
 * This component is used in the dashboard
 * mainly for responsive puposes.
 * 
 */
export function FormsGrid(props) {
    return (

        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid xs={12} md={12} s={2} >
                        <Item style={{ backgroundColor: 'rgba(128, 128, 128, 0.22)', marginTop: '10px' }}>
                            <h1>Create a new menu</h1>
                            <br />
                            {props.addMenu}
                        </Item>
                    </Grid>

                </Grid>
            </Box>
        </Fragment>

    )
}