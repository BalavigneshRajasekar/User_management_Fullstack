import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

function UserItem({ user, onEdit, onDelete }) {
  return (
    <div>
      <Grid container item xs={12} sm={6} md={4} spacing={1}>
        <Card
          sx={{
            minWidth: 330,
            marginTop: 5,
            paddingX: 1,
            paddingY: 1,
          }}
        >
          <CardContent>
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="h6" color="grey">
              {user.email}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => onEdit(user)}
              variant="contained"
            >
              Edit
            </Button>
            <Button
              size="small"
              color="secondary"
              onClick={() => onDelete(user)}
              variant="contained"
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
}

export default UserItem;
