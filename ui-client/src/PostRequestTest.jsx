import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

const PostRequestTest = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    const user = { username: username, email: email, age: age };
    console.log(JSON.stringify(user));
    fetch("http://localhost:8080/api/user", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    }).then(() => {
      console.log("New user added");
      window.location.reload(false);
    });
  };
  const apiAllData = "http://localhost:8080/api/user";

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("here");
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(apiAllData);
    setPosts(data);
  };

  return (
    <div>
      <div>
        <TextField
          id="username"
          label="username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="email"
          label="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="age"
          label="age"
          variant="outlined"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <br />
      <div>
        <Button variant="outlined" onClick={handleClick}>
          Submit
        </Button>
      </div>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">username</TableCell>
              <TableCell align="left">email</TableCell>
              <TableCell align="left">age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell align="left">{post.id}</TableCell>
                <TableCell align="left">{post.username}</TableCell>
                <TableCell align="left">{post.email}</TableCell>
                <TableCell align="left">{post.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PostRequestTest;
