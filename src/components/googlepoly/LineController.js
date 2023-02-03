import { Box, Button, Checkbox, Divider, FormControlLabel, Slider, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, useRadioGroup } from "@mui/material";
import {red, blue, green} from "@mui/material/colors"
import { useEffect, useState } from "react";
import ColorSlider from "./ColorSlider";

export default function LineController(props) {
    let [circleColor_r, setCircleColor_r] = useState(255);
    let [circleColor_g, setCircleColor_g] = useState(0);
    let [circleColor_b, setCircleColor_b] = useState(0);

    let [lineColor_r, setLineColor_r] = useState(0);
    let [lineColor_g, setLineColor_g] = useState(0);
    let [lineColor_b, setLineColor_b] = useState(255);

    let [radius, setRadius] = useState(1);
    let [option, setOption] = useState(props.option);
    let [circleOption, setCircleOption] = useState(props.option.circleOption);
    let [lineOption, setLineOption]     = useState(props.option.lineOption);
    let [viewLine, setViewLine]         = useState(true);
    let [viewMarker, setViewMarker]     = useState(true);

    function delLine() { props.delLine(props.idf) }

    function configCircleRadius(val) { setCircleOption({...circleOption, radius : val}) }

    const changeCircleColor = function(val, idf) {
        if(idf == "red")        setCircleColor_r(val);
        else if(idf == "green") setCircleColor_g(val);
        else                    setCircleColor_b(val);

        const tmpColor = "#" + 
            ("0" + circleColor_r.toString(16)).substr(-2) + 
            ("0" + circleColor_g.toString(16)).substr(-2) +  
            ("0" + circleColor_b.toString(16)).substr(-2);  
    
        setCircleOption({...option, fillColor : tmpColor})
    }

    const changeLineColor = function(val, idf) {
        if(idf == "red")        setLineColor_r(val);
        else if(idf == "green") setLineColor_g(val);
        else                    setLineColor_b(val);

        const tmpColor = "#" + 
            ("0" + lineColor_r.toString(16)).substr(-2) + 
            ("0" + lineColor_g.toString(16)).substr(-2) +  
            ("0" + lineColor_b.toString(16)).substr(-2);  
        
        setLineOption({...option, strokeColor : tmpColor});
    }

    const changeViewLine = function(check) {
        setViewLine(check);
        setLineOption({...lineOption, visible : check});
    }

    const changeViewMarker = function(check) {
        setViewMarker(check);
        setCircleOption({...circleOption, visible : check});
    }

    // 옵션 동기처리
    useEffect(() => {
        setOption({...option, lineOption, circleOption})
    }, [lineOption, circleOption])

    useEffect(() => {
        props.configCompOption(props.idf, option)
    }, [option])

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
                <TableContainer sx={{minWidth : 200, maxHeight : 200}}>
                    <Table aria-label="simple table">
                        <TableBody>
                        {
                            props.option.path.map((row, idx) => (
                                <TableRow hover key={idx} sx={{'&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell sx={{p : 0, width : 20}} component="th" scope="row">{idx}</TableCell>
                                    <TableCell sx={{my : 1, width : 70}} align="left">{row.lat}</TableCell>
                                    <TableCell sx={{p : 0, width : 70}} align="left">{row.lng}</TableCell>
                                </TableRow>
                            ))
                        }  
                        </TableBody>
                    </Table>

                </TableContainer>
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
                        sx={{mx : 1}} defaultValue={1}
                        step={0.002} min={0} max={2}
                        valueLabelDisplay="auto"
                        onChange={(e) => setRadius(e.target.value)}
                        onChangeCommitted={() => configCircleRadius(radius)}
                    />
                </Box>
                <Divider/>
     
                <Box sx={{ display: 'flex', alignItems: 'center' }} >
                    <Typography sx={{width:80}} variant="body2">C Color</Typography>
                    <Box sx={{ display:'flex', width:'100%', }} >
                        <ColorSlider color={ red[500] } idf="red"   check={circleColor_r} setColor={changeCircleColor} />
                        <ColorSlider color={green[500]} idf="green" check={circleColor_g} setColor={changeCircleColor} />
                        <ColorSlider color={ blue[500]} idf="blue"  check={circleColor_b} setColor={changeCircleColor} />
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
                        <ColorSlider color={ red[500] } idf="red"   check={lineColor_r} setColor={changeLineColor} />
                        <ColorSlider color={green[500]} idf="green" check={lineColor_g} setColor={changeLineColor} />
                        <ColorSlider color={ blue[500]} idf="blue"  check={lineColor_b} setColor={changeLineColor} />
                    </Box>
                </Box>

                <Divider/>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>

                    <FormControlLabel control={<Checkbox checked={viewLine} onChange={(e) => changeViewLine(e.target.checked)}/>} label="Line" />
                    <FormControlLabel control={<Checkbox checked={viewMarker}  onChange={(e) => changeViewMarker(e.target.checked)}/>} label="Marker" />
                    <FormControlLabel control={<Checkbox checked={option.viewArrow} disabled  onChange={() => {}}/>} label="Arrow" />
                </Box>
                <Button variant="outlined" color="error" size="small" onClick={() => delLine()}> Del Line</Button>
            </Box>

        </Box>
    )
}