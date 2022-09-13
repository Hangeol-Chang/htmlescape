import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Canvas } from "react-three-fiber";

import Table_Wood_1 from "./Table_wood_1";

export default function Stage3() {

    return (
        <Box>
            <Typography>
                Stage3
            </Typography>

            <Canvas>
                <ambientLight intensity={1}/>
                
                <Table_Wood_1 />
            </Canvas>
        </Box>
    )
}