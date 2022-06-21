import {Box, Button, Typography} from '@mui/material/'
import { render } from '@testing-library/react';
import { useState, setState, Component } from 'react';
import { useNavigate } from 'react-router-dom';

let topbt = [1, 2, 3, 4];
let botbt = [5, 6, 7, 8];

export default function Stage1() {
    let [key, setkey] = useState('');
    const navigate = useNavigate();

    const Setval = (val, e) => {
        console.log(key + " 누른 값 " + val);
        
        if(key.length == 7) {
            if(key === "1685723" && val == 4){
                console.log("pass");
                
                navigate('/stage2');
            }
            else {
                console.log("fail");
                setkey('');
            }
        }
        else setkey(key.concat(val));
    }

    return (
        <Box >
            {topbt.map( n => (
                <Button 
                    key={n}
                    variant="outlined"
                    sx={{ m:3 }}
                    onClick={e => Setval(n, e)}
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

            <input type="hidden" placeholder='btn order is 1 6 8 5 7 2 3 4' />
            
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
                    onClick={e => Setval(n, e)}
                >
                    {n}
                </Button>
            ))}
        </Box>
    )
}