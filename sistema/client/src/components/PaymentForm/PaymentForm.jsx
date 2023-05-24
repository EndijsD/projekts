import { Typography, Grid, TextField, useMediaQuery } from '@mui/material';
import {
  LocalizationProvider,
  DesktopDatePicker,
  MobileDatePicker,
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { textMarshal } from 'text-marshal';

const PaymentForm = ({ cardValues, setCardValues }) => {
  const downSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleFormInputChange = (e) => {
    if (moment.isMoment(e)) {
      setCardValues({
        ...cardValues,
        deriga_lidz: e,
      });
    } else {
      const { name, value } = e.target;

      setCardValues({
        ...cardValues,
        [name]: value,
      });
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Maksājumu karte
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="Vārds, uzvārds uz kartes"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            name="vards_uzvards"
            value={cardValues.vards_uzvards}
            onChange={handleFormInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="Kartes numurs"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            name="numurs"
            placeholder="0000 0000 0000 0000"
            inputProps={{
              pattern: '[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}',
            }}
            onInput={(e) => {
              e.target.value = textMarshal({
                input: e.target.value,
                template: 'xxxx xxxx xxxx xxxx',
                disallowCharacters: [/\D/g],
              }).marshaltext;
            }}
            value={cardValues.numurs}
            onChange={handleFormInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            {downSmall ? (
              <MobileDatePicker
                views={['month', 'year']}
                format="MM-YYYY"
                value={cardValues.deriga_lidz}
                onChange={handleFormInputChange}
                slotProps={{
                  textField: {
                    label: 'Derīga līdz',
                    required: true,
                    fullWidth: true,
                    autoComplete: 'cc-exp',
                    variant: 'standard',
                  },
                }}
              />
            ) : (
              <DesktopDatePicker
                views={['month', 'year']}
                format="MM-YYYY"
                value={cardValues.deriga_lidz}
                onChange={handleFormInputChange}
                slotProps={{
                  textField: {
                    label: 'Derīga līdz',
                    required: true,
                    fullWidth: true,
                    autoComplete: 'cc-exp',
                    variant: 'standard',
                  },
                }}
              />
            )}
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="CVV"
            helperText="Trīs cipari kartes aizmugurē"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            name="cvv"
            placeholder="000"
            inputProps={{
              pattern: '[0-9]{3}',
            }}
            onInput={(e) => {
              e.target.value = textMarshal({
                input: e.target.value,
                template: 'xxx',
                disallowCharacters: [/\D/g],
              }).marshaltext;
            }}
            value={cardValues.cvv}
            onChange={handleFormInputChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentForm;
