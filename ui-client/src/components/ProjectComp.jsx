import React , {useEffect, useState} from "react";
import {IconButton, TextareaAutosize, TextField} from '@mui/material';
import {useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import {Center, Group, Image, MultiSelect, Space, Textarea, TextInput, Title} from "@mantine/core";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import {Button} from '@mantine/core';
import { Card, Text, Modal} from '@mantine/core';
import SubTaskComp from "./SubTaskComp";

const ProjectComp = (props) => {
    const tasks = "/tasks"
    const pname = props.pname

    const [openedM, setOpenedM] = useState(false);
    const [openedMore, setOpenedMore] = useState(false);
    //const handleClose = () => setOpenedM(false);

    const id = props.id;
    const [projName, setProjName] = React.useState(props.pname);
    const handleProjNameChange = (event) => {
        setProjName(event.target.value);
    };
    const [description, setDescription] = React.useState(props.description);
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const [imgUrl, setImgUrl] = React.useState(props.imgUrl);
    const handleImgUrlChange = (event) => {
        setImgUrl(event.target.value);
    };
    const [friends, setFriends] = useState(JSON.parse(sessionStorage.getItem('friends')));
    const [members, setMembers] = useState(props.members);
    const handleMembersChange = (event) => {
        setMembers(event.target.value);
    };

    let navigate = useNavigate();

    function routeChange(page) {
        navigate(page,{state:{pId:props.id}});
    }
    //console.log(members);
    const updateProject = (e) =>{
        e.preventDefault()
        const project={"id":id, "pname":projName,"description":description,"imgUrl":imgUrl,"members":members}
        console.log(JSON.stringify(project))
        fetch("http://localhost:8080/api/project",{
            method: "PUT",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(project)}).then(()=> {
            window.location.reload(false);
            //handleClose()
        })
    }

    const apiDeleteMainTask = "http://localhost:8080/api/mainTask/project/"+id;
    const apiDeleteSubTasks = "http://localhost:8080/api/subTask/project/"+id;
    const apiDeleteProject = "http://localhost:8080/api/project/"+id;

    const deleteData = () =>{
        alert(id);
        fetchDataToDelete()
    }

    const fetchDataToDelete = async () => {
        await axios.delete(apiDeleteSubTasks)
        await axios.delete(apiDeleteMainTask)
        await axios.delete(apiDeleteProject)
    }

    return(
        <Box sx={{textAlign:"center"}}>
          <Card
                shadow="sm"
                p="xl"
                component="a"
                target="_blank"
                style={{marginLeft:"2%", marginRight:"2%"}}
            >
                <Card.Section style={{cursor: "pointer"}} onClick={() => { routeChange(tasks) }}>
                    <Image src={imgUrl} height={160} />
                    <Title style={{marginBottom:"2%", marginTop:"2%"}} order={2} align="center">{pname}</Title>
                </Card.Section>
                <Card.Section >
                    <Text size="lg" hidden={!openedMore}>
                        {description}
                    </Text>
                </Card.Section>
              <Card.Section>
                  <Group position="apart" spacing="xl">
                      <IconButton style={{color:"white"}} onClick={() => {setOpenedM(true)}}>
                          <EditIcon />
                      </IconButton>
                      <IconButton style={{color:"white"}} onClick={() => setOpenedMore((o) => !o)}>
                          <KeyboardArrowDownIcon />
                      </IconButton>
                      <IconButton style={{color:"red"}} onClick={deleteData}>
                          <DeleteForeverIcon />
                      </IconButton>
                  </Group>
              </Card.Section>
            </Card>

            <Modal
                opened={openedM}
                onClose={() => setOpenedM(false)}
                title="Edit Project"
            >
                <TextInput
                    placeholder="Penguins on the moon"
                    label="Project name"
                    required
                    value={projName}
                    onChange={handleProjNameChange}
                />
                <br/>
                <Textarea
                    placeholder="Make the world a better place"
                    label="Project Description"
                    autosize
                    minRows={6}
                    value= {description}
                    onChange={handleDescriptionChange}
                />
                <br/>
                <MultiSelect
                    data={friends.map((name) =>(name))}
                    label="Get your Buddies on board"
                    placeholder={members}
                    value={members}
                    onChange={setMembers}
                    searchable
                    clearButtonLabel="Clear selection"
                />
                <br/>
                <TextInput
                    placeholder="Jumping dodos"
                    label="Img-URl"
                    value={imgUrl}
                    onChange={handleImgUrlChange}
                />
                <br/>
                <Center>
                    <Button variant="outline" text color="green" onClick={updateProject}>
                        Apply
                    </Button>
                </Center>
            </Modal>
        </Box>

    );
}

export default ProjectComp;