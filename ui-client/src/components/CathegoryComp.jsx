import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

const CathegoryComp = () =>{


  const [cathegory, setCathegory] = React.useState('');
  const handleChange = (event) => {
    setCathegory(event.target.value);
  };

    return(
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="standard-basic">Cathegory</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cathegory}
          label="Cathegory"
          onChange={handleChange}
        >
          <MenuItem value={10}>FrontEnd</MenuItem>
          <MenuItem value={20}>BackEnd</MenuItem>
          <MenuItem value={30}>FullStack</MenuItem>
        </Select>
      </FormControl>
    </Box>
    );
}

export default CathegoryComp;