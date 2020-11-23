import { h, Component, render } from "preact"; /** @jsx h */
import { Router, route } from "preact-router";

history.replaceState(0, 0, "/"); // jsfiddle url defaults to `/_display`

function search(query) {
  route(`/profile?q=${encodeURIComponent(query)}`);
}

/** Stateless app */
const App = () => (
  <div class="app">
    <Header />
    <Router>
      <Home path="/" />
      <Profile path="/profile/:user?" />
      <Error type="404" default />
    </Router>
  </div>
);

/** demo header nav+search */
const Header = () => (
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/profile">Profile</a>
      <a href="/profile/john">John</a>
      <a href="/asdf">Error</a>
    </nav>
    <input
      type="search"
      placeholder="Search..."
      onSearch={e => search(e.target.value)}
    />
  </header>
);

/** our index route */
class Home extends Component {
  setText = e => {
    this.setState({ text: e.target.value });
  };
  render({}, { text = "Some Text" }) {
    return (
      <section class="home">
        <input value={text} onInput={this.setText} />
        <div>In caps: {text.toUpperCase()}</div>
      </section>
    );
  }
}

/** handles /profile and /profile/:user */
const Profile = ({ user, ...props }) => (
  <section class="profile">
    <h2>Profile: {user || "you"}</h2>
    <p>This is some text about {user || "you"}.</p>
    <pre>{JSON.stringify({ user, ...props }, 0, "  ")}</pre>
  </section>
);

/** fall-back route (handles unroutable URLs) */
const Error = ({ type, url }) => (
  <section class="error">
    <h2>Error {type}</h2>
    <p>It looks like we hit a snag.</p>
    <pre>{url}</pre>
  </section>
);

render(<App />, document.body);
