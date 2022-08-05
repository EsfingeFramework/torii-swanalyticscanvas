import React,{useState, Component} from "react";
import {Button, Center, Modal, MultiSelect, Space, Text, Textarea, TextInput, Title} from "@mantine/core";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import IconButton from "@mui/material/IconButton";
import {DatePicker} from "@mantine/dates";
import NotesIcon from "@mui/icons-material/Notes";
import axios from "axios";

const Friends = () => {
    const [friends, setFriends] = useState(JSON.parse(sessionStorage.getItem('friends')));
    const [opened, setOpened] = useState(false);
    const [friend, setFriend] = useState("");

    const id = sessionStorage.getItem('id')
    const username = sessionStorage.getItem('username')
    const password = sessionStorage.getItem('password')

    const update = () =>{
        const tempFriends = [...friends];
        tempFriends.push(friend)
        setFriends(tempFriends);
        //setFriends([...friends,friend]);
        //const temp = [...friends]
        console.log(tempFriends,friend,"items")
        updateUser(id,username,password,tempFriends);
        fetchData(friend);
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
        const {data} = await axios.get("http://localhost:8080/api/user/"+username);
        const tempFriends = data.friends;
        tempFriends.push(sessionStorage.getItem('username'))
        console.log("checking the friend: "+data.id,username,data.password,tempFriends);
        updateUser(data.id,username,data.password,tempFriends);
    }

    return (
        <div>
            <Center>
                <Title>
                    Friends List
                </Title>
                <Space w="md" />
                <IconButton aria-label="upload picture" component="span" onClick={() => {setOpened(true)}}>
                    <PersonAddIcon style={{color:"white"}} fontSize="large"/>
                </IconButton>
            </Center>
            <Text align="center">
                {friends.map((value) =>
                        <Text>{value}</Text>
                )}
            </Text>
            <Center>
                <TextInput
                    placeholder="SuperPenguin44"
                    label="Username"
                    value={friend}
                    onChange={e=> setFriend(e.target.value)}
                />
            </Center>
            <br/>
            <Center>
                <Button variant="outline" text color="green" onClick={()=>{update()}}>
                    Add
                </Button>
            </Center>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Add Friend"
            >
                <Center>
                    <TextInput
                        placeholder="SuperPenguin44"
                        label="Username"
                        value={friend}
                        onChange={e=> setFriend(e.target.value)}
                    />
                </Center>
                <br/>
                <Center>
                    <Button variant="outline" text color="green" onClick={()=>{update()}}>
                        Add
                    </Button>
                </Center>
            </Modal>
        </div>
    );

}

export default Friends;
