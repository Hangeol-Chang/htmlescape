import { Box, Button, Checkbox, Container, Divider, Fade, FormControlLabel, FormGroup, Input, Menu, MenuItem, Slider, stepConnectorClasses, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Circle, GoogleMap, LoadScript, Polyline, useJsApiLoader } from '@react-google-maps/api'
import {red, blue, green} from "@mui/material/colors"
import ColorSlider from "../components/googlepoly/ColorSlider";
import PolyArrow from "../components/googlepoly/PolyArrow";
import LineController from "../components/googlepoly/LineController";

export default function Googlepoly() {
    // line이 초기화될 때 가지고 있을 값.
    const iniOption = {
        path : [{lat: 37.500142, lng: 127.026444},
            {lat: 37.498578, lng: 127.027175},
            {lat: 37.498282, lng: 127.027248}],
        hhmmdd : false,
        viewLine : true,
        viewMarker : true,
        viewArrow : false,
        hhmmddd : false,
        lngfirst : false,
        lineOption : {
            strokeOpacity: 0.8, strokeWeight: 2,
            clickable: false, draggable: false,
            editable: false, visible: true, zIndex: 1,
            strokeColor: "#0000FF"
        },
        circleOption : {
            strokeOpacity : 0, fillOpacity: 0.4,
            clickable: false, draggable: false,
            editable: false, visible: true,
            radius: 1, zIndex: 1,
            fillColor: "#FF0000"
        }
    }
    let [idfs, setIdfs] = useState([0]);
    let [idfCount, setIdfCount] = useState(1);
    let [options, setOptions] = useState( { 0 : iniOption } )

    function addOptions() { setOptions([...options, iniOption]); console.log(options) }
    
    const configOption = function(idf, opt) {
        console.log(idf, opt)
        setOptions({...options, [idf] : opt}) 
    }
    
    function delOption(idf) {
        let tmpoptions = options
        delete tmpoptions[idf];
        setOptions(tmpoptions);
        setIdfs(idfs.filter((ele) => ele != idf))

    }

    const convertrawCoorditoCoordi = function(coordi) {
        let coordiString = coordi
            .replaceAll("[", "")
            .replaceAll("]", "")
            .replaceAll(" ", "")
            .replaceAll("\t", ",")
            .replaceAll("\n", ",")

        const coordiArr = coordiString.split(",").map(Number); 
        const len = parseInt(coordiArr.length)*2;
        let tmpPath = []

        let latidf = 0;
        let lngidf = 1;
        if(lngfirst) { latidf = 1; lngidf = 0; }
        
        for (let i = 0; i < len; i += 2) {
            let tmplat = coordiArr[i + latidf];
            let tmplng = coordiArr[i + lngidf];

            if(hhmmddd) {
                tmplat = parseInt(tmplat / 100) + tmplat % 100 / 60;
                tmplng = parseInt(tmplng / 100) + tmplng % 100 / 60;
                // tmplat = parseInt(tmplat / 100) + parseInt(tmplat % 100) / 60 + (tmplat % 1)*100 / 3600;
                // tmplng = parseInt(tmplng / 100) + parseInt(tmplng % 100) / 60 + (tmplng % 1)*100 / 3600;
            }
            console.log(tmplat + " " + tmplng)

            if((Math.abs(tmplat) < 1 || Math.abs(tmplng) < 1)) continue;
            if(!tmplat || !tmplng) break;
            
            tmpPath.push({
                "lat" : tmplat,
                "lng" : tmplng
            })
        }

        return tmpPath;
    }
    
    const addLine = function(rawCoordi) {
        let newLine = iniOption;
        newLine.path = convertrawCoorditoCoordi(rawCoordi);

        setOptions({...options, [idfCount] : iniOption });
        setIdfs([...idfs, idfCount])
        setIdfCount(idfCount + 1);
        
        console.log(options)
    }

    let [coordi, setCoordi] = useState("[[37.772, -122.214],[21.291, -157.821],[18.142, 178.431],[27.467, 153.027]]");
    let [path, setPath] = useState([
        {lat: 37.500142, lng: 127.026444},
        {lat: 37.498578, lng: 127.027175},
        {lat: 37.498282, lng: 127.027248},
                
    ]);
    let [zoom, setZoom] = useState(15);
    let [hhmmddd, setHhmmddd] = useState(false);
    let [lngfirst, setLngfirst] = useState(false);

    let [circleColor_r, setCircleColor_r] = useState(255);
    let [circleColor_g, setCircleColor_g] = useState(0);
    let [circleColor_b, setCircleColor_b] = useState(0);

    let [lineColor_r, setLineColor_r] = useState(0);
    let [lineColor_g, setLineColor_g] = useState(0);
    let [lineColor_b, setLineColor_b] = useState(255);

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
        lat: 37.498578, 
        lng: 127.027175,
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

    // string to line format converter
    function makeline() {
        let coordiString = coordi
            .replaceAll("[", "")
            .replaceAll("]", "")
            .replaceAll(" ", "")
            .replaceAll("\t", ",")
            .replaceAll("\n", ",")

        const coordiArr = coordiString.split(",").map(Number); 
        const len = parseInt(coordiArr.length)*2;
        let tmpPath = []
        let totlat = 0;
        let totlng = 0;

        let latidf = 0;
        let lngidf = 1;
        if(lngfirst) { latidf = 1; lngidf = 0; }
        
        let coordicount = 0
        for (let i = 0; i < len; i += 2) {
            let tmplat = coordiArr[i + latidf];
            let tmplng = coordiArr[i + lngidf];

            if(hhmmddd) {
                tmplat = parseInt(tmplat / 100) + tmplat % 100 / 60;
                tmplng = parseInt(tmplng / 100) + tmplng % 100 / 60;
                // tmplat = parseInt(tmplat / 100) + parseInt(tmplat % 100) / 60 + (tmplat % 1)*100 / 3600;
                // tmplng = parseInt(tmplng / 100) + parseInt(tmplng % 100) / 60 + (tmplng % 1)*100 / 3600;
            }
            console.log(tmplat + " " + tmplng)

            if((Math.abs(tmplat) < 1 || Math.abs(tmplng) < 1)) continue;
            if(!tmplat || !tmplng) break;
            
            tmpPath.push({
                "lat" : tmplat,
                "lng" : tmplng
            })

            totlat += tmplat;
            totlng += tmplng;
            coordicount++; 
        }
        totlat = totlat / coordicount;
        totlng = totlng / coordicount;

        setPath(tmpPath)
        setSenter({
            "lat": totlat,
            "lng": totlng
        })
    }

    let [clat1, setClat1] = useState(0.0);
    let [clat2, setClat2] = useState(0.0);
    let [clng1, setClng1] = useState(0.0);
    let [clng2, setClng2] = useState(0.0);
    let [cdist, setCdist] = useState(0.0);

    let [pointerMarker, setPointerMarker] = useState([0, 0]);
    let [selected, setSelected] = useState([{}, {}])
    let [distancebetweenSelected, setDistancebetweenSelected] = useState(0);

    function getDistanceFromLatLonInKm(lat1,lng1,lat2,lng2) {
        function deg2rad(deg) { return deg * (Math.PI/180) }

        console.log(lat1, lat2, lng1, lng2)
    
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lng2-lng1);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return d * 1000;
    }

    const selectCoordi = function(p) {
        if(selected[0].lat) selected[1] = p;
        else                selected[0] = p;

        // 거리 계산
        if(selected[1].lat) {
            setDistancebetweenSelected(getDistanceFromLatLonInKm(selected[0].lat, selected[0].lng, selected[1].lat, selected[1].lng))
            console.log(distancebetweenSelected)
        }
        else setDistancebetweenSelected(0)
    }

    const resetSelect = function() { setSelected([{}, {}]) }

    const setMarker = function(p) {
        setPointerMarker(p)
        setSenter(p)
    }

    let [pointerCircleOptions, ] = useState({
        strokeOpacity : 0, fillOpacity: 0.8,
        clickable: false, draggable: false,
        editable: false, visible: true,
        radius: 1, zIndex: 2,
        fillColor: "#00FFA0"
    })

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };

    return(
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box sx={{display : 'flex', m : 2}}>
                <Box sx={{ width : 420, m : 2, p : 1 , boxShadow : 1, borderRadius : 1}} >
                    <Button variant="outlined" onClick={(e) => setCdist(getDistanceFromLatLonInKm(clat1, clng1, clat2, clng2))}>
                        calc
                    </Button>
                    dist calcurator || {cdist}

                    <Box>
                        <TextField label="lat1" type="number" variant="standard" onChange={(e) => setClat1(e.target.value)}/>
                        <TextField label="lng1" type="number" variant="standard" onChange={(e) => setClng1(e.target.value)}/>
                    </Box>
                    <Box>
                        <TextField label="lat2" type="number" variant="standard" onChange={(e) => setClat2(e.target.value)}/>
                        <TextField label="lng2" type="number" variant="standard" onChange={(e) => setClng2(e.target.value)}/>
                    </Box>
                </Box>

                <Box  sx={{m : 2}} >
                    <TextField
                        variant="outlined"
                        value={coordi}
                        multiline rows={3} label="Input Coordinates"
                        sx={{width:300, height:100}}
                        onChange={(e) => setCoordi(e.target.value)}
                    >
                    </TextField>
                    
                    <Button variant="outlined" onClick={() => addLine(coordi)}>add line</Button>
                    <Box sx={{display : 'flex', alignItems : 'center'}}>
                        <FormControlLabel control={<Checkbox checked={hhmmddd} onChange={(e) => setHhmmddd(e.target.checked)}/>} label="hhmm˚ddd" />
                        <FormControlLabel control={<Checkbox checked={lngfirst} onChange={(e) => setLngfirst(e.target.checked)}/>} label="lng_first" />
                    </Box>
                </Box>

            </Box>
            <Container sx={{display : 'flex', flexDirection : 'row', flexWrap : 'wrap' , mt : 10}}>
            
                {idfs.map((idf) => (
                    <LineController 
                        key={idf} idf={idf} 
                        configCompOption={configOption}
                        option={options[idf]} 
                        delLine={delOption}/>
                ))}

            </Container>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>

                <LoadScript
                    googleMapsApiKey="AIzaSyBkZS2y5XLGTz09p372w0MV4bQgeukEiiQ"
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={zoom}
                    >
                        {/* {
                            viewLine ? <Polyline path={path} options={lineOptions} />
                            : <></>
                        } */}
                        {
                            idfs.map((idf) => (
                                <>
                                    {
                                        options[idf].viewLine ?
                                            <Polyline path={options[idf].path} options={options[idf].lineOption} />
                                        : <></>
                                    }
                                    
                                    {
                                        options[idf].viewMarker ?
                                            <>
                                                {
                                                    options[idf].path.map((c, idx) => (
                                                        <Circle center={c} key={idx} options={options[idf].circleOption} />
                                                    ))
                                                }
                                            </>
                                        : <></>
                                    }
                                </>
                            ))
                        }

                    </GoogleMap>

                </LoadScript>
            </Box>
        </Box>
    )
}