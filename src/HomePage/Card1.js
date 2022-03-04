import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    borderRadius: 30,
    minWidth: 200,
  },

  title: {
    fontSize: 40,
  },

  count: {
    fontSize: 25,
  },
});

export default function Card1() {
  const [admissionDataCount, setAdmissionDataCount] = useState("");

  const classes = useStyles();

  useEffect(() => {
    let admissionData = JSON.parse(window.localStorage.getItem("studentInfo"));
    setAdmissionDataCount(admissionData?.length || 0);
  }, [admissionDataCount]);

  return (
    <Card className={classes.root} variant="outlined">
      <CardActions>
        <CardContent>
          <Typography className={classes.title} color="secondary" gutterBottom>
            Number Of Admissions
          </Typography>
          <Typography
            className={classes.count}
            variant="body2"
            color="secondary"
          >
            {admissionDataCount}
          </Typography>
        </CardContent>
      </CardActions>
    </Card>
  );
}
