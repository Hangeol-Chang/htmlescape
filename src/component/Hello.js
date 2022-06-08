import World from "./World";
import styles from "./Hello.module.css";

export default function Hello() {
    return (
        <div>
            <span style={
                {
                    color : '#f00',
                    borderRight: '12px solid #000'
                }
            }>Hello</span>
            <div className={styles.box}>style test</div>
            <World />
        </div>
    )
}