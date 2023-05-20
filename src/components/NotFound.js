import React from 'react'
import NoResults from "../assets/no-results.jpg";
import styles from "../styles/NotFound.module.css";
import Asset from './Asset';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const NotFound = () => {
  return (
    <>
      <div className={styles.NotFound}>
        <Asset src={NoResults} />
      </div>
      <Link to={"/"}>Click here to return to the Homepage</Link>
    </>
  );
}

export default NotFound