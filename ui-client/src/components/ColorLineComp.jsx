import React from "react";
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Button } from "@mui/material";
import Box from '@mui/material/Box';

const ColorLineComp = () =>{

    const [color, setColor] = React.useState('blue');
    const handleChange = (event) => {
    setColor(event.target.value);
  };
  

    return(
        <div>
            <div>
                <Divider style={{backgroundColor:color,borderBottomWidth: 10}} variant="middle" />
            </div>
            <br/>
            <div>
            <InputLabel id="standard-basic" style={{width:100}}>{color}</InputLabel>
            <Select
                labelId="id"
                id="demo-simple-select"
                value={color}
                label="Cathegory"
                onChange={handleChange}
            >
                <MenuItem value={'blue'}>Blue</MenuItem>
                <MenuItem value={'red'}>Red</MenuItem>
                <MenuItem value={'yellow'}>Yellow</MenuItem>
            </Select>
            </div>
            
        </div>
        );
}
export default ColorLineComp;