import styles from './Recommendation.module.css'

function Recommendation({ number, parking_lot }) {
  return (
    <div className={styles.container}>
      <h2>{number}. <span className={styles.title}>{parking_lot.lot_name}</span></h2>
      <p><em>{parking_lot.feetToDestination} feet from your destination</em></p>
    </div>
  );
}

export default Recommendation;
