import { Box } from "@mui/system";
import React from "react";
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api'

export default function Googlepoly() {
    let [coordi, setCoordi] = React.useState([]);

    const containerStyle = {
        width: '400px',
        height: '400px'
    };
    
    const center = {
        lat: -3.745,
        lng: -38.523
    };

    return(
        <Box>
            <textarea
                id="inputcoordi"
                rows="10"
                cols="100"
                value=""
            >
            [
                [80.00, 24.22],
                [80.00, 160.66]
            ]
            </textarea>
            <LoadScript
                googleMapsApiKey="AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"
            >
                <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                >
                { /* Child components, such as markers, info windows, etc. */ }
                <></>
                </GoogleMap>
            </LoadScript>
        </Box>
    )
}