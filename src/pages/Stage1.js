import {Box, Button, Typography} from '@mui/material/'
import { useState } from 'react';

let topbt = [1, 2, 3, 4];
let botbt = [5, 6, 7, 8];

export default function Stage1() {
    const [key, setkey] = useState([]);
    
    function setval(val, e) {
        console.log(val);
    }

    return (
        <Box >
            {topbt.map( n => (
                <Button 
                    key={n}
                    variant="outlined"
                    sx={{ m:3 }}
                    onClick={e => setval(n, e)}
                >
                    {n}
                </Button>
            ))}
            <h2>Hello! umm... it seems there are some buttons you can click.</h2>
            <Typography>
                find the correct order to escape this page.<br></br>
                to find correct order, you may need to search everywhere you can approach.<br></br>
                such as... 
            </Typography>

            <input type="hidden" placeholder='btn order is 1 8 6 5 7 2 3 4' />
            
            <Typography sx={{ fontWeight: 'bold'}}>
                developer tools?
            </Typography>
            <Typography sx={{ fontSize : '6px' }}>
                oops! why line break is occur between ... and developer ?
            </Typography>
            
            {botbt.map( n => (
                <Button
                    key={n}
                    variant="outlined"
                    sx={{ m:3 }}
                >
                    {n}
                </Button>
            ))}
        </Box>
    )
}