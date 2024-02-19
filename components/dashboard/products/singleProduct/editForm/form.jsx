import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import style from './form.module.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Form(props) {

  const { editForm } = props

  return (
    <form onSubmit={editForm} action="#" className={style.main}>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid xs={12} md={12} s={2}  >
            <Item>
              <input name="item" placeholder="Item" />
            </Item>
          </Grid>

          <Grid xs={12} md={12} s={2}  >
            <Item>
              <input type='number' name="price" step='0.01' placeholder="price" />
            </Item>

          </Grid>

          <Grid xs={12} md={12} s={2}  >
            <Item style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px'}}>
              <label>Is this a special : </label>
              <input style={{ width: '30px'}} type='checkbox' name="special" />
            </Item>

              <button type="submit">Submit</button>
          </Grid>
          
        </Grid>
      </Box>
    </form>
  );
}


