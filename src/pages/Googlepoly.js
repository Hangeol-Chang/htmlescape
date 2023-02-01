import { Box, Button, Checkbox, Container, Divider, FormControlLabel, FormGroup, Input, Slider, stepConnectorClasses, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Circle, GoogleMap, LoadScript, Polyline, useJsApiLoader } from '@react-google-maps/api'
import {red, blue, green} from "@mui/material/colors"
import ColorSlider from "../components/googlepoly/ColorSlider";
import PolyArrow from "../components/googlepoly/PolyArrow";
import LineController from "../components/googlepoly/LineController";

export default function Googlepoly() {
    // line이 초기화될 때 가지고 있을 값.
    const iniOption = {
        path : [],
        hhmmdd : false,
        viewLine : true,
        viewMarker : true,
        viewArrow : false,
        hhmmddd : false,
        lngfirst : false,
        lineOption : {
            strokeOpacity: 0.8, strokeWeight: 2,
            clickable: false, draggable: false,
            editable: false, visible: true,
            radius: 30000, zIndex: 1,
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

    let [options, setOptions] = useState([ iniOption ])

    function addOptions() { setOptions([...options, iniOption]); console.log(options) }
    
    function delOption(idx) {
        let tmpoptions = options
        tmpoptions.splice(idx, 1)
        setOptions([...tmpoptions]);
        console.log(...tmpoptions)
    }
    
    function configCompOptions(idx, idf, val) {
        switch(idf) {
            case "aa":

                break;
            case "radius":

                break;
            default :
                console.log("no matched idf for : " + idf);
        }

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
        console.log(coordi)
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
            <Button sx={{position : 'fixed', left : 40, top : 90}} variant="outlined" onClick={() => addOptions()}>
                add line
            </Button>
            <Container sx={{display : 'flex', flexDirection : 'row', flexWrap : 'wrap' , mt : 10}}>
            
                {options.map((option, idx) => (<LineController key={idx} option={option} idx={idx} delLine={delOption}/>))}

            </Container>
            <Box
                sx={{
                    display : 'flex',
                    m:2, p:2,
                    justifyContent: 'center',
                    maxWidth:1000,
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
                        sx={{width:400, height:180}}
                        onChange={(e) => setCoordi(e.target.value)}
                    >
                    </TextField>
                    
                    <Box sx={{display:'flex', alignItems:'center'}}>
                        <FormControlLabel control={<Checkbox checked={hhmmddd} onChange={(e) => setHhmmddd(e.target.checked)}/>} label="hhmm˚ddd" />
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
                <Box>
                    <TextField label="lat2" type="number" variant="standard" onChange={(e) => setClat2(e.target.value)}/>
                    <TextField label="lng2" type="number" variant="standard" onChange={(e) => setClng2(e.target.value)}/>
                </Box>
                
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Box sx={{position : 'absolute', right : 20, top : 80}}>
                    <Button
                        variant='outlined'
                        sx={{color : red[300]}}
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        view Path
                    </Button>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                        'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                        PaperProps={{
                            style: {
                            maxHeight: 800,
                            width: 330,
                            },
                        }}
                    >
                        <Box sx={{mx:1}}>
                            <Button size="small" onClick={() => resetSelect()}>reset select</Button>
                            <Typography variant="body1">selected 0 :</Typography>
                            <Typography variant="body2">{selected[0].lat + " || " + selected[0].lng}</Typography>
                            <Typography variant="body1">selected 1 :</Typography>
                            <Typography variant="body2">{selected[1].lat + " || " + selected[1].lng}</Typography>
                            <Typography variant="body1">distance :</Typography>
                            <Typography variant="body2">{distancebetweenSelected}</Typography>

                        </Box>
                        <Divider sx={{ my : 2 }}></Divider>
                        {
                            path.map((p, idx) => (
                                <MenuItem onClick={(e) => selectCoordi(p)}
                                    onPointerEnter={(e) => setMarker(p)}
                                >
                                    {idx} || {p.lat} ||  {p.lng}
                                </MenuItem>
                            ))
                        }
                    </Menu>
                </Box>
                <Box
                    sx={{
                        display : 'flex',
                        m:2, p:2,
                        justifyContent: 'center',
                        maxWidth:1000,
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
                            sx={{width:400, height:180}}
                            onChange={(e) => setCoordi(e.target.value)}
                        >
                        </TextField>
                        
                        <Box sx={{display:'flex', alignItems:'center'}}>
                            <FormControlLabel control={<Checkbox checked={hhmmddd} onChange={(e) => setHhmmddd(e.target.checked)}/>} label="hhmm˚ddd" />
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
                        
                        {/* {
                            viewArrow ? <PolyArrow path={path} lineOptions={lineOptions} />
                            : <></>
                        } */}

                        {
                            viewMarker ? 
                                path.map((c, idx) => (
                                    <Circle center={c} key={idx} options={circleOptions} />
                                ))
                            : <></>
                        }

                        <Circle center={pointerMarker} options={pointerCircleOptions} />

                    </GoogleMap>

                </LoadScript>
            </Box>
        </Box>
    )
}