import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material/';

export default function Footer() {
    const footers = [
        {
        title: 'Company',
        description: ['Team', 'History', 'Contact us', 'Locations'],
        },
        {
        title: 'Features',
        description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
        },
        {
        title: 'Resources',
        description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
        },
        {
        title: 'Legal',
        description: ['Privacy policy', 'Terms of use'],
        },
    ];

    return (
        <footer style={{background: "#53629F"}}>
            <Grid container spacing={0} justify="space-evenly">
                {footers.map(footer => (
                    <Grid item xs key={footer.title} sx={{ my : 2}}>
                        <Typography variant="h6" color="textPrimary" gutterBottom>
                            {footer.title}
                        </Typography>
                        {footer.description.map(item => (
                        <Typography key={item} variant="subtitle1" color="textSecondary">
                            {item}
                        </Typography>
                    ))}
                    </Grid>
                ))}
            </Grid>
        </footer>
    )
}