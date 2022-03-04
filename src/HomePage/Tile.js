import React from "react";
import Card1 from "./Card1";
import Card2 from "./Card2";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { UniversityBarChart } from "../HomePage/UniversityBarChart";
import { StateBarChart } from "../HomePage/StateBarChart";

const useStyles = makeStyles({
  gridContainer: {
    width: "auto",
    justifyContent: "space-evenly",
    padding: "100px 0 100px 40px ",
    backgroundColor: "rgba(10,10,10, 0.05)",
  },
  gridItem: {
    borderRadius: "30px",
  },
});

export default function Tile() {
  const classes = useStyles();
  return (
    <>
      <h1 style={{ color: "darkblue", textAlign: "center" }}>Home</h1>
      <Grid container spacing={4} className={classes.gridContainer}>
        <Grid item xs={12} sm={10} md={6}>
          <Card1 />
        </Grid>
        <Grid item xs={12} sm={10} md={6}>
          <Card2 />
        </Grid>
      </Grid>
      <Grid container spacing={4} className={classes.gridContainer}>
        <Grid item xs={12} sm={12} md={12}>
          <StateBarChart />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <UniversityBarChart />
        </Grid>
      </Grid>
    </>
  );
}
