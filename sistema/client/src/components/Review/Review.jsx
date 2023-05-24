import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  useMediaQuery,
  Box,
  Divider,
} from '@mui/material';
import useData from '../../hooks/useData';
import * as S from './style';

const Review = ({ userValues, addressValues, cardValues }) => {
  const { basket } = useData();
  const down400 = useMediaQuery((theme) => theme.breakpoints.down(400));

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Grozs
      </Typography>
      <List disablePadding>
        {down400
          ? basket.map((item) => (
              <Box
                sx={{ display: 'flex', flexDirection: 'column' }}
                key={item.product.preces_id}
              >
                <ListItem
                  sx={{
                    py: 1,
                    px: 0,
                  }}
                >
                  <S.StyledImg src={item.product.attelu_celi[0]} />

                  <ListItemText
                    primary={item.product.nosaukums}
                    secondary={item.desc}
                  />
                </ListItem>
                <ListItemText
                  sx={{ textAlign: 'end' }}
                  primary={(item.product.cena * item.count).toFixed(2) + ' €'}
                  secondary={'x' + item.count}
                />
                <Divider />
              </Box>
            ))
          : basket.map((item) => (
              <div key={item.product.preces_id}>
                <ListItem
                  key={item.product.preces_id}
                  sx={{
                    py: 1,
                    px: 0,
                  }}
                >
                  <S.StyledImg src={item.product.attelu_celi[0]} />

                  <ListItemText
                    primary={item.product.nosaukums}
                    secondary={item.desc}
                  />
                  <ListItemText
                    sx={{ textAlign: 'end' }}
                    primary={(item.product.cena * item.count).toFixed(2) + ' €'}
                    secondary={'x' + item.count}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Kopā apmaksai:" />
          <Typography sx={{ fontWeight: 'bold' }}>
            {basket
              .reduce((sum, item) => sum + item.product.cena * item.count, 0)
              .toFixed(2) + ' €'}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Piegādes adrese
          </Typography>
          <Typography gutterBottom>
            {userValues.vards + ' ' + userValues.uzvards}
          </Typography>
          <Typography gutterBottom>
            {Object.values(addressValues)
              .filter((value) => value != '')
              .join(', ')}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Maksājumu karte
          </Typography>
          <Grid container>
            <Grid item xs={down400 ? 12 : 6}>
              <Typography gutterBottom>Vārds, uzvārds uz kartes</Typography>
            </Grid>
            <Grid item xs={down400 ? 12 : 6}>
              <Typography gutterBottom>{cardValues.vards_uzvards}</Typography>
            </Grid>
            <Grid item xs={down400 ? 12 : 6}>
              <Typography gutterBottom>Kartes numurs</Typography>
            </Grid>
            <Grid item xs={down400 ? 12 : 6}>
              <Typography gutterBottom>
                xxxx-xxxx-xxxx-
                {cardValues.numurs.slice(-4)}
              </Typography>
            </Grid>
            <Grid item xs={down400 ? 12 : 6}>
              <Typography gutterBottom>Derīga līdz</Typography>
            </Grid>
            <Grid item xs={down400 ? 12 : 6}>
              <Typography gutterBottom>
                {cardValues.deriga_lidz.format('MM/YYYY')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Review;
