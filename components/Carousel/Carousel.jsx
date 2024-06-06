import React from 'react'
import styles from "./carousel.module.scss";

const Carousel = ({ data }) => {
  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        <div className={styles.sliderItems} >
          {data.map((element, index) => (
            <div key={index} className={styles.slide}>
              <img src={element.image}
                alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel