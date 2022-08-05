import React, {useState} from "react";
import {Avatar, Button, Center, Divider, ScrollArea, Text, TextInput} from "@mantine/core";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import Grid from "@mui/material/Grid";

const UserInListComponent = () => {

    const [friend, setFriend] = useState("");
    const [error, setError] = useState(false);
    const id = sessionStorage.getItem('id')
    const username = sessionStorage.getItem('username')
    const password = sessionStorage.getItem('password')

    let openFriends;
    try{
        console.log("inside TRY");
        if(JSON.parse(sessionStorage.getItem('friends')) == null) {
            openFriends = [];
        }
        else
            openFriends = JSON.parse(sessionStorage.getItem('friends'));


    } catch (Error){
        console.log("inside CATCH" + Error);
    }
    const [friends, setFriends] = useState(openFriends);
    console.log("friends: "+friends);


    //------------------------------------USER UPDATE -------------------------------------------
    const update = () =>{
        const tempFriends = [...friends];
        tempFriends.push(friend)
        setFriends(tempFriends);
        fetchData(friend);
        updateUser(id, username, password, tempFriends);
        updateSession(tempFriends);
    }

    const updateUser = (uId,uUsername,uPassword,uNewFriends) =>{
        const user={"id":uId,"username":uUsername,"password":uPassword,"friends":uNewFriends}
        console.log(JSON.stringify(user))
        fetch("http://localhost:8080/api/user",{
            method: "PUT",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(user)}).then(()=> {
            console.log("User Updated")
            //updateSession(newFriends)
        })
    }

    const updateSession = (newFriends) =>{
        sessionStorage.removeItem('friends')
        sessionStorage.setItem('friends', JSON.stringify(newFriends))
        //window.location.reload(false);
    }
    const fetchData = async (username) => {
        try{
            const {data} = await axios.get("http://localhost:8080/api/user/"+username)
            const tempFriends = data.friends;
            tempFriends.push(sessionStorage.getItem('username'))
            console.log("checking the friend: " + data.id, username, data.password, tempFriends);
            updateUser(data.id, username, data.password, tempFriends);
        } catch (error) {
            setError((o) => !o)
        }
    }
    //------------------------------------CLOSE USER UPDATE -------------------------------------------
    return(
        <div>
            <ScrollArea style={{ height: 250 }}>
                {friends.map((value) => {
                    return (
                        <div>
                            <Grid container>
                                <Grid item md={4} align="right">
                                    <Avatar src={null} color="cyan" size="sm" align="right" style={{marginBottom:"2%",marginRight:"10%"}}></Avatar>
                                </Grid>
                                <Grid item md={4} align="left">
                                    <Text size="lg">{value}</Text>
                                </Grid>
                                <Grid item md={4}>
                                    <IconButton style={{color:"red"}}>
                                        <ClearIcon fontSize="small" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </div>
                    );
                })}
            </ScrollArea>

            <Divider my="sm" />
            <TextInput
                placeholder="SuperPenguin44"
                label="Add Friend"
                onChange={e=> setFriend(e.target.value)}
                style={{marginBottom:"5%", marginTop:"5%"}}
            />
            <Center >
                <Button variant="outline" size="xs" text color="green" onClick={()=>{update()}}>
                    Add
                </Button>
            </Center>
        </div>
    );
}

export default UserInListComponent;