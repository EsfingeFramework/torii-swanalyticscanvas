import React, { useCallback, useEffect, useState } from "react";
import TaskComp from "./components/TaskComp";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import axios from "axios";
import {
  Center,
  Input,
  MantineProvider,
  Progress,
  Space,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import NotesIcon from "@mui/icons-material/Notes";
import { Modal, Button } from "@mantine/core";
import { MultiSelect } from "@mantine/core";
import { Grid } from "@mantine/core";
import GithubLogin from "./services/githubAuth/GithubLogin";
import { useGithubAuth } from "./context/GithubAuthContext";
import { useGetIssues } from "./api/githubRepository/useGithub";
import GithubIssues from "./components/Github/GithubIssues";
import { useRequestHeaders } from "./api/header/useRequestHeaders";

const Tasks = () => {
  const location = useLocation();
  //const pId = location.state.pId;
  const { issues, fetchIssues, isToken, token } = useGithubAuth();
  const pId = location.state.pId;
  const [description, setDescription] = React.useState("");
  const [label, setLabel] = React.useState("");
  const [issuePopupIsOpen, setIssuePopupIsOpen] = useState(false);
  const requestHeaders = useRequestHeaders("application/json");

  // const [issues, setIssues] = useState([]);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;

  const [members, setMembers] = React.useState(" nessuno");
  const handleMembersChange = (event) => {
    setMembers(event.target.value);
  };
  const complete = 0;

  const [connected, setConnected] = React.useState([]);
  const handleConnectedChange = (event) => {
    setConnected(event.target.value);
  };
  const [messages, setMessages] = React.useState(["incredibile"]);
  const handleMessagesChange = (event) => {
    setMessages(event.target.value);
  };
  const [opened, setOpened] = useState(false);
  const handleOpen = () => setOpened(true);
  const handleClose = () => setOpened(false);

  const addTask = (e) => {
    e.preventDefault();
    const subTask = {
      description: description,
      date: today,
      deadline: deadline,
      members: members,
      complete: complete,
      connected: connected,
      pId: pId,
      generated: "false",
      issue: false,
      measure: false,
      tool: false,
      high: false,
      insight: false,
      goal: false,
      decision: false,
      hasIssue: false,
    };
    console.log(JSON.stringify(subTask));
    fetch("http://localhost:8080/api/mainTask", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(subTask),
    }).then(() => {
      console.log("New Task added");
      window.location.reload(false);
      handleClose();
    });
  };

  const apiAllData = "http://localhost:8080/api/mainTask/" + pId;

  const [gets, setGets] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(apiAllData);
    setGets(data);
  };

  const [value, setValue] = useState(null);
  let deadline = new Date(value);

  dd = String(deadline.getDate()).padStart(2, "0");
  mm = String(deadline.getMonth() + 1).padStart(2, "0"); //January is 0!
  yyyy = deadline.getFullYear();
  deadline = dd + "-" + mm + "-" + yyyy;

  const onSuccess = (response) => console.log(response);
  const onFailure = (response) => console.error(response);

  const handleGetIssues = () => {
    fetchIssues(label, token);
    setIssuePopupIsOpen(false);
    setLabel("");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button
        variant="outline"
        text
        color="green"
        onClick={() => setIssuePopupIsOpen(true)}
      >
        Get Github Issues
      </Button>
      <Center>
        {!isToken && (
          <GithubLogin onSuccess={onSuccess} onFailure={onFailure} />
        )}
      </Center>
      <Center style={{ marginBottom: "2%" }}>
        <Title order={1}>
          Key Issue
          <IconButton
            onClick={handleOpen}
            color="primary"
            aria-label="upload picture"
            component="span"
            size="small"
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </Title>
      </Center>
      <Grid style={{ marginLeft: "2%", marginRight: "2%" }}>
        Github Issues
        {issues && <GithubIssues issues={issues} />}
      </Grid>
      <Grid style={{ marginLeft: "2%", marginRight: "2%" }}>
        System Issues
        {gets.map((get, index) => {
          if (1 === 1)
            return (
              <Grid.Col md={3} sm={12}>
                <TaskComp
                  key={get.id}
                  id={get.id}
                  description={get.description}
                  date={get.date}
                  deadline={get.deadline}
                  members={get.members}
                  complete={get.complete}
                  connected={get.connected}
                  pId={get.pId}
                  generated={get.generated}
                  issue={get.issue}
                  measure={get.measure}
                  tool={get.tool}
                  high={get.high}
                  insight={get.insight}
                  goal={get.goal}
                  decision={get.decision}
                  hasIssue={get.hasIssue}
                />
              </Grid.Col>
            );
        })}
        {gets.map((get, index) => {
          if (1 === 1) return <h1>{get.generated}</h1>;
        })}
      </Grid>
      <Modal opened={opened} onClose={() => setOpened(false)} title="New Issue">
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
          placeholder="Deadline"
          label="Deadline"
          inputFormat={"DD-MMM-YYYY"}
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
          <Button variant="outline" text color="green" onClick={addTask}>
            Apply
          </Button>
        </Center>
      </Modal>
      <Modal
        opened={issuePopupIsOpen}
        onClose={() => {
          setIssuePopupIsOpen(false);
          setLabel("");
        }}
        title="Get Issues from Github"
      >
        {isToken
          ? "You are connected to your github account"
          : "Please first connect to your github account"}
        <br />
        <br />
        <TextInput
          placeholder="Add your label"
          label="Add your label"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
        />
        <br />
        <br />
        <Center>
          <Button
            variant="outline"
            text
            color="green"
            onClick={handleGetIssues}
            disabled={!isToken}
          >
            Get Issues
          </Button>
        </Center>
      </Modal>
    </Box>
  );
};
export default Tasks;
