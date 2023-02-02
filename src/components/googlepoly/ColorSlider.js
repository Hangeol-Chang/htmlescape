import { Slider, Typography } from "@mui/material";
import { useState } from "react";

export default function ColorSlider(props) {
    let [color, setColor] = useState(props.check);

    return(
        <Slider
            sx={{ color: props.color, mx:1 }} value={color} 
            defaultValue={0} min={0} max={255}
            valueLabelDisplay="auto"
            onChange={(e) => setColor(e.target.value)}
            onChangeCommitted={() => props.setColor(color, props.idf)}
        />
    )
}