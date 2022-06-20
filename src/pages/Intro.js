import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom';

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
            <Link to="/stage1">Start Escape</Link>
            <hr></hr>
        </Box>
    );
}