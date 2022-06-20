import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom';
import { blue } from '@mui/material/colors';

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