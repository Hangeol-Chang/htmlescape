import { Box, Button, Input, Slider } from "@mui/material";
import { useState } from "react";
import { Circle, GoogleMap, LoadScript, Polyline, useJsApiLoader } from '@react-google-maps/api'

export default function Googlepoly() {
    let [coordi, setCoordi] = useState("[[37.772, -122.214],[21.291, -157.821],[18.142, 178.431],[27.467, 153.027]]");
    let [path, setPath] = useState([
        {lat: 37.772, lng: -122.214},
        {lat: 21.291, lng: -157.821},
        {lat: -18.142, lng: 178.431},
        {lat: -27.467, lng: 153.027}
    ]);
    let [zoom, setZoom] = useState(10);
    
    let [circleRadius, setCirclRadius] = useState(1);
    let [circleColor, serCircleColor] = useState('#FF0000');
    let [lineColor, setLineColor] = useState('#00FF00');

    let [lineOptions, setLineOptions] = useState({
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        zIndex: 1
    })

    let [circleOptions, setcircleOptions] = useState({
        strokeOpacity : 0,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 1,
        zIndex: 1
    })

    let [center, setSenter] = useState({
        lat: 37.497952,
        lng: 127.027619
    });

    const containerStyle = {
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.6
    };

    function makeline() {
        let aa = coordi
            .replaceAll("[", "")
            .replaceAll("]", "")
            .replaceAll("\n", "")
            .replaceAll(" ", "")

        const bb = aa.split(",").map(Number)
        const len = bb.length

        let arr = []
        let circlecoordi = []
        let totlat = 0;
        let totlng = 0;
        for (let i = 0; i < len; i += 2) {
            console.log(bb[i] + " " + bb[i+1])
            
            arr.push({
                "lat" : bb[i],
                "lng" : bb[i+1]
            })

            totlat += bb[i];
            totlng += bb[i+1];
        }
        totlat = totlat / (len/2)
        totlng = totlng / (len/2)

        console.log(arr)
        setPath(arr)
        setSenter({
            "lat": totlat,
            "lng": totlng
        })
    }

    return(
        <Box>
            <Box
                sx={{display : 'flex'}}
            >
                <textarea
                    id="inputcoordi"
                    rows="10"
                    cols="100"
                    value={coordi}
                    onChange={(e) => setCoordi(e.target.value)}
                >
                </textarea>
                <Button 
                    sx={{m : 2}}
                    variant="outlined" 
                    onClick={() => makeline()}
                >
                    이거슨 버튼
                </Button>
                
                원 크기 조정
                <Slider></Slider>
                선 색상 입력
                <Input></Input>
                원 색상 입력
                <Input></Input>
            </Box>

            <LoadScript
                googleMapsApiKey="AIzaSyBkZS2y5XLGTz09p372w0MV4bQgeukEiiQ"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={zoom}
                >                
                    <Polyline path={path} options={lineOptions} ></Polyline>

                    {
                        path.map(c => (
                            <Circle center={c} key={c[0]} options={circleOptions}></Circle>
                        ))
                    }

                </GoogleMap>

            </LoadScript>
        </Box>
    )
}