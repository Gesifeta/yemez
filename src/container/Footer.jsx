import { FaCopyright } from "react-icons/fa6";

const Footer = () => {
  //insert copyright and date
  const date = new Date();
  const year = date.getFullYear();
  return <footer className="app__footer">&copy; {year}, Gemechu Gesifeta </footer>;
};

export default Footer;
