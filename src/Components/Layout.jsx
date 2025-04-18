import { Link } from "react-router-dom";

export const Header = () => (
  <header>
    <p className="Lyrix">
      <Link to="/">Lyrix</Link>
    </p>
    <p className="SavedSongs">
      <Link to="/bookmarks">Saved Songs</Link>
    </p>
  </header>
);

export const Footer = () => (
  <footer>
    <span>Lyrix 2025</span>
    <span>by Anass DOUBLAL</span>
    <span>All Rights Reserved</span>
  </footer>
);