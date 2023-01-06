import { Slider, Typography } from "@mui/material";

export default function ColorSlider(props) {
    return(
        <Slider
            sx={{ color: props.color, mx:2 }} value={props.check} 
            defaultValue={0} min={0} max={255}
            valueLabelDisplay="auto"
            onChange={(e) => props.setColor(e.target.value, props.idf)}
        />
    )
}