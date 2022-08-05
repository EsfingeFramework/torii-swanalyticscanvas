import React, { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import {
  Modal,
  Button,
  Group,
  Textarea,
  TextInput,
  Space,
  Center,
  ColorInput,
  MultiSelect,
  RingProgress,
  Badge,
} from "@mantine/core";
import Divider from "@mui/material/Divider";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Slider from "@mui/material/Slider";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import NotesIcon from "@mui/icons-material/Notes";
import { Select } from "@mantine/core";
import { MantineProvider } from "@mantine/core";
import { Grid } from "@mantine/core";
import { Card, Text } from "@mantine/core";
import { Title } from "@mantine/core";
import { Avatar, AvatarsGroup } from "@mantine/core";
import { Progress } from "@mantine/core";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import subTasks from "../SubTasks";
import AddIcon from "@mui/icons-material/Add";
import ToDoComp from "./ToDoComp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const SubTaskComp = (props) => {
  const id = props.id;

  //const [open, setOpen] = React.useState(false);
  const [opened, setOpened] = useState(false);
  const [openedAdd, setOpenedAdd] = useState(false);
  const [openedNext, setOpenedNext] = useState(false);
  const [openedDetails, setOpenedDetails] = useState(false);
  const handleOpen = () => setOpened(true);
  const handleOpenAdd = () => setOpenedAdd(true);
  const handleOpenNext = () => setOpenedNext(true);
  const handleClose = () => setOpened(false);

  const [category, setCategory] = React.useState(props.category);
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const [parentDescription, setParentDescription] = useState(props.description);
  const [description, setDescription] = React.useState(props.description);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const [color, setColor] = React.useState(props.color);
  const handleColorChange = (event) => {
    setColor(event.target.value);
  };
  const [status, setStatus] = React.useState(props.status);
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const [members, setMembers] = React.useState(props.members);
  const handleMembersChange = (event) => {
    setMembers(event.target.value);
  };
  const [complete, setComplete] = React.useState(props.complete);
  const handleCompleteChange = (event) => {
    setComplete(event.target.value);
  };
  const [connected, setConnected] = React.useState(props.connected);
  const [connFlag, setConnFlag] = React.useState(props.connFlag);
  const [connPrev, setConnprev] = React.useState(props.connPrev);
  const [creator, setCreator] = React.useState(props.creator);

  const [toDo, setToDo] = useState({});

  let next = category;
  let prev = category;
  const nextCat = () => {
    if (category === "tools") {
      next = "highlights";
      return next;
    } else if (category === "highlights") {
      next = "insights";
      return next;
    } else if (category === "insights") {
      next = "goals / decisions";
      return next;
    }
  };

  const prevCat = () => {
    if (category === "measurements") {
      prev = "Issue";
      return prev;
    } else if (category === "tools") {
      prev = "Measurement";
      return prev;
    } else if (category === "highlights") {
      prev = "Measurement & Tool";
      return prev;
    } else if (category === "insights") {
      prev = "Highlight";
      return prev;
    } else if (category === "goals") {
      prev = "Insight";
      return prev;
    } else if (category === "decisions") {
      prev = "Insight";
      return prev;
    }
  };

  const pId = props.pId;
  const tId = props.tId;

  const addSubTask = () => {
    const subTask = {
      category: category,
      description: description,
      color: color,
      status: "pending",
      members: members,
      complete: parseInt(complete),
      connected: [],
      connFlag: [],
      connPrev: [parentDescription],
      creator: creator,
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
    });
  };

  const updateSubTask = () => {
    const subTask = {
      id: id,
      category: category,
      description: description,
      color: color,
      status: status,
      members: members,
      complete: complete,
      connected: connected,
      connFlag: connFlag,
      connPrev: connPrev,
      creator: creator,
      pId: pId,
      tId: tId,
    };
    console.log(JSON.stringify(subTask));
    fetch("http://localhost:8080/api/subTask/", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(subTask),
    }).then(() => {
      console.log("New SubTask added");
      //window.location.reload(false);
      handleClose();
    });
  };

  const updateSubTask2 = (e) => {
    const tempConn = connected;
    tempConn.push(description);
    setConnected(tempConn);
    const tempConnFlag = connFlag;
    tempConnFlag.push(false);
    setConnFlag(tempConnFlag);

    const subTask = {
      id: id,
      category: category,
      description: parentDescription,
      color: color,
      status: status,
      members: members,
      complete: complete,
      connected: tempConn,
      connFlag: tempConnFlag,
      connPrev: connPrev,
      creator: creator,
      pId: pId,
      tId: tId,
    };
    console.log(JSON.stringify(subTask));
    fetch("http://localhost:8080/api/subTask/", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(subTask),
    }).then(() => {
      console.log("New SubTask added");
      window.location.reload(false);
      handleClose();
    });
  };

  const updateStatus = (reload) => {
    let tempStatus = status;
    tempStatus = "No Pendency";
    const subTask = {
      id: id,
      category: category,
      description: parentDescription,
      color: color,
      status: tempStatus,
      members: members,
      complete: complete,
      connected: connected,
      connFlag: connFlag,
      connPrev: connPrev,
      creator: creator,
      pId: pId,
      tId: tId,
    };
    console.log(JSON.stringify(subTask));
    fetch("http://localhost:8080/api/subTask/", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(subTask),
    }).then(() => {
      console.log("New SubTask added");
      if (reload === true) {
        window.location.reload(false);
      }
      handleClose();
    });
  };

  const apiDeleteTask = "http://localhost:8080/api/subTask/" + id;

  const deleteData = () => {
    console.log("here");
    fetchData();
  };

  const fetchData = async () => {
    await axios.delete(apiDeleteTask);
  };
  const apiOtherTasks = "http://localhost:8080/api/subTask/" + tId;
  const [getTsks, setGetTsks] = useState([]);

  const fetchTasks = async () => {
    const { data } = await axios.get(apiOtherTasks);

    for (var i = 0; i < data.length; i++) {
      if (data[i] === description) {
        data.splice(i, 1);
        console.log("in the foooooooooooor lop");
      }
    }
    setGetTsks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openModal = (parentD) => {
    setParentDescription(parentD);
    setStatus("planned");
    console.log(parentD);
    handleOpenAdd();
  };

  const openNextModal = (pCategory, parentD) => {
    if (status !== "No Pendancy") {
      updateStatus(false);
    }
    if (pCategory === "issue") {
      setCategory("measurements");
    } else if (pCategory === "measurements") {
      setCategory("tools");
    } else if (pCategory === "tools") {
      setCategory("highlights");
    } else if (pCategory === "highlights") {
      setCategory("insights");
    } else if (pCategory === "insights") {
      setCategory("goals");
    }

    setParentDescription(parentD);
    connPrev.push(parentD);
    handleOpenNext();
  };

  const getStatusColor = () => {
    if (status === "No Pendency") {
      return "#37b34e";
    } else if (status === "planned") {
      return "yellow";
    }
    return "#e03131";
  };

  return (
    <div>
      <Card
        shadow="sm"
        p="xl"
        href
        component="a"
        target="_blank"
        style={{
          marginLeft: "4%",
          marginRight: "4%",
          cursor: "pointer",
          marginBottom: "2%",
        }}
      >
        <Card.Section onClick={handleOpen}>
          <Group
            position="apart"
            style={{
              marginBottom: "3%",
              marginLeft: "4%",
              marginRight: "4%",
              marginTop: "3%",
            }}
          >
            <Avatar alt={creator} color="cyan" size="sm">
              {creator.slice(0, 2).toUpperCase()}
            </Avatar>
            <Badge color="teal" size="xs" radius="sm">
              {category}
            </Badge>
            <Text align="center" size="xs" style={{ color: getStatusColor() }}>
              {status}
            </Text>
          </Group>

          <Text
            style={{ marginBottom: "3%", marginLeft: "4%", marginRight: "4%" }}
            align="center"
            weight={500}
            size="lg"
          >
            {description}
          </Text>
          <Progress
            style={{ marginBottom: "3%", marginLeft: "4%", marginRight: "4%" }}
            value={100}
            color={color}
            size="sm"
            radius="xl"
          />
        </Card.Section>
        <Card.Section>
          <div hidden={!openedDetails}>
            <Badge size="lg" radius="sm" style={{ marginTop: "4%" }}>
              Tasks
            </Badge>
            <ToDoComp
              id={id}
              category={category}
              description={description}
              color={color}
              status={status}
              members={members}
              complete={complete}
              creator={creator}
              connected={connected}
              connFlag={connFlag}
              connPrev={connPrev}
              pId={pId}
              tId={tId}
            />
            <Group position="center">
              <IconButton
                onClick={() => {
                  openModal(description);
                }}
                color="primary"
                aria-label="upload picture"
                component="span"
                size="small"
              >
                <AddIcon fontSize="medium" />
              </IconButton>
              <Space w="xl" />
              <IconButton
                hidden={status !== "planned" ? false : true}
                onClick={() => {
                  openNextModal(category, description);
                }}
                color="success"
                aria-label="upload picture"
                component="span"
                size="small"
              >
                <ArrowForwardIcon fontSize="medium" />
              </IconButton>
            </Group>
          </div>
        </Card.Section>

        <Card.Section>
          <Center>
            <IconButton
              style={{ color: "white" }}
              onClick={() => setOpenedDetails((o) => !o)}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </Center>
        </Card.Section>
      </Card>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Details">
        <br />
        {category !== "issue" ? (
          <div>
            <Text size="xl">
              Created because of:{" "}
              <Badge color="teal" radius="sm">
                {prevCat()}
              </Badge>
            </Text>
            <Center>
              <Text size="xl">{connPrev[0]}</Text>
            </Center>
          </div>
        ) : (
          <div></div>
        )}
        <br />
        <Textarea
          placeholder="What are we up to?"
          label="Description"
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

        {/*<Select
                    label="Status"
                    placeholder="status"
                    value={status}
                    data = {[
                        { value: 'pending', label: 'pending'},
                        { value: 'planned', label: 'planned'},
                        { value: 'No Pendency', label: 'No Pendency'},
                    ]}
                    onChange={setStatus}
                />
                <br/>
                <Slider
                    defaultValue={complete}
                    marks={[
                        { value: 20, label: '20%' },
                        { value: 50, label: '50%' },
                        { value: 80, label: '80%' },
                    ]}
                    onChange={handleCompleteChange}
                />*/}
        {category === "issue" || category === "measurements" ? (
          <div></div>
        ) : (
          <Center>
            {category === "goals" || category === "decisions" ? (
              <Button
                variant="outline"
                text
                color="primary"
                onClick={() => {
                  updateStatus(true);
                }}
              >
                Completed
              </Button>
            ) : (
              <Button
                variant="outline"
                text
                color="primary"
                onClick={() => {
                  updateStatus(true);
                }}
              >
                no {nextCat()} found
              </Button>
            )}
          </Center>
        )}

        <br />
        <br />
        <Center>
          <Button variant="outline" text color="green" onClick={updateSubTask}>
            Apply
          </Button>
          <Space w="30%" />
          <Button variant="outline" text color="red" onClick={deleteData}>
            Delete
          </Button>
        </Center>
      </Modal>

      <Modal opened={openedAdd} onClose={() => setOpenedAdd(false)} title="New">
        <Textarea
          placeholder="What are we up to?"
          label="Description"
          autosize
          aria-placeholder={"testing"}
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
        {/*<Select
                  label="Status"
                  placeholder="status"
                  value={status}
                  data = {[
                      { value: 'pending', label: 'pending'},
                      { value: 'planned', label: 'planned'},
                      { value: 'No Pendency', label: 'No Pendency'},
                  ]}
                  onChange={setStatus}
              />
              <br/>
              <Slider
                  defaultValue={complete}
                  marks={[
                      { value: 20, label: '20%' },
                      { value: 50, label: '50%' },
                      { value: 80, label: '80%' },
                  ]}
                  onChange={handleCompleteChange}

              />*/}
        <br />
        <Center>
          <Button variant="outline" text color="green" onClick={updateSubTask2}>
            Apply
          </Button>
          <Space w="30%" />
          <Button variant="outline" text color="red" onClick={deleteData}>
            Delete
          </Button>
        </Center>
      </Modal>

      <Modal
        opened={openedNext}
        onClose={() => setOpenedNext(false)}
        title="New"
      >
        {category === "goals" || category === "decisions" ? (
          <Select
            label="Select"
            placeholder={category}
            data={[
              { value: "goals", label: "Goal" },
              { value: "decisions", label: "Decision" },
            ]}
            onChange={setCategory}
          />
        ) : (
          <di></di>
        )}

        <Textarea
          placeholder="What are we up to?"
          label="Description"
          autosize
          aria-placeholder={"testing"}
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
        {/*<Select
                  label="Status"
                  placeholder="status"
                  value={status}
                  data = {[
                      { value: 'pending', label: 'pending'},
                      { value: 'planned', label: 'planned'},
                      { value: 'No Pendency', label: 'No Pendency'},
                  ]}
                  onChange={setStatus}
              />
              <br/>
              <Slider
                  defaultValue={complete}
                  marks={[
                      { value: 20, label: '20%' },
                      { value: 50, label: '50%' },
                      { value: 80, label: '80%' },
                  ]}
                  onChange={handleCompleteChange}

              />*/}
        <br />
        <Center>
          <Button variant="outline" text color="green" onClick={addSubTask}>
            Apply
          </Button>
          <Space w="30%" />
          <Button variant="outline" text color="red" onClick={deleteData}>
            Delete
          </Button>
        </Center>
      </Modal>
    </div>
  );
};

export default SubTaskComp;
