import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import * as S from './style';

const AddressForm = ({
  userValues,
  setUserValues,
  addressValues,
  setAddressValues,
  problem,
}) => {
  const handleFormInputChange = (e) => {
    const { name, value } = e.target;

    userValues.hasOwnProperty(name)
      ? setUserValues({
          ...userValues,
          [name]: value,
        })
      : setAddressValues({
          ...addressValues,
          [name]: value,
        });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Maksātāja informācija
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Vārds"
            variant="standard"
            name="vards"
            value={userValues.vards}
            onChange={handleFormInputChange}
            required
            autoComplete="true"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Uzvārds"
            variant="standard"
            name="uzvards"
            value={userValues.uzvards}
            onChange={handleFormInputChange}
            required
            autoComplete="true"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tālrunis"
            variant="standard"
            type="tel"
            name="talrunis"
            value={userValues.talrunis}
            onChange={handleFormInputChange}
            required
            autoComplete="true"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="E-pasts"
            variant="standard"
            type="email"
            name="epasts"
            value={userValues.epasts}
            onChange={handleFormInputChange}
            required
            autoComplete="true"
            fullWidth
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: '2rem' }}>
        Piegādes adrese <S.Info>(minimums aizpildīt 4. laukus)</S.Info>
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Pasta indekss"
            variant="standard"
            name="pasta_indekss"
            value={addressValues.pasta_indekss}
            onChange={handleFormInputChange}
            required
            autoComplete="true"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Pilsēta"
            variant="standard"
            name="pilseta"
            value={addressValues.pilseta}
            onChange={handleFormInputChange}
            error={problem == 'adr' && !addressValues.pilseta}
            autoComplete="true"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Novads"
            variant="standard"
            name="novads"
            value={addressValues.novads}
            onChange={handleFormInputChange}
            error={problem == 'adr' && !addressValues.novads}
            autoComplete="true"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Pagasts"
            variant="standard"
            name="pagasts"
            value={addressValues.pagasts}
            onChange={handleFormInputChange}
            error={problem == 'adr' && !addressValues.pagasts}
            autoComplete="true"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Iela"
            variant="standard"
            name="iela"
            value={addressValues.iela}
            onChange={handleFormInputChange}
            error={problem == 'adr' && !addressValues.iela}
            autoComplete="true"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Mājas nosaukums"
            variant="standard"
            name="majas_nos"
            value={addressValues.majas_nos}
            onChange={handleFormInputChange}
            error={problem == 'adr' && !addressValues.majas_nos}
            autoComplete="true"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Dzīvokļa numurs"
            variant="standard"
            name="dzivokla_nr"
            value={addressValues.dzivokla_nr}
            onChange={handleFormInputChange}
            error={problem == 'adr' && !addressValues.dzivokla_nr}
            autoComplete="true"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox checked disabled />}
            label="Piegādes adrese sakrīt ar maksātāja adresi"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddressForm;
