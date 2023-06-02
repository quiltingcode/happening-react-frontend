// Component imports
import PageNotFound from "../assets/page-not-found-bg.png";
import Asset from './Asset';
// CSS imports
import styles from "../styles/NotFound.module.css";
// React imports
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const NotFound = () => {
  return (
    <>
      <div className={`${styles.NotFound} mt-3 text-center`}>
        <Link to={"/"}>Oooops! Click here to return to the Homepage</Link>
        <Asset src={PageNotFound} />
      </div>
      
    </>
  );
}

export default NotFound