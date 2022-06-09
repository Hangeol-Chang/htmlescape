import World from "./World";
import styles from "./Hello.module.css";
import { useState } from "react";

export default function Hello(props) {
    console.log(props)
    function showName(name) {
        console.log(name);
    }
    function showtxt(e) {
        console.log(e)
    }

    // let name = '이름이름'

    const [name, setName] = useState('Mike');
    const [age, setAge] = useState(props.age);
    function changeName() {
        setName(name === "Mike" ? "Jane" : "Mike")
    }

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

            <button onClick={() => {showName(name)}}>showName</button>
            <input onChange={(e) => showtxt(e.target.value)} />
            <hr></hr>

            <div>{name}</div>
            <button onClick={changeName} >이름 바꾸기</button>
        </div>
    )
}