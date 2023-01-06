import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Input, Slider, stepConnectorClasses, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Circle, GoogleMap, LoadScript, Polyline, useJsApiLoader } from '@react-google-maps/api'
import {red, blue, green} from "@mui/material/colors"
import ColorSlider from "../components/googlepoly/ColorSlider";
import PolyArrow from "../components/googlepoly/PolyArrow";

export default function Googlepoly() {
    let [coordi, setCoordi] = useState("[[37.772, -122.214],[21.291, -157.821],[18.142, 178.431],[27.467, 153.027]]");
    let [path, setPath] = useState([
        {lat: 37.772, lng: -122.214},
        {lat: 21.291, lng: -157.821},
        {lat: -18.142, lng: 178.431},
        {lat: -27.467, lng: 153.027}
    ]);
    let [zoom, setZoom] = useState(10);
    let [lngfirst, setLngfirst] = useState(false);

    let [circleColor_r, setCircleColor_r] = useState(255);
    let [circleColor_g, setCircleColor_g] = useState(0);
    let [circleColor_b, setCircleColor_b] = useState(0);

    let [lineColor_r, setLineColor_r] = useState(0);
    let [lineColor_g, setLineColor_g] = useState(0);
    let [lineColor_b, setLineColor_b] = useState(255);

    let [viewLine, setViewLine] = useState(true);
    let [viewMarker, setViewMarker] = useState(true);
    let [viewArrow, setViewArrow] = useState(true);

    let [lineOptions, setLineOptions] = useState({
        strokeOpacity: 0.8, strokeWeight: 2,
        clickable: false, draggable: false,
        editable: false, visible: true,
        radius: 30000, zIndex: 1,
        strokeColor: "#0000FF"
    })

    let [circleOptions, setcircleOptions] = useState({
        strokeOpacity : 0, fillOpacity: 0.35,
        clickable: false, draggable: false,
        editable: false, visible: true,
        radius: 1, zIndex: 1,
        fillColor: "#FF0000"
    })

    let [center, setSenter] = useState({
        lat: -18.142, 
        lng: 178.431,
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

    const setCircleColor = function(val, idf) {
        if(idf == "red")        setCircleColor_r(val);
        else if(idf == "green") setCircleColor_g(val);
        else                    setCircleColor_b(val);

        const tmpColor = "#" + 
            ("0" + circleColor_r.toString(16)).substr(-2) +  
            ("0" + circleColor_g.toString(16)).substr(-2) +  
            ("0" + circleColor_b.toString(16)).substr(-2);  

        setcircleOptions((prevState) => {
            return {...prevState, fillColor : tmpColor}
        })
    }

    const setLineColor = function(val, idf) {
        if(idf == "red")        setLineColor_r(val);
        else if(idf == "blue")  setLineColor_b(val);
        else                    setLineColor_g(val);

        const tmpColor = "#" + 
        ("0" + lineColor_r.toString(16)).substr(-2) +  
        ("0" + lineColor_g.toString(16)).substr(-2) +  
        ("0" + lineColor_b.toString(16)).substr(-2);

        setLineOptions((prev) => {
            return {...prev, strokeColor: tmpColor}
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

        let latidf = 0;
        let lngidf = 1;
        if(lngfirst) { latidf = 1; lngidf = 0; }

        for (let i = 0; i < len; i += 2) {
            console.log(coordiArr[i] + " " + coordiArr[i+1])
            
            tmpPath.push({
                "lat" : coordiArr[i + latidf],
                "lng" : coordiArr[i + lngidf]
            })

            totlat += coordiArr[i + latidf];
            totlng += coordiArr[i + lngidf];
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
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box
                sx={{
                    display : 'flex',
                    m:2, p:2,
                    justifyContent: 'center',
                    maxWidth:800,
                    borderRadius:2,
                    boxShadow:1
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
                        multiline rows={6} label="Input Coordinates"
                        sx={{width:300, height:180}}
                        onChange={(e) => setCoordi(e.target.value)}
                    >
                    </TextField>
                    
                    <Box sx={{display:'flex'}}>
                        <FormControlLabel control={<Checkbox checked={lngfirst} onChange={(e) => setLngfirst(e.target.checked)}/>} label="lng_first" />
                        <Button 
                            sx={{m : 0, width: '100%', height:40}}
                            variant="outlined" 
                            onClick={() => makeline()}
                        >
                            Draw Path
                        </Button>
                    </Box>
                </Box>

                <Box
                    sx={{
                        width : 400, px:2,

                        display:'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box sx={{ display : 'flex', alignItems:'center'}} >
                        <Typography sx={{width:120, mr:2}}>
                            Circle Size
                        </Typography>
                        <Slider
                            defaultValue={1}
                            step={0.002} min={0} max={2}
                            valueLabelDisplay="auto"
                            onChange={(e) => {
                                setcircleOptions((prevState) => {
                                    return {...prevState, radius : e.target.value}
                                })
                            }}
                        />
                    </Box>

                    <Divider sx={{my:2}}/>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Typography sx={{width:120, mr:2}}>
                            Circle Color
                        </Typography>
                        <Box
                            sx={{
                                display:'flex',
                                width:'100%',
                            }}
                        >
                            <ColorSlider color={ red[500] } idf="red"   check={circleColor_r} setColor={setCircleColor} />
                            <ColorSlider color={green[500]} idf="green" check={circleColor_g} setColor={setCircleColor} />
                            <ColorSlider color={ blue[500]} idf="blue"  check={circleColor_b} setColor={setCircleColor} />
                        </Box>
                    </Box>
                    <Divider sx={{my:2}}/>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Typography sx={{width:120, mr:2}}>
                            Line Color
                        </Typography>
                        <Box
                            sx={{
                                display:'flex',
                                width:'100%',
                            }}
                        >
                            <ColorSlider color={ red[500] } idf="red"   check={lineColor_r} setColor={setLineColor} />
                            <ColorSlider color={green[500]} idf="green" check={lineColor_g} setColor={setLineColor} />
                            <ColorSlider color={ blue[500]} idf="blue"  check={lineColor_b} setColor={setLineColor} />
                        </Box>
                    </Box>

                    <Divider sx={{my:2}}/>
                    
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                            
                            >
                            <FormControlLabel control={<Checkbox checked={viewLine} onChange={(e) => setViewLine(e.target.checked)}/>} label="Line" />
                            <FormControlLabel control={<Checkbox checked={viewMarker}  onChange={(e) => setViewMarker(e.target.checked)}/>} label="Marker" />
                            <FormControlLabel control={<Checkbox checked={viewArrow} disabled  onChange={(e) => setViewArrow(e.target.checked)}/>} label="Arrow" />
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
                    {
                        viewLine ? <Polyline path={path} options={lineOptions} />
                        : <></>
                    }
                    
                    {
                        viewArrow ? <PolyArrow path={path} lineOptions={lineOptions} />
                        : <></>
                    }

                    {
                        viewMarker ? 
                            path.map((c, idx) => (
                                <Circle center={c} key={idx} options={circleOptions} />
                            ))
                        : <></>
                    }

                </GoogleMap>

            </LoadScript>
        </Box>
    )
}