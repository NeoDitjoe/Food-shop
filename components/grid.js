import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function FullWidthGrid() {

    const [ menu, setMenu ] = useState([])

    useEffect(() => {

        fetch('/api/menu')
            .then(response => response.json())
            .then(data => {
            setMenu(data.menu)
            console.log(data.menu);
        })
        
    }, [])

    useEffect(() => {
        console.log(menu.map(item => {
            return <div key={item.work}> <p>{item.work}</p></div>
        }));
    }, [menu]);

  return (
    <React.Fragment>     
        <Box  sx={{ flexGrow: 1 }}>
            <Grid container spacing={0.2}>
                {
                    menu.map((item)=>(
                        <Grid xs={12} md={4} s={4} key={item.work}>
                            <Item><h1>{item.work}</h1></Item>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    </React.Fragment>
  );
}
