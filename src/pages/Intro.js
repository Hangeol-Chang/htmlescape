import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

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
            <Button href='htmlescape/stage1' variant="outlined" color="primary">
                Start Escape
            </Button>
            <hr></hr>
        </Box>
    );
}