import { Grid, Icon, SvgIcon } from '@mui/material';
import {Button, Typography} from '@mui/material';
import { GitHub, YouTube, Article } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Footer() {
    const devinfo = [
        {
            title : 'email',
            value : 'hgchang1@naver.com'
        },
        {
            title : 'instagram',
            value : '@hihangeol'
        },
    ];
    const copyright = 'ⓒ 2022 hihangeol'
    // 사이트 업데이트 내역 알려주는거 있으면 괜찮을듯.
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
        <footer style={{
                background: "#798BBC",
                color : 'white',
                padding : '10px',
            }}>
            <Grid container spacing={0} justify="space-evenly">
                <GitHub></GitHub>
                <YouTube></YouTube>
                <Article></Article>
            </Grid>
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

            <div>
                {copyright}
            </div>
        </footer>
    )
}