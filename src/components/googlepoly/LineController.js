import { Box, Button, Checkbox, Divider, FormControlLabel, Slider, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material";
import {red, blue, green} from "@mui/material/colors"
import { useEffect, useState } from "react";
import ColorSlider from "./ColorSlider";

export default function LineController(props) {
    let [circleColor, setCircleColor] = useState([255, 0, 0])
    let [lineColor, setLineColor] = useState([0, 0, 255]);

    function delLine() { props.delLine(props.idf) }

    function setHhmmddd(val) { props.option.configCompOptions(props.idx, 'hhmmddd', val) }
    function setLngfirst() {

    }
    function setCircleRadius(val) {
        // 부모 함수 호출
        props.option.configCompOptions(props.idx, 'radius', val)
    }
    function setViewLine(val) {

    }
    function setViewMarker(val) {

    }
    function setViewArrow(val) {

    }

    const changeCircleColor = function(val, idf) {
        if(idf == "red")        setCircleColor([val, circleColor[1], circleColor[2]]);
        else if(idf == "green") setCircleColor([circleColor[0], val, circleColor[2]]);
        else                    setCircleColor([circleColor[0], circleColor[1], val]);

        const tmpColor = "#" + 
            ("0" + circleColor[0].toString(16)).substr(-2) + 
            ("0" + circleColor[1].toString(16)).substr(-2) +  
            ("0" + circleColor[2].toString(16)).substr(-2);  
    
        // props.setCircleColor(props.idx, tmpColor)
    }
    const changeLineColor = function(val, idf) {
        if(idf == "red")        setLineColor([val, lineColor[1], lineColor[2]]);
        else if(idf == "green") setLineColor([lineColor[0], val, lineColor[2]]);
        else                    setLineColor([lineColor[0], lineColor[1], val]);

        const tmpColor = "#" + 
            ("0" + lineColor[0].toString(16)).substr(-2) + 
            ("0" + lineColor[1].toString(16)).substr(-2) +  
            ("0" + lineColor[2].toString(16)).substr(-2);  
    
        // props.setCircleColor(props.idx, tmpColor)
    }

    useEffect(() => {
        console.log(props.option)
    }, [])

    return (
        <Box 
            sx={{
                m:1, p:1,
                display : 'flex',
                justifyContent : 'center',
                borderRadius : 1,
                boxShadow : 1,
            }}
        >
            <Box
                sx={{
                    display : 'flex',
                    flexDirection : 'column',
                    justifyContent : 'space-between',
                    mx : 0
                }}
            >
                <Table sx={{ minWidth: 50 }} aria-label="simple table">
                    <TableBody>
                    {props.option.path.map((row, idx) => (
                        <TableRow hover key={idx} sx={{'&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell sx={{py : 1}} component="th" scope="row">{idx}</TableCell>
                            <TableCell sx={{p : 0}} align="right">{row.lat}</TableCell>
                            <TableCell sx={{p : 0}} align="right">{row.lng}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>

                <Box sx={{display : 'flex', alignItems : 'center'}}>
                    <FormControlLabel control={<Checkbox checked={props.option.hhmmddd} onChange={(e) => setHhmmddd(e.target.checked)}/>} label="hhmm˚ddd" />
                    <FormControlLabel control={<Checkbox checked={props.option.lngfirst} onChange={(e) => setLngfirst(e.target.checked)}/>} label="lng_first" />
                </Box>
            </Box>
            
            <Divider  sx={{px : 1 }} orientation='vertical' />

            <Box
                sx={{
                    width : 240 , px : 1,
                    display : 'flex',
                    flexDirection : 'column',
                    justifyContent : 'space-between',
                }}
            >
                <Box sx={{ display : 'flex', alignItems:'center'}} >
                    <Typography sx={{width:80}} variant="body2" >C Size</Typography>
                    <Slider
                        sx={{mx : 1}}
                        defaultValue={1}
                        step={0.002} min={0} max={2}
                        valueLabelDisplay="auto"
                        onChange={(e) => setCircleRadius(e.target.value)}
                    />
                </Box>
                <Divider/>
     
                <Box sx={{ display: 'flex', alignItems: 'center' }} >
                    <Typography sx={{width:80}} variant="body2">C Color</Typography>
                    <Box sx={{ display:'flex', width:'100%', }} >
                        <ColorSlider color={ red[500] } idf="red"   check={circleColor[0]} setColor={changeCircleColor} />
                        <ColorSlider color={green[500]} idf="green" check={circleColor[1]} setColor={changeCircleColor} />
                        <ColorSlider color={ blue[500]} idf="blue"  check={circleColor[2]} setColor={changeCircleColor} />
                    </Box>
                </Box>
                <Divider/>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{width:80}} variant='body2'>
                        L Color
                    </Typography>
                    <Box sx={{ display:'flex', width:'100%',}}>
                        <ColorSlider color={ red[500] } idf="red"   check={lineColor[0]} setColor={changeLineColor} />
                        <ColorSlider color={green[500]} idf="green" check={lineColor[1]} setColor={changeLineColor} />
                        <ColorSlider color={ blue[500]} idf="blue"  check={lineColor[2]} setColor={changeLineColor} />
                    </Box>
                </Box>

                <Divider/>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>

                    <FormControlLabel control={<Checkbox checked={props.option.viewLine} onChange={(e) => setViewLine(e.target.checked)}/>} label="Line" />
                    <FormControlLabel control={<Checkbox checked={props.option.viewMarker}  onChange={(e) => setViewMarker(e.target.checked)}/>} label="Marker" />
                    <FormControlLabel control={<Checkbox checked={props.option.viewArrow} disabled  onChange={(e) => setViewArrow(e.target.checked)}/>} label="Arrow" />
                </Box>
                <Button variant="outlined" color="error" size="small" onClick={() => delLine()}> Del Line</Button>
            </Box>

        </Box>
    )
}