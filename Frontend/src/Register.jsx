import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [snackBar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  function showSnackBar(message, severity) {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }
  // This Function Has the control to hide the SnackBar
  function hideSnackBar() {
    setSnackbar({ ...snackBar, open: false });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Data = await axios.post("http://localhost:3000/Register/Users", {
        name,
        email,
        password,
      });
      console.log(Data);
      showSnackBar(Data.data, "success");
      setName("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      showSnackBar(err.message, "error");
    }
  };
  return (
    <div>
      <Container fullWidth="sm">
        <Typography variant="h4">Register Form</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            label="Name"
            fullWidth="md"
            margin="normal"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            Name{" "}
          </TextField>
          <TextField
            label="Email"
            name="email"
            type="text"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            Name{" "}
          </TextField>
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            Name{" "}
          </TextField>
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </form>
        <Snackbar
          open={snackBar.open}
          onClose={hideSnackBar}
          autoHideDuration={6000}
        >
          <Alert onClose={hideSnackBar} severity={snackBar.severity}>
            {snackBar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}

export default Register;
