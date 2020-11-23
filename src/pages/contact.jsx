/** @jsx h */
import { h, Component } from "preact";
import { Link } from 'preact-router/match';
import Helmet from "preact-helmet";
import lozad from "lozad";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -0.100521,
      lat: 51.495446,
      zoom: 17,
    };
  }

  componentDidMount() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    const {
      lng,
      lat,
      zoom
    } = this.state;

    const observer = lozad(".lazy", {
      loaded: function (el) {
        // Custom implementation on a loaded element
        el.classList.add("is-loaded");
      },
      rootMargin: "10px 0px", // syntax similar to that of CSS Margin
      threshold: 0.4 // ratio of element convergence
    });
    observer.observe();
    document.querySelector("#branding__logo").classList.remove("branding__logo-alt");
  }

  componentWillUnmount() {
    document.querySelector("#branding__logo").classList.add("branding__logo-alt");
  }




  render() {
    const { lng, lat, zoom } = this.state;
    return (
      <main class="container">
        <Helmet title="My Title Hay James Yet Another Page" />
        <h2>Hello Contact Page</h2>
        <div style={`width: 100%; height: 100vh; background:
          url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/url-https%3A%2F%2Fjameswquinn.github.io%2Fmaps%2FPNG%2Fmarker.png(${lng},${lat})/${lng},${lat},${zoom}/720x1280?access_token=pk.eyJ1IjoiamFtZXN3aWxsaWFtcXVpbm4yMDE5IiwiYSI6ImNqeGZhbWk1YjA5aWozb21rcG5wZ25oM2UifQ.5N__EOe9yWAHDaQ6kp9KMg')no-repeat;
            background-position: center center; background-size: cover;`}></div>
      </main>
    );
  }
}
