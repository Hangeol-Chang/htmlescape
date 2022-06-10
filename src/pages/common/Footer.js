import Grid from '@mui/material/Grid';
import {Button, Typography} from '@mui/material/';
import { Link } from 'react-router-dom';

export default function Footer() {
    const links = [
        {
            name: 'About',
            link : '/About'
        },
        {
            name : 'p1',
            link : '#'
        },
        {
            name : 'p2',
            link : '#'
        }
    ];

    return (
        <footer style={{background: "#798BBC"}}>
            <Grid container spacing={0} justify="space-evenly">
                {links.map(link => (
                    <Grid item xs key={link.name} sx={{ my : 2}}>
                        <Typography color="white" gutterBottom>
                            <Button variant='text' href={link.link} style={{color : 'white'}}>
                                {link.name}
                            </Button>
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </footer>
    )
}