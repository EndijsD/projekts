import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import DataItem from '../DataItem';
import { useState } from 'react';

const DataAccordion = ({ about }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Accordion
      expanded={isExpanded}
      onChange={() => setIsExpanded((prev) => !prev)}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{about.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <DataItem link={about.link} canAdd={about.canAdd} />
      </AccordionDetails>
    </Accordion>
  );
};

export default DataAccordion;
