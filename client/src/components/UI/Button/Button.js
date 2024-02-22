import styles from './Button.module.css';

const Button = ({ className, style, color, children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`${styles.button} ${className}`}
            style={{ backgroundColor: `var(--${color || 'secondary'})`, ...style }}
        >
            {children}
        </button>
    );
}

export default Button;