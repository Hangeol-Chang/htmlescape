import {Box, Button} from '@mui/material/'

let array = [];
for(let i = 0; i < 100; i++){
    array.push(i);
}

export default function Stage1() {
    return (
        <Box >
            {array.map((n) => (
                    <Button 
                        key={n}
                        variant="contained"
                        sx={{ m:3}}
                    >
                        {n}
                    </Button>
            ))}
        </Box>
    )
}