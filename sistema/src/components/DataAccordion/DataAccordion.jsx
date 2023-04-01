import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import DataItem from '../DataItem';

const DataAccordion = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Visi pasūtījumi</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <DataItem />
      </AccordionDetails>
    </Accordion>
  );
};

export default DataAccordion;
