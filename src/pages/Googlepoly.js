import { Box, Button, Input, Slider, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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

    let [containerStyle, setContainerStyle] = useState({
        width: window.innerWidth,
        height: window.innerHeight * 0.8
    });

    function handleResize() {
        setContainerStyle({
            width: window.innerWidth,
            height: window.innerHeight * 0.8
        })
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    function changeCircleSize(size) {
        setcircleOptions({
            strokeOpacity : 0,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            radius: size,
            zIndex: 1
        })
    }

    function makeline() {
        let coordiString = coordi
            .replaceAll("[", "")
            .replaceAll("]", "")
            .replaceAll("\n", "")
            .replaceAll(" ", "")

        const coordiArr = coordiString.split(",").map(Number)
        const len = coordiArr.length

        let tmpPath = []
        let totlat = 0;
        let totlng = 0;
        for (let i = 0; i < len; i += 2) {
            console.log(coordiArr[i] + " " + coordiArr[i+1])
            
            tmpPath.push({
                "lat" : coordiArr[i],
                "lng" : coordiArr[i+1]
            })

            totlat += coordiArr[i];
            totlng += coordiArr[i+1];
        }
        totlat = totlat / (len/2)
        totlng = totlng / (len/2)

        // console.log(path)
        setPath(tmpPath)
        setSenter({
            "lat": totlat,
            "lng": totlng
        })
    }

    return(
        <Box>
            <Box
                sx={{
                    display : 'flex',
                    m:2,
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        display : 'flex',
                        flexDirection: 'column',
                        mx : 2
                    }}
                >
                    <TextField
                        variant="outlined"
                        id="inputcoordi"
                        value={coordi}
                        multiline
                        maxRows={5}
                        sx={{width:300, height:150}}
                        onChange={(e) => setCoordi(e.target.value)}
                    >
                    </TextField>

                    <Button 
                        sx={{m : 0, width:300, height:40}}
                        variant="outlined" 
                        onClick={() => makeline()}
                    >
                        Draw Path
                    </Button>
                </Box>
                
                <Box
                    sx={{
                        backgroundColor: 'white',
                        width : 400,
                        px:2
                    }}
                >
                    <Box
                        sx={{
                            display : 'flex',
                            alignItems:'center'
                        }}
                    >
                        <Typography sx={{width:100, mr:2}}>
                            Circle Size
                        </Typography>
                        <Slider
                            aria-label="Always visible"
                            defaultValue={0.1}
                            step={0.01}
                            min={0}
                            max={2}
                            valueLabelDisplay="auto"
                            onChange={(e) => changeCircleSize(e.target.value)}
                        />
                    </Box>
                    
                </Box>
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