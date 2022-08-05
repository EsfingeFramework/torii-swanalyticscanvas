import React, { useEffect, useState } from "react";
import SubTaskComp from "./components/SubTaskComp";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import {
  Modal,
  Button,
  Group,
  Divider,
  Switch,
  Avatar,
  Text,
  Title,
  MultiSelect,
} from "@mantine/core";
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
import InsightsIcon from "@mui/icons-material/Insights";
import BugReportIcon from "@mui/icons-material/BugReport";
import ConstructionIcon from "@mui/icons-material/Construction";
import StarRateIcon from "@mui/icons-material/StarRate";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const SubTasks = (props) => {
  //const [open, setOpen] = React.useState(false);
  const [opened, setOpened] = useState(false);
  const [checked, setChecked] = useState(false);
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
  const [creator, setCreator] = useState(sessionStorage.getItem("username"));
  const [connected, setConnected] = React.useState([]);
  const [connFlag, setConnFlag] = React.useState([]);
  const [connPrev, setConnPrev] = React.useState([]);
  const [toDo, setToDo] = useState({});
  const [checkHasissue, setCheckHasIssue] = useState(false);

  const location = useLocation();
  const pId = location.state.pId;
  const tId = location.state.tId;
  const [generated, setGenerated] = React.useState(location.state.tGenerated);
  const [hasIssue, setHasIssue] = useState(location.state.hasIssue);

  const label = category + " description";

  const addSubTask = () => {
    const subTask = {
      category: category,
      description: description,
      color: color,
      status: "pending",
      members: members,
      complete: parseInt(complete),
      date: date,
      deadline: deadline,
      connected: connected,
      connFlag: [],
      connPrev: [],
      creator: creator,
      pId: pId,
      tId: tId,
    };
    console.log(JSON.stringify(subTask));
    fetch("http://localhost:8080/api/subTask", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(subTask),
    }).then(async () => {
      console.log("New SubTask added");
      await sleep(2000);
      window.location.reload(false);
    });
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const addIssue = () => {
    const subTask = {
      category: "issue",
      description: taskData.description,
      color: color,
      status: "pending",
      members: members,
      complete: parseInt(complete),
      connected: connected,
      connFlag: [],
      connPrev: [],
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

  const updateTaskIssueStatus = () => {
    const mainTask = {
      id: tId,
      description: taskData.description,
      date: taskData.date,
      deadline: taskData.deadline,
      members: taskData.members,
      complete: taskData.complete,
      connected: taskData.connected,
      pId: pId,
      generated: false,
      issue: true,
      measure: true,
      tool: true,
      high: true,
      insight: true,
      goal: true,
      decision: true,
      hasIssue: true,
    };
    console.log(JSON.stringify(mainTask));
    fetch("http://localhost:8080/api/mainTask", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(mainTask),
    }).then(() => {
      console.log("New Task added");
      addIssue();
    });
  };

  const updateTask = (flag, path) => {
    let tempIssue = issue;
    let tempTool = tool;
    let tempMeasure = measure;
    let tempHigh = high;
    let tempInsight = insight;
    let tempDecision = decision;
    let tempGoal = goal;

    if (flag == "issue") {
      tempIssue = true;
    } else if (flag === "fmeasurements") {
      tempMeasure = true;
    } else if (flag === "ftools") {
      tempTool = true;
    } else if (flag === "fhighlights") {
      tempHigh = true;
    } else if (flag === "finsights") {
      tempInsight = true;
    } else if (flag === "fboth") {
      tempGoal = true;
      tempDecision = true;
    }

    console.log(flag);
    console.log(issue);
    console.log(tool);
    console.log(measure);
    console.log(high);
    console.log(insight);
    console.log(decision);
    console.log(goal);

    const mainTask = {
      id: tId,
      description: taskData.description,
      date: taskData.date,
      deadline: taskData.deadline,
      members: taskData.members,
      complete: taskData.complete,
      connected: taskData.connected,
      pId: pId,
      generated: false,
      issue: tempIssue,
      measure: tempMeasure,
      tool: tempTool,
      high: tempHigh,
      insight: tempInsight,
      goal: tempGoal,
      decision: tempDecision,
      hasIssue: hasIssue,
    };
    console.log(JSON.stringify(mainTask));
    fetch("http://localhost:8080/api/mainTask", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(mainTask),
    }).then(() => {
      console.log("New Task added");
    });
    if (path === 1) {
      addSubTask();
    }
  };

  const apiAllData = "http://localhost:8080/api/subTask/" + tId;

  const [gets, setGets] = useState([]);
  useEffect(() => {
    fetchData();
    fetchDataTask();
    setTimeout(() => {
      if (taskData.hasIssue === false) {
        updateTaskIssueStatus();
      }
    }, 500);
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(apiAllData);
    setGets(data);
  };

  const apiTaskData = "http://localhost:8080/api/mainTask/tData/" + tId;
  const [taskData, setTaskData] = React.useState([]);

  const fetchDataTask = async () => {
    const { data } = await axios.get(apiTaskData);
    setTaskData(data);
    setIssue(taskData.issue);
    setMeasure(taskData.measure);
    setTool(taskData.tool);
    setHigh(taskData.high);
    setInsight(taskData.insight);
    setDecision(taskData.decision);
    setGoal(taskData.goal);
    //console.log("task data issue " + high)

    if (gets.length > 1) {
      if (taskData.measure === false) {
        let catcheck = false;
        let check = true;
        for (var i = 1; i < gets.length; i++) {
          if (gets[i].status !== "done") {
            check = false;
            break;
          } else if (gets[i].category === "measurements") {
            catcheck = true;
            console.log("into high");
          }
        }
        if (check === true && catcheck === true) {
          updateTask("fmeasurements", 0);
        }
      } else if (taskData.tool === false) {
        let check = true;
        let catcheck = false;

        for (var i = 1; i < gets.length; i++) {
          if (gets[i].status !== "done") {
            check = false;
            break;
          } else if (gets[i].category === "tools") {
            catcheck = true;
          }
        }
        if (check === true && catcheck === true) {
          updateTask("ftools", 0);
        }
      } else if (taskData.high === false) {
        let check = true;
        let catcheck = false;
        for (var i = 1; i < gets.length; i++) {
          if (gets[i].status !== "done") {
            check = false;
            break;
          } else if (gets[i].category === "highlights") {
            catcheck = true;
          }
        }
        if (check === true && catcheck === true) {
          updateTask("fhighlights", 0);
        }
      } else if (taskData.insight === false) {
        let check = true;
        let catcheck = false;

        for (var i = 1; i < gets.length; i++) {
          if (gets[i].status !== "done") {
            check = false;
            break;
          } else if (gets[i].category === "insights") {
            catcheck = true;
          }
        }
        if (check === true && catcheck === true) {
          updateTask("finsights", 0);
          console.log("into insight");
        }
      } else if (taskData.goal === false || taskData.decision === false) {
        let check = true;
        for (var i = 1; i < gets.length; i++) {
          if (gets[i].status !== "done") {
            check = false;
            break;
          }
        }
        if (check === true) {
          updateTask("fboth", 0);
        }
      }
    }
  };

  const [issue, setIssue] = React.useState("");
  const [measure, setMeasure] = React.useState("");
  const [tool, setTool] = React.useState("");
  const [high, setHigh] = React.useState("");
  const [insight, setInsight] = React.useState("");
  const [decision, setDecision] = React.useState("");
  const [goal, setGoal] = React.useState("");

  const openModal = (temp) => {
    setCategory(temp);
    handleOpen();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Divider my="sm" />
      <Grid container textAlign="center">
        <Grid item md={2} xs={12}>
          <h2>
            <BugReportIcon /> Key Issue
          </h2>
          <Divider my="sm" style={{ marginLeft: "4%", marginRight: "4%" }} />
          <div>
            {gets.map((get, index) => {
              if (get.category === "issue")
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
                    creator={get.creator}
                    connected={get.connected}
                    connFlag={get.connFlag}
                    connPrev={get.connPrev}
                    pId={get.pId}
                    tId={get.tId}
                  />
                );
            })}
          </div>
          <br />
        </Grid>
        <Grid item md={2} xs={12}>
          <h2>
            <InsightsIcon /> Measurements
          </h2>
          <Divider my="sm" style={{ marginLeft: "4%", marginRight: "4%" }} />
          <div>
            {gets.map((get, index) => {
              if (get.category === "measurements" && get.complete !== 100)
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
                    creator={get.creator}
                    connected={get.connected}
                    connFlag={get.connFlag}
                    connPrev={get.connPrev}
                    pId={get.pId}
                    tId={get.tId}
                  />
                );
            })}
          </div>
          <br />
        </Grid>
        <Grid item md={2} xs={12}>
          <h2>
            <ConstructionIcon /> Methods & Tools
          </h2>
          <Divider my="sm" style={{ marginLeft: "4%", marginRight: "4%" }} />
          <div>
            {gets.map((get, index) => {
              if (get.category === "tools")
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
                    creator={get.creator}
                    connected={get.connected}
                    connFlag={get.connFlag}
                    connPrev={get.connPrev}
                    pId={get.pId}
                    tId={get.tId}
                  />
                );
            })}
          </div>
          <br />
        </Grid>
        <Grid item md={2} xs={12}>
          <h2>
            <StarRateIcon /> Highlights
          </h2>
          <Divider my="sm" style={{ marginLeft: "4%", marginRight: "4%" }} />
          <div>
            {gets.map((get, index) => {
              if (get.category === "highlights")
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
                    creator={get.creator}
                    connected={get.connected}
                    connFlag={get.connFlag}
                    connPrev={get.connPrev}
                    pId={get.pId}
                    tId={get.tId}
                  />
                );
            })}
          </div>
          <br />
        </Grid>
        <Grid item md={2} xs={12}>
          <h2>
            <TipsAndUpdatesIcon /> Insights
          </h2>
          <Divider my="sm" style={{ marginLeft: "4%", marginRight: "4%" }} />
          <div>
            {gets.map((get, index) => {
              if (get.category === "insights")
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
                    creator={get.creator}
                    connected={get.connected}
                    connFlag={get.connFlag}
                    connPrev={get.connPrev}
                    pId={get.pId}
                    tId={get.tId}
                  />
                );
            })}
          </div>
          <br />
        </Grid>
        <Grid item md={2} xs={12}>
          <h2>
            <SportsScoreIcon /> Goals
          </h2>
          <Divider my="sm" style={{ marginLeft: "4%", marginRight: "4%" }} />
          <div>
            {gets.map((get, index) => {
              if (get.category === "goals")
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
                    creator={get.creator}
                    connected={get.connected}
                    connFlag={get.connFlag}
                    connPrev={get.connPrev}
                    pId={get.pId}
                    tId={get.tId}
                  />
                );
            })}
          </div>

          <br />
          <h2>
            <CallSplitIcon /> Decisions
          </h2>
          <Divider my="sm" style={{ marginLeft: "4%", marginRight: "4%" }} />
          <div>
            {gets.map((get, index) => {
              if (get.category === "decisions")
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
                    creator={get.creator}
                    connected={get.connected}
                    connFlag={get.connFlag}
                    connPrev={get.connPrev}
                    pId={get.pId}
                    tId={get.tId}
                  />
                );
            })}
          </div>
          <br />
        </Grid>
      </Grid>

      <Modal opened={opened} onClose={() => setOpened(false)} title="New">
        <br />
        <Textarea
          placeholder="What are we up to?"
          label={label}
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
        <MultiSelect
          data={gets.map((get) => get.description)}
          label="Connection"
          placeholder={connected}
          value={connected}
          onChange={setConnected}
          searchable
          clearButtonLabel="Clear selection"
        />
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
          <Button
            variant="outline"
            text
            color="green"
            onClick={() => {
              updateTask(category, 1);
            }}
          >
            Add
          </Button>
        </Center>
      </Modal>
    </Box>
  );
};
export default SubTasks;
