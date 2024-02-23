import styles from './Recommendation.module.css';

const NoRecommendation = ({ onRestart }) => {
    return (
        <div className={styles.container} style={{textAlign: 'center'}}>
            <h3 className={styles.muted}><em>We are out of recommendations. :(</em></h3>
            <p>
                Please consider&nbsp;
                <span className={styles.spanLink} onClick={onRestart}>returning to recommendation 1</span>
                &nbsp;or&nbsp;
                <span className={styles.spanLink} onClick={() => window.location.reload()}>modifying your search.</span>
            </p>
        </div>
    );
}

export default NoRecommendation;