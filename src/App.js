import React from "react";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import mylogo from "./images/logo.png"; // with import
import axios from "axios";
import Button from "@material-ui/core/Button";
import "./App.css";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 260,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

/**
 * 1. ENTER DRINK NAME IN THE SEARCH BAR
 * 2. GET ID FOR THE DRINK USING
 * 3. Save response in the state using this.setState ({})
 * 4. start changing components return
 *  a. create a <div> with class named container
 *  b. create a <ol> class name drinkList
 *  c. itrate over the response stored in the state and create <li> for each item
 *
 *
 *
 */

export default class SearchAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: ["hello", "bro", "this", "is", "list"],
      payload: [],
    };
  }
  handleChange = async (event) => {
    console.log(event.target.value);
    let payload;
    const options = {
      method: "GET",
      url: "https://the-cocktail-db.p.rapidapi.com/filter.php",
      params: { i: event.target.value },
      headers: {
        "x-rapidapi-key": "1df6dfe1b0mshf9336b5c23fd266p12e540jsn508d728fadbe",
        "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
      },
    };

    let res = await axios
      .request(options)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
    console.log("🔥", res);
    if (res.drinks.length !== 0 && Array.isArray(res.drinks)) {
      this.setState({ payload: res.drinks });
    }
  };
  onButtonClick = (event, value) => {
    // this.state.heading= "hello manmonit"
    this.setState({ heading: "Hello Manmohit" });
  };

  render() {
    console.log("THis.state: ", this.state);
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <img className="logo" src={mylogo} />{" "}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
            ></IconButton>
            <div>
              <div></div>
              <InputBase
                placeholder="Search…"
                onChange={this.handleChange}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className="container" maxWidth="sm">
          <ol className="drinks-list">
            {this.state.payload &&
              this.state.payload.map((payload, i) => (
                <li className="drink" key={i}>
                  <img className="thumbnail" src={payload.strDrinkThumb} />
                  <h4>{payload.strDrink}</h4>
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}
