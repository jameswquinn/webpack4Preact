/** @jsx h */
import { h, Component, render } from "preact";
import Helmet from "preact-helmet";
import { Router } from "preact-router";
import { Link } from 'preact-router/match';
import AsyncRoute from 'preact-async-route';


import "./styles.css";

const NODE = document.body.querySelector("#root");




const Home = () => (
  <div>
    <Helmet
      title="My Title Hay James Yet Another Page"
      meta={[
        { name: "description", content: "Helmet application" },
        { property: "og:type", content: "article" }
      ]}
    />
    <h1>Hello world</h1>
  </div>
);


const App = () => (
  <div id="root">
    <Helmet
      title="My Title"
      titleTemplate="%s | MyAwesomeWebsite.com"
    />
    <Home />
  </div>
);

render(<App />, document.body, NODE);
