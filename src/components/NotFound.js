import React from 'react'
import PageNotFound from "../assets/page-not-found-bg.png";
import styles from "../styles/NotFound.module.css";
import Asset from './Asset';
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