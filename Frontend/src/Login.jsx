import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();

  const showSnackBar = (message, severity) => {
    setSnackBar({ open: true, message: message, severity: severity });
  };
  const hideSnackBar = () => {
    setSnackBar({ ...snackBar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const Data = await axios.post("http://localhost:3000/Register/Login", {
        email,
        password,
      });
      console.log(Data);
      showSnackBar(Data.data, "success");

      setEmail("");
      setPassword("");
      navigate("/Home");
    } catch (err) {
      showSnackBar(err.response.data, "error");
    }
  };
  const handleSignUp = () => {
    navigate("/Register");
  };
  return (
    <div>
      <Container fullWidth="sm">
        <Typography variant="h4">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            autoFocus
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
          <div className="d-flex justify-content-between">
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
            <Button variant="outlined" color="primary" onClick={handleSignUp}>
              signup
            </Button>
          </div>
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

export default Login;
