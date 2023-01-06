import { Polyline } from "@react-google-maps/api";
import { useEffect, useState } from "react";

export default function PolyArrow(props) {
    let [arrowPath, setArrowPath] = useState([]);
    let [size, setSize] = useState(1);

    useEffect(() => {
        // 실제 라인을 만드는 코드가 작성됨.
        let path = props.path

        let length = path.length
        for(let i = 1; i < length; i++) {
            const p1 = path[i-1];
            const p2 = path[i];

            let lat_sign = 0;
            let lng_sign = 0;

            if(p1["lat"] - p2["lat"] > 0) lat_sign = -1;
            else                          lat_sign = +1;
            if(p1["lng"] - p2["lng"] > 0) lng_sign = -1;
            else                          lng_sign = +1;
            
            let latdiff = (path[i]["lat"] - path[i-1]["lat"]);
            let lngdiff = (path[i]["lng"] - path[i-1]["lng"]) * lng_sign;
            
            let theta = Math.atan(lngdiff/latdiff)
            console.log(lngdiff, latdiff, theta)
        }

    }, [props.path]);


    return (
        <>
            {
                arrowPath.map((arrow) => {
                    <Polyline path={arrow} options={props.lineOptioons} />
                })
            }
        </>
    )
}