import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function DistCalculator() {
    let [clat1, setClat1] = useState(0.0);
    let [clat2, setClat2] = useState(0.0);
    let [clng1, setClng1] = useState(0.0);
    let [clng2, setClng2] = useState(0.0);
    let [cdist, setCdist] = useState(0.0);

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

    return(
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
    )
}