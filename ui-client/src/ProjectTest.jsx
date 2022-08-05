import React, { useEffect, useState } from "react";
import SubTaskComp from "./components/SubTaskComp";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Button, Group } from "@mantine/core";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Slider from "@mui/material/Slider";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  Center,
  ColorInput,
  MantineProvider,
  Space,
  Textarea,
  TextInput,
} from "@mantine/core";
import NotesIcon from "@mui/icons-material/Notes";
import { Select } from "@mantine/core";

const ProjectTest = () => {
  //const [open, setOpen] = React.useState(false);
  const [opened, setOpened] = useState(false);
  const handleOpen = () => setOpened(true);
  const handleClose = () => setOpened(false);

  function valuetext(value) {
    return `${value}%`;
  }

  const [category, setCategory] = useState("");
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const [description, setDescription] = useState("");
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const [color, setColor] = useState("");

  const [status, setStatus] = useState("");
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const [members, setMembers] = useState("");
  const handleMembersChange = (event) => {
    setMembers(event.target.value);
  };
  const [complete, setComplete] = useState("");
  const handleCompleteChange = (event) => {
    setComplete(event.target.value);
  };

  const [date, setDate] = useState("");
  const [deadline, setDeadline] = useState("");

  const location = useLocation();
  const pId = "6283aea3c0ccff2faf5c9dda";
  const tId = "629499eaf09387747e3449ed";

  const addSubTask = (e) => {
    e.preventDefault();
    const subTask = {
      category: category,
      description: description,
      color: color,
      status: status,
      members: members,
      complete: parseInt(complete),
      date: date,
      deadline: deadline,
      pId: pId,
      tId: tId,
    };
    console.log(JSON.stringify(subTask));
    fetch("http://localhost:8080/api/subTask", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(subTask),
    }).then(() => {
      console.log("New SubTask added");
      window.location.reload(false);
      handleClose();
    });
  };

  const apiAllData =
    "http://localhost:8080/api/subTask/" + "t629499eaf09387747e3449ed";

  const [gets, setGets] = useState([]);

  useEffect(() => {
    console.log("here");
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(apiAllData);
    setGets(data);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container textAlign="center" spacing={2}>
        <Grid item md={2.4} xs={12}>
          <h1>
            SubTask 1
            <IconButton
              onClick={handleOpen}
              color="primary"
              aria-label="upload picture"
              component="span"
              size="small"
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </h1>
          {gets.map((get, index) => {
            if (get.category === "category1")
              return (
                <SubTaskComp
                  key={get.id}
                  id={get.id}
                  category={get.category}
                  description={get.description}
                  color={get.color}
                  status={get.status}
                  members={get.members}
                  complete={get.complete}
                  pId={get.pId}
                  tId={get.tId}
                />
              );
          })}
          <br />
        </Grid>
        <Grid item md={2.4} xs={12}>
          <h1>
            SubTask 2
            <IconButton
              onClick={handleOpen}
              color="primary"
              aria-label="upload picture"
              component="span"
              size="small"
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </h1>
          {gets.map((get, index) => {
            if (get.category === "category2")
              return (
                <SubTaskComp
                  key={get.id}
                  id={get.id}
                  category={get.category}
                  description={get.description}
                  color={get.color}
                  status={get.status}
                  members={get.members}
                  complete={get.complete}
                  pId={get.pId}
                  tId={get.tId}
                />
              );
          })}
        </Grid>
        <Grid item md={2.4} xs={12}>
          <h1>
            SubTask 3
            <IconButton
              onClick={handleOpen}
              color="primary"
              aria-label="upload picture"
              component="span"
              size="small"
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </h1>
          {gets.map((get, index) => {
            if (get.category === "category3")
              return (
                <SubTaskComp
                  key={get.id}
                  id={get.id}
                  category={get.category}
                  description={get.description}
                  color={get.color}
                  status={get.status}
                  members={get.members}
                  complete={get.complete}
                  pId={get.pId}
                  tId={get.tId}
                />
              );
          })}
        </Grid>
        <Grid item md={2.4} xs={12}>
          <h1>
            SubTask 4
            <IconButton
              onClick={handleOpen}
              color="primary"
              aria-label="upload picture"
              component="span"
              size="small"
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </h1>
          {gets.map((get, index) => {
            if (get.category === "category4")
              return (
                <SubTaskComp
                  key={get.id}
                  id={get.id}
                  category={get.category}
                  description={get.description}
                  color={get.color}
                  status={get.status}
                  members={get.members}
                  complete={get.complete}
                  pId={get.pId}
                  tId={get.tId}
                />
              );
          })}
        </Grid>
        <Grid item md={2.4} xs={12}>
          <h1>
            SubTask 5
            <IconButton
              onClick={handleOpen}
              color="primary"
              aria-label="upload picture"
              component="span"
              size="small"
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </h1>
          {gets.map((get, index) => {
            if (get.category === "category5")
              return (
                <SubTaskComp
                  key={get.id}
                  id={get.id}
                  category={get.category}
                  description={get.description}
                  color={get.color}
                  status={get.status}
                  members={get.members}
                  complete={get.complete}
                  pId={get.pId}
                  tId={get.tId}
                />
              );
          })}
        </Grid>
      </Grid>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="New SubTask"
      >
        <Select
          label="Choose the Category"
          placeholder="Pick one"
          data={[
            { value: "category1", label: "Category 1" },
            { value: "category2", label: "Category 2" },
            { value: "category3", label: "Category 3" },
            { value: "category4", label: "Category 4" },
            { value: "category5", label: "Category 5" },
          ]}
          onChange={setCategory}
        />
        <br />
        <Textarea
          placeholder="What are we up to?"
          label="Task Description"
          autosize
          defaultValue={description}
          minRows={6}
          onChange={handleDescriptionChange}
        />
        <br />
        <ColorInput
          format="hex"
          swatches={["#0e9bb4", "#e60000", "#17c431", "#f2ee0d", "#d71d96"]}
          value={color}
          onChange={setColor}
        />
        <br />
        <TextInput
          label="Status"
          placeholder="Your email"
          defaultValue={status}
          onChange={handleStatusChange}
        />
        <br />
        <Center>
          <IconButton aria-label="upload picture" component="span">
            <AccountCircleIcon sx={{ fontSize: 35 }} />
          </IconButton>
          <Space w="30%" />
          <IconButton aria-label="upload picture" component="span">
            <NotesIcon sx={{ fontSize: 35 }} />
          </IconButton>
        </Center>
        <br />
        <Slider
          defaultValue={complete}
          marks={[
            { value: 20, label: "20%" },
            { value: 50, label: "50%" },
            { value: 80, label: "80%" },
          ]}
          onChange={handleCompleteChange}
        />
        <br />
        <br />
        <Center>
          <Button variant="outline" text color="green" onClick={addSubTask}>
            Apply
          </Button>
        </Center>
      </Modal>
    </Box>
  );
};
export default ProjectTest;
