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

export default function FullWidthGrid() {

    const [ menu, setMenu ] = useState([])
    const [ overlay, setOverlay] = useState(null)
    const [ overlayCollapse, setOverlayCollapse] = useState(false)

    useEffect(() => {

        fetch('/api/menu')
            .then(response => response.json())
            .then(data => {
            setMenu(data.menu)
        })
        
    })

  return (
    <Fragment>     
        <Box  sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                {
                    menu && menu.map((item) => (
                        <Grid xs={12} md={4} s={4} key={item.id}>
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
                                    item.menu && item.menu.map((item2) => {
                                        return (
                                            <div key={item2.id} className={style.menuList} onClick={() => {
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

        { overlayCollapse && overlay &&
            <Overlay 
                price={overlay.price}
                list={overlay.list}
                product={overlay.product}
                click = {() => setOverlayCollapse(false)}
            />
        }
    </Fragment>
  );
}