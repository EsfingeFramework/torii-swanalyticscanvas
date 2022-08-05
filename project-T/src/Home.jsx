import React from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {useNavigate} from "react-router-dom"


const Home = () =>{

    let navigate = useNavigate();
    function routeChange(temp) {
        if(temp === 0){
            navigate("/subtasks");
        } 
        else if (temp === 1) {
            navigate("/home");
        } 
        else {
            navigate("*");
          }
    }


    return(
        
        <Box sx={{ flexGrow: 1 }}>
            <Grid container textAlign="center" style={{marginTop:"2%"}} spacing={2}>
                <Grid item xs={4}>
                    <Button onClick={() => routeChange(0)} variant="outlined">SubTasks Page</Button>
                </Grid>
                <Grid justify="center" item xs={4}>
                    <Button onClick={() => routeChange(1)} variant="outlined">Home Page</Button>
                </Grid>
                <Grid justify="center" item xs={4}>
                    <Button onClick={() => routeChange(2)} variant="outlined">404 Page</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;