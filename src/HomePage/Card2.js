import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

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

export default function Card2() {
  const [universityData, setUniversityData] = useState([]);
  const [universityCount, setUniversityCount] = useState("");
  const classes = useStyles();

  const baseURL = "http://universities.hipolabs.com/search?country=India";

  function GetUniversityData() {
    axios.get(baseURL).then((response) => {
      if (universityData.length === 0) {
        setUniversityData(response.data);
      }
      console.log(universityData, "universityData");
    });
  }
  useEffect(() => {
    GetUniversityData();
    setUniversityCount(universityData.length);
    console.log(universityCount, "universityCount");
  }, [universityData]);

  return (
    <Card className={classes.root} variant="outlined">
      <CardActions>
        <CardContent>
          <Typography className={classes.title} color="secondary" gutterBottom>
            Number Of University
          </Typography>
          <Typography className={classes.count} variant="body2" color="secondary">
            {universityCount}
          </Typography>
        </CardContent>
      </CardActions>
    </Card>
  );
}
