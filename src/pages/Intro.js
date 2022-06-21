import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import { Typography } from '@mui/material';

export default function Intro() {

    return (
        <Box sx={{
            height : "100%",
            my: 'auto',
            mx : 2,
            px : 'auto',
            justifyContent : 'center'
        }}>
            <h1>Hello! Welcome to the Html Escape</h1>
            <Typography variant='body1' sx={{ m:3 }}>
                you can play this game with PC.
                <br></br>
                this appllication doesn`t support mobile enviroment.
                <br></br>
                thank you for playing.
            </Typography>
            <Link to="/stage1"
                style={
                    {
                        color : 'white',
                        backgroundColor : '#754685',
                        padding : '10px',
                        textDecoration : 'none',
                        borderRadius : '5px',
                        margin : '10px',
                    }
                }
                >
                Start Escape
            </Link>
            <hr></hr>
        </Box>
    );
}