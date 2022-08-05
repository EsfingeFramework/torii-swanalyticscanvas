import React, {useEffect, useState} from "react";
import {Button, Center, Text, TextInput, Box, PasswordInput} from '@mantine/core';
import Grid from "@mui/material/Grid";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = () =>{

    const[username, setUsername] = React.useState("");
    const[password, setPassword] = React.useState("");



    let navigate = useNavigate();
    function routeChange(page) {
        navigate(page);
    }

    useEffect(() => {
        console.log("checking the state of the sessiona variable")
        if(sessionStorage.getItem("username")!=null){
            routeChange("/projects")
        }
    })

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"username":username,"password":password})
    };

    const getUser = (e) => {
        console.log("trying...")
        e.preventDefault()
        fetch('http://localhost:8080/auth/auth', requestOptions)
            .then(response => response.json())
            .then(data => printout(data.username));
    }

    const [gets, setGets] = useState([])
    const fetchData = async (username) => {
        const {data} = await axios.get("http://localhost:8080/api/user/"+username);
        sessionStorage.setItem('id',data.id)
        sessionStorage.setItem('username',data.username)
        sessionStorage.setItem('password',data.password)
        sessionStorage.removeItem('friends')
        sessionStorage.setItem('friends',JSON.stringify(data.friends))
        //console.log(data.friends)
        //console.log(sessionStorage.getItem('friends'))
        window.location.reload(false);
        setGets(data)
    }

    function printout(username){
        fetchData(username)
    }

    return(
        <div>
            <Grid container>
                <Grid item md={1} xs={12}>

                </Grid>
                <Grid item md={3} xs={12} style={{marginLeft:"10%",marginRight:"10%", marginTop:"14.5%"}}>
                    <Box
                        sx={(theme) => ({
                            backgroundColor: theme.colorScheme === 'dark' ? "#616161" : theme.colors.gray[0],
                            textAlign: 'center',
                            padding: theme.spacing.xl,
                            borderRadius: theme.radius.md,
                        })}
                    >
                        <TextInput
                            placeholder="Username"
                            label="Username"
                            style={{marginBottom:"4%"}}
                            onChange={(event) => setUsername(event.currentTarget.value)}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Change visibility toggle icon"
                            defaultValue=""
                            style={{marginBottom:"4%"}}
                            onChange={(event) => setPassword(event.currentTarget.value)}
                        />
                        <Center>
                            <Button variant="outline" text color="green" onClick={getUser}>
                                Log In
                            </Button>
                        </Center>
                    </Box>
                </Grid>
                <Grid item md={5} xs={12}>
                    <svg width="100%" height="100%" viewBox="0 0 2084 2084" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsSerif="http://www.serif.com/" style={{fillRule:"evenodd", clipRule:"evenodd", strokeLinejoin:"round", strokeMiterlimit:"2"}}>
                        <g transform="matrix(4.16667,0,0,4.16667,-4788.52,-41563.1)">
                            <g id="Artboard3" transform="matrix(0.901876,0,0,0.901876,858.635,1638.01)">
                                <rect x="322.23" y="9244.23" width="554.4" height="554.4" style={{fill:"none"}}/>
                                <g transform="matrix(1.55173,0,0,1.55173,-4891.38,-711.16)">
                                    <path d="M3538.51,6479.5L3637.93,6536.9L3637.93,6651.7L3538.51,6709.1L3439.09,6651.7L3439.09,6536.9L3538.51,6479.5ZM3538.51,6485.73L3632.53,6540.02C3632.53,6540.02 3632.53,6648.58 3632.53,6648.58C3632.53,6648.58 3538.51,6702.87 3538.51,6702.87C3538.51,6702.87 3444.48,6648.58 3444.48,6648.58C3444.48,6648.58 3444.48,6540.02 3444.48,6540.02C3458.65,6531.84 3524.34,6493.91 3538.51,6485.73L3538.51,6485.73Z" style={{fill:"white"}}/>
                                </g>
                                <g transform="matrix(3.59754e-17,-0.587523,1.27074,7.78101e-17,-1412.49,10588.8)">
                                    <rect x="1946.3" y="1501.7" width="26.421" height="163.13" style={{fill:"white"}}/>
                                </g>
                                <g transform="matrix(1.1088,0,0,1.1088,-1444.04,6863.65)">
                                    <path d="M1924.52,2339.7L1761.39,2339.7L1761.39,2353.7L1823.19,2353.7L1823.19,2516.82L1837.19,2516.82L1837.19,2353.7L1850.72,2353.7L1850.72,2516.82L1864.72,2516.82L1864.72,2353.7L1924.52,2353.7L1924.52,2339.7Z" style={{fill:"white"}}/>
                                </g>
                            </g>
                        </g>
                    </svg>
                </Grid>

            </Grid>
        </div>

    );
}
export default Login;