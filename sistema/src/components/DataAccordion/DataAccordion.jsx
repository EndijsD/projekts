import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import DataItem from '../DataItem';

const DataAccordion = ({ about }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{about.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <DataItem link={about.link} />
      </AccordionDetails>
    </Accordion>
  );
};

export default DataAccordion;
