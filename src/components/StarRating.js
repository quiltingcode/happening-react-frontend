import React from 'react'
import styles from '../styles/StarRating.module.css';

const StarRating = (props) => {

    const {average_rating} = props;

  return (
    <div>
        {average_rating === 5 && (
                <span className="d-inline-column">
                  <i className={`fa-solid fa-star ${styles.Star}`}></i>
                  <i className={`fa-solid fa-star ${styles.Star}`}></i>
                  <i className={`fa-solid fa-star ${styles.Star}`}></i>
                  <i className={`fa-solid fa-star ${styles.Star}`}></i>
                  <i className={`fa-solid fa-star ${styles.Star}`}></i>
                </span>
              ) }
              {average_rating === 4 && (
                <span className="d-inline-column">
                  <i className={`fa-solid fa-star ${styles.Star}`}></i>
                  <i className={`fa-solid fa-star ${styles.Star}`}></i>
                  <i className={`fa-solid fa-star ${styles.Star}`}></i>
                  <i className={`fa-solid fa-star ${styles.Star}`}></i>
                </span>
              ) }
              {average_rating === 3 && (
                <span className="d-inline-column">
                  <i className={`fa-solid fa-star ${styles.Star}`}></i>
                  <i className={`fa-solid fa-star ${styles.Star}`}></i>
                  <i className={`fa-solid fa-star ${styles.Star}`}></i>
                </span>
              ) }
              {average_rating === 2 && (
                <span className="d-inline-column">
                  <i className={`fa-solid fa-star ${styles.Star}`}></i>
                  <i className={`fa-solid fa-star ${styles.Star}`}></i>

                </span>
              ) }
              {average_rating === 1 && (
                <span className="d-inline-column">
                  <i className={`fa-solid fa-star ${styles.Star}`}></i>
                </span>
              ) }
              {average_rating === null && (
                <span className="d-inline-column">

        
                </span>
              ) }

    </div>
  )
}

export default StarRating