import styles from './PillCheckbox.module.css';

const PillCheckbox = ({ options, onSelect, selectedOption }) => {
    return <div className={styles.container}>
        {options.map((option, index) =>
            <div
                key={index}
                onClick={() => onSelect(index)}
                className={`${styles.option} ${option === selectedOption ? styles.selected : ''}`}
            >
                {option}
            </div>
        )}
    </div>
}

export default PillCheckbox;