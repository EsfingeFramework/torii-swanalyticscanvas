import React, { useState } from "react";
import { Badge, Center, Group, Switch, Text } from "@mantine/core";
import SubTaskComp from "./SubTaskComp";
import Grid from "@mui/material/Grid";
import { Checkbox } from "@mui/material";

const ToDoComp = (props) => {
  const id = props.id;
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
  const [connPrev, setConnPrev] = React.useState(props.connPrev);
  const [creator, setCreator] = React.useState(props.creator);

  const pId = props.pId;
  const tId = props.tId;

  const updateSubTask = (index, state) => {
    const tempConnFlag = connFlag;
    tempConnFlag.splice(index, 1, !connFlag[index]);
    setConnFlag(tempConnFlag);

    let changed = false;
    let tempStatus = status;
    if (tempConnFlag.length > 0) {
      let flag = true;
      for (var i = 0; i < connFlag.length; i++) {
        if (tempConnFlag[i] !== true) {
          flag = false;
          break;
        }
      }
      if (flag === true) {
        tempStatus = "pending";
        setStatus(tempStatus);
        changed = true;
      } else if (status === "pending") {
        tempStatus = "planned";
        setStatus(tempStatus);
        alert("passing from here " + tempStatus);
        changed = true;
      }
    }

    //alert("passing from here")

    const subTask = {
      id: id,
      category: category,
      description: description,
      color: color,
      status: tempStatus,
      members: members,
      complete: complete,
      connected: connected,
      connFlag: tempConnFlag,
      connPrev: [],
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
      if (changed === true) {
        window.location.reload(false);
      }
    });
  };

  return (
    <div style={{ marginTop: "5%" }}>
      {connected.map((get, index) => {
        return (
          <Text
            align="left"
            weight={700}
            style={{ marginBottom: "3%", marginRight: "4%", marginLeft: "4%" }}
          >
            <Checkbox
              onClick={() => {
                updateSubTask(index, 1);
              }}
              checked={connFlag[index] === false ? false : true}
              size="md"
            />
            - {get}
          </Text>
        );
      })}
    </div>
  );
};

export default ToDoComp;
