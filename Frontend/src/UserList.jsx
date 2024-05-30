import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Container,
  Grid,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import UserItem from "./UserItem";
import UserForm from "./UserForm";

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  //When browser Loads It Fetch API data and render
  useEffect(() => {
    fetchUser();
  }, []);

  //Initial Fetch API data and render
  async function fetchUser() {
    try {
      const response = await axios.get("http://localhost:3000/Users/getUser");
      setUsers(response.data);
    } catch (error) {
      showSnackBar("not fetched", "error");
      console.log("vicky");
    }
  }

  // This Function Has the control to show the SnackBar
  function showSnackBar(message, severity) {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }
  // This Function Has the control to hide the SnackBar
  function hideSnackBar() {
    setSnackbar({ ...snackbar, open: false });
  }

  //This Function has the control to delete data
  const onDelete = async (user) => {
    try {
      console.log(user);
      await axios.delete(`http://localhost:3000/Users/deleteUser/${user._id}`);
      fetchUser();

      showSnackBar("user Deleted", "success");
    } catch (error) {
      showSnackBar("Error with delete", "error");
    }
  };

  //This Function has the control to edit data
  const onEdit = async (user) => {
    console.log(user._id);
    try {
      await axios.put(
        `http://localhost:3000/Users/updateUser/${user._id}`,
        user
      );
      console.log(user);
      fetchUser();

      showSnackBar("Updated", "success");
    } catch (error) {
      console.log(error);
      showSnackBar("Error with update", "error");
    }

    setEditingUser(null);
  };

  //This Function has the control to add data
  const onAdd = async (user) => {
    if (
      user.name == undefined ||
      user.email == undefined ||
      user.name == "" ||
      user.email == ""
    ) {
      showSnackBar("Plz Add proper UserData", "secondary");
    } else {
      try {
        const response = await axios.post(
          `http://localhost:3000/Users/addUser/`,
          user
        );

        fetchUser();
        //Upadte ID for the Upcomming new user

        showSnackBar("user Added", "success");
        setEditingUser(null);
      } catch (error) {
        showSnackBar("Error With adding", "error");
      }
    }
  };
  return (
    <div>
      <Container maxWidth>
        <Paper elevation={5} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontStyle: "oblique", letterSpacing: "10px" }}
          >
            User Management
          </Typography>
          <Grid container item spacing={0} justifyContent={"space-around"}>
            {users.map((user, index) => (
              <UserItem
                key={index}
                user={user}
                onEdit={setEditingUser}
                onDelete={onDelete}
              ></UserItem>
            ))}
          </Grid>
          <Button
            variant="contained"
            sx={{ marginTop: 10 }}
            onClick={() => setEditingUser({})}
          >
            Add user
          </Button>
          {editingUser && (
            <UserForm
              editingUser={editingUser}
              onEdit={editingUser._id ? onEdit : onAdd}
              onCancel={setEditingUser}
            ></UserForm>
          )}
        </Paper>
        <Snackbar
          open={snackbar.open}
          onClose={hideSnackBar}
          autoHideDuration={6000}
        >
          <Alert onClose={hideSnackBar} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}

export default UserList;
