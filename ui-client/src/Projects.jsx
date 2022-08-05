import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import axios from "axios";
import { Center, MultiSelect, Textarea, TextInput, Title } from "@mantine/core";
import { Button, Modal, Space } from "@mantine/core";
import ProjectComp from "./components/ProjectComp";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  let navigate = useNavigate();
  function routeChange(page) {
    navigate(page);
  }

  useEffect(() => {
    if (sessionStorage.getItem("username") == null) {
      console.log("not logged bro");
    } else fetchData();
  }, []);

  const [openedM, setOpenedM] = useState(false);
  //const handleClose = () => setOpen(false);

  const [projName, setProjName] = React.useState("");
  const handleProjNameChange = (event) => {
    setProjName(event.target.value);
  };
  const [description, setDescription] = React.useState("");
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const [imgUrl, setImgUrl] = React.useState(
    "https://i.redd.it/38aeu51hq3d61.jpg"
  );
  const handleImgUrlChange = (event) => {
    setImgUrl(event.target.value);
  };

  let openFriends;
  try {
    console.log("inside TRY");
    if (JSON.parse(sessionStorage.getItem("friends")) == null) {
      openFriends = [];
    } else openFriends = JSON.parse(sessionStorage.getItem("friends"));
  } catch (Error) {
    console.log("inside CATCH" + Error);
  }
  const [friends, setFriends] = useState(openFriends);
  const [members, setMembers] = useState([sessionStorage.getItem("username")]);

  //console.log("hahahahah" + JSON.parse(sessionStorage.getItem('friends')))
  const addProject = (e) => {
    e.preventDefault();
    const project = {
      pname: projName,
      description: description,
      imgUrl: imgUrl,
      members: members,
    };
    console.log(JSON.stringify(project));
    fetch("http://localhost:8080/api/project", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(project),
    }).then(() => {
      console.log("New SubTask added");
      window.location.reload(false);
    });
  };

  const apiAllData =
    "http://localhost:8080/api/project/" + sessionStorage.getItem("username");
  const [gets, setGets] = useState([]);
  const fetchData = async () => {
    const { data } = await axios.get(apiAllData);
    //console.log(data.pname)
    setGets(data);
  };

  return (
    <div>
      <Center>
        <Typography
          variant="h2"
          component="h2"
          style={{
            marginTop: "2%",
            fontWeight: "bold",
            letterSpacing: 10,
            color: "#02db93",
          }}
        >
          Projects
        </Typography>
      </Center>
      <Center>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          style={{ marginTop: "1%", marginBottom: "3%" }}
          onClick={() => setOpenedM(true)}
        >
          <AddCircleOutlineSharpIcon sx={{ fontSize: 70, color: "#02db93" }} />
        </IconButton>
      </Center>

      <Grid container align="center">
        <Grid item md={2} xs={12}></Grid>
        <Grid item md={8} sm={12} align="center" style={{ marginBottom: "1%" }}>
          <Grid container spacing={3}>
            {gets.map((get, index) => {
              return (
                <Grid item md={4} xs={12} align="center">
                  <ProjectComp
                    key={get.id}
                    id={get.id}
                    pname={get.pname}
                    description={get.description}
                    imgUrl={get.imgUrl}
                    members={get.members}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item md={2} xs={12}></Grid>
      </Grid>

      <Modal
        opened={openedM}
        onClose={() => setOpenedM(false)}
        title="New Project"
      >
        <TextInput
          placeholder="Penguins on the moon"
          label="Project name"
          required
          value={projName}
          onChange={handleProjNameChange}
        />
        <br />
        <Textarea
          placeholder="Make the world a better place"
          label="Project Description"
          autosize
          minRows={6}
          value={description}
          onChange={handleDescriptionChange}
        />
        <br />
        <MultiSelect
          data={friends.map((name) => name)}
          label="Get your Buddies on board"
          placeholder={members}
          value={members}
          onChange={setMembers}
          searchable
          clearButtonLabel="Clear selection"
        />
        <br />
        <TextInput
          placeholder="Jumping crocodiles"
          label="Img-URl"
          value={imgUrl}
          onChange={handleImgUrlChange}
        />
        <br />
        <Center>
          <Button variant="outline" text color="green" onClick={addProject}>
            Create
          </Button>
        </Center>
      </Modal>
    </div>
  );
};

export default Projects;
