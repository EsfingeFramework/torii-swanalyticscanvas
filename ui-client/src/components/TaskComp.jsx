import React, { useEffect, useState } from "react";
import { Modal, Group, Textarea, Space, Center, Badge } from "@mantine/core";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Progress } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import NotesIcon from "@mui/icons-material/Notes";
import { ThemeIcon, RingProgress, Text } from "@mantine/core";
import { MultiSelect } from "@mantine/core";
import { Title } from "@mantine/core";
import { Button } from "@mantine/core";
import { Card } from "@mantine/core";
import { Avatar, AvatarsGroup } from "@mantine/core";
import { Menu, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Grid from "@mui/material/Grid";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import SquareIcon from "@mui/icons-material/Square";
import DoneIcon from "@mui/icons-material/Done";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SubTaskComp from "./SubTaskComp";

const TaskComp = (props) => {
  const [open, setOpen] = React.useState(false);
  const [opened, setOpened] = useState(false);
  const [openedM, handlers] = useDisclosure(false);
  const [openedDetails, setOpenedDetails] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const id = props.id;
  const [description, setDescription] = React.useState(props.description);
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const [members, setMembers] = React.useState(props.members);
  const handleMembersChange = (event) => {
    setMembers(event.target.value);
  };

  const [complete, setComplete] = React.useState(props.complete);

  const [complete1, setComplete1] = React.useState(0);
  const [complete2, setComplete2] = React.useState(0);
  const [complete3, setComplete3] = React.useState(0);

  let tot = complete1 + complete2 + complete3;

  const date = props.date;

  const [connected, setConnected] = React.useState(props.connected);
  const handleConnectedChange = (event) => {
    setConnected(event.target.value);
  };
  const [messages, setMessages] = React.useState([]);
  const handleMessagesChange = (event) => {
    setMessages(event.target.value);
  };
  const [hasIssue, setHasIssue] = React.useState(props.hasIssue);
  const pId = props.pId;

  let navigate = useNavigate();

  function routeChange(page) {
    navigate(page, {
      state: {
        pId: props.pId,
        tId: props.id,
        tDescription: props.description,
        date: props.date,
        deadline: props.deadline,
        members: props.members,
        complete: props.complete,
        connected: props.connected,
        issue: props.issue,
        measure: props.measure,
        tool: props.tool,
        high: props.high,
        insight: props.insight,
        goal: props.goal,
        decision: props.decision,
        hasIssue: props.hasIssue,
      },
    });
  }

  const updateTask = (e) => {
    e.preventDefault();
    const subTask = {
      id: id,
      description: description,
      date: date,
      deadline: deadline,
      members: members,
      complete: complete,
      connected: connected,
      pId: pId,
      generated: false,
      issue: false,
      measure: false,
      tool: false,
      high: false,
      insight: false,
      goal: false,
      decision: hasIssue,
    };
    console.log(JSON.stringify(subTask));
    fetch("http://localhost:8080/api/mainTask", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(subTask),
    }).then(() => {
      console.log("New Task added");
      window.location.reload(false);
      handleClose();
    });
  };

  const apiDeleteMainTask = "http://localhost:8080/api/mainTask/" + id;
  const apiDeleteSubTasks = "http://localhost:8080/api/subTask/mainTask/" + id;

  const deleteData = () => {
    alert(id);
    fetchDataToDelete();
  };

  const fetchDataToDelete = async () => {
    await axios.delete(apiDeleteSubTasks);
    await axios.delete(apiDeleteMainTask);
  };

  const apiOtherTasks = "http://localhost:8080/api/mainTask/" + pId;
  const [getTsks, setGetTsks] = useState([]);

  const fetchTasks = async () => {
    const { data } = await axios.get(apiOtherTasks);

    for (var i = 0; i < data.length; i++) {
      if (data[i] === description) {
        data.splice(i, 1);
      }
    }
    setGetTsks(data);
  };

  const apiAllData = "http://localhost:8080/api/subTask/" + id;
  const [gets, setGets] = useState([]);
  const [pending, setPending] = useState([]);
  const [planned, setPlaned] = useState([]);
  const [noPendency, setNoPendency] = useState([]);

  useEffect(() => {
    console.log("here");
    fetchData();
    fetchTasks();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(apiAllData);
    setGets(data);
    let counter = 0;
    let complete = 0;

    let noPendency = 0;
    let cdone = 0;
    let planned = 0;
    let cplanned = 0;
    let pending = 0;
    let cpending = 0;

    {
      gets.map((get) => {
        counter = counter + 1;
        if (get.status === "No Pendency") {
          noPendency = noPendency + 1;
        } else if (get.status === "planned") {
          planned = planned + 1;
        } else if (get.status === "pending") {
          pending = pending + 1;
        }
      });
    }

    let sum = noPendency + planned + pending;

    setComplete1(Math.round((noPendency / sum) * 100));
    setComplete2(Math.round((planned / sum) * 100));
    setComplete3(Math.round((pending / sum) * 100));
    setComplete((noPendency / sum) * 100);
    console.log(pending);
  };

  const [value, setValue] = useState(props.deadline);
  let deadline = new Date(value);
  let dead = new Date(props.deadline);
  let dd = String(deadline.getDate()).padStart(2, "0");
  let mm = String(deadline.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = deadline.getFullYear();
  deadline = dd + "/" + mm + "/" + yyyy;

  let today = new Date();
  dd = String(today.getDate()).padStart(2, "0");
  mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;

  let dl = value;

  return (
    <div>
      <Card shadow="sm" p="xl" target="_blank" component="a">
        <Card.Section>
          <Group position="apart" style={{ marginTop: "3%" }}>
            <Avatar color="cyan" size="sm" style={{ marginLeft: "3%" }}>
              Mr
            </Avatar>
            <Text weight={500}>{date}</Text>
            <Menu
              opened={openedM}
              onOpen={handlers.open}
              onClose={handlers.close}
              transition="rotate-right"
              style={{ marginRight: "3%" }}
            >
              <Menu.Label>More</Menu.Label>
              <Menu.Item>Messages</Menu.Item>

              <Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                onClick={() => {
                  setOpened(true);
                }}
              >
                Edit Task
              </Menu.Item>
              <Menu.Item color="red" onClick={deleteData}>
                Delete Task
              </Menu.Item>
            </Menu>
          </Group>
        </Card.Section>
        <Card.Section
          component="b"
          style={{
            cursor: "pointer",
            marginTop: "1%",
            marginLeft: "2%",
            marginRight: "2%",
            marginBottom: "0.1%",
          }}
          onClick={() => {
            routeChange("/subtasks");
          }}
        >
          <Title align="center" order={3}>
            {description}
          </Title>
          <br />
          <Progress
            value={complete}
            color={complete === 100 ? "green" : "yellow"}
            radius="xl"
            size="sm"
          />

          <div hidden={!openedDetails}>
            <br />
            <Center>
              <Text>{today}</Text>
              <ArrowRightAltIcon />
              <Text color="red">{props.deadline}</Text>
            </Center>
            <br />
            <Center>
              <RingProgress
                size={140}
                thickness={12}
                label={
                  <div>
                    {complete1 === 100 ? (
                      <Center>
                        <DoneIcon
                          style={{ color: "#37b34e" }}
                          sx={{ fontSize: 70 }}
                        />
                      </Center>
                    ) : (
                      <Center>
                        <AutorenewIcon
                          style={{ color: "#f09400" }}
                          sx={{ fontSize: 70 }}
                        />
                      </Center>
                    )}
                  </div>
                }
                sections={[
                  { value: complete1, color: "#37b34e" },
                  { value: complete2, color: "#f0f000" },
                  { value: complete3, color: "#e03131" },
                ]}
              />
            </Center>
            <Center style={{ marginTop: "10%" }}>
              <Group position="center">
                <SelectAllIcon style={{ color: "#e03131" }} />
                <Text size="lg" style={{ marginBottom: "3%" }}>
                  Pending: {complete3}%
                </Text>
              </Group>
            </Center>

            {gets.map((get, index) => {
              if (get.status === "pending" && get.category === "issue")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
            {gets.map((get, index) => {
              if (get.status === "pending" && get.category === "measurements")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
            {gets.map((get, index) => {
              if (get.status === "pending" && get.category === "tools")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
            {gets.map((get, index) => {
              if (get.status === "pending" && get.category === "highlights")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
            {gets.map((get, index) => {
              if (get.status === "pending" && get.category === "insights")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
            {gets.map((get, index) => {
              if (get.status === "pending" && get.category === "goals")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
            {gets.map((get, index) => {
              if (get.status === "pending" && get.category === "decisions")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}

            <Center style={{ marginTop: "10%" }}>
              <Group position="center">
                <SelectAllIcon style={{ color: "yellow" }} />
                <Text size="lg" style={{ marginBottom: "3%" }}>
                  Planned: {complete2}%
                </Text>
              </Group>
            </Center>
            {gets.map((get, index) => {
              if (get.status === "planned" && get.category === "issue")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
            {gets.map((get, index) => {
              if (get.status === "planned" && get.category === "measurements")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
            {gets.map((get, index) => {
              if (get.status === "planned" && get.category === "tools")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
            {gets.map((get, index) => {
              if (get.status === "planed" && get.category === "highlights")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
            {gets.map((get, index) => {
              if (get.status === "planned" && get.category === "insights")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
            {gets.map((get, index) => {
              if (get.status === "planned" && get.category === "goals")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
            {gets.map((get, index) => {
              if (get.status === "planned" && get.category === "decisions")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}

            <Center style={{ marginTop: "10%" }}>
              <Group position="center">
                <SelectAllIcon style={{ color: "#37b34e" }} />
                <Text size="lg" style={{ marginBottom: "3%" }}>
                  No Pendency: {complete1}%
                </Text>
              </Group>
            </Center>

            {gets.map((get, index) => {
              if (get.status === "No Pendency" && get.category === "issue")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
            {gets.map((get, index) => {
              if (
                get.status === "No Pendency" &&
                get.category === "measurements"
              )
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
            {gets.map((get, index) => {
              if (get.status === "No Pendency" && get.category === "tools")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
            {gets.map((get, index) => {
              if (get.status === "No Pendency" && get.category === "highlights")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
            {gets.map((get, index) => {
              if (get.status === "No Pendency" && get.category === "insights")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
            {gets.map((get, index) => {
              if (get.status === "No Pendency" && get.category === "goals")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
            {gets.map((get, index) => {
              if (get.status === "No Pendency" && get.category === "decisions")
                return (
                  <div style={{ marginTop: "4%" }}>
                    <Center>
                      <Badge color="teal" radius="sm">
                        {get.category}
                      </Badge>
                    </Center>
                    <Center>
                      <Text>{get.description}</Text>
                    </Center>
                  </div>
                );
            })}
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

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit Issue"
      >
        <Textarea
          placeholder="What are we up to?"
          label="Description"
          autosize
          minRows={6}
          value={description}
          onChange={handleDescriptionChange}
        />
        <br />
        <DatePicker
          placeholder={value}
          inputFormat={"DD-MMM-YYYY"}
          label="Deadline"
          value={value}
          onChange={setValue}
        />
        <br />
        <Center>
          <IconButton aria-label="upload picture" component="span">
            <NotesIcon sx={{ fontSize: 35 }} />
          </IconButton>
        </Center>
        <br />
        <Center>
          <Button variant="outline" text color="green" onClick={updateTask}>
            Apply
          </Button>
        </Center>
      </Modal>
    </div>
  );
};

export default TaskComp;
