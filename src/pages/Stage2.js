import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Stage2() {
    let [btn1, setbtn1] = useState([1]);
    let [btn2, setbtn2] = useState([1]);
    const navigate = useNavigate();
    
    useEffect(() => {
        // console.log("stage2 생성")

        for(let i = 0; i < 20; i++) {
            let a = Math.round(Math.random()*100);
            if(a != 39 && !btn1.includes(a)){
                setbtn1((btn1) => [a, ...btn1]);
            }

            a = Math.round(Math.random()*100);
            if(a != 39 && !btn1.includes(a)){
                setbtn2((btn2) => [a, ...btn2]);
            }
        }
    }, [])
    
    let clickbtn = (val) => {
        // console.log(val);
        if(val == 39){
            // console.log("pass");
            navigate('/stage3');
        }
    }


    let randpx = () => 
        Math.round(Math.random()*180)  + 20 + 'px'

    return(
        <Box>
            <Grid container spacing={3} justifyContent="center">
                {btn1.map((num, index) => (
                    <Grid item key={index}>
                        <Button onClick={(e) => clickbtn(e.target.innerText) }
                            variant={ num > 40 ? 'contained' : 'outlined'}
                            sx = {{minWidth : randpx()}}>
                            {num}
                        </Button>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{m:3}}>
                <Typography variant="h4">
                    Welcome Stage2
                </Typography>
                <Typography variant="body1">
                    this stage is pretty simple.<br />
                    you just need to click button 39<br />
                    ...<br />
                    what? there isn`t button 39? <br/>
                    coneon~ don`t border me.<br />
                    you can 'make' it yourself, aren`t you?
                </Typography>
            </Box>

            <Grid container spacing={3} justifyContent="center">
                {btn2.map((num, index) => (
                    <Grid item key={index}>
                        <Button onClick={(e) => clickbtn(e.target.innerText)}
                            variant={ num > 40 ? 'contained' : 'outlined' }
                            sx = {{minWidth : randpx()}}>
                            {num}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}