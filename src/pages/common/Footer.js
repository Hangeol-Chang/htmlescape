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
                padding : '20px',
            }}>
            <Grid container spacing={3} justifyContent="center"
               sx={{ mb : 2, }}
            >
                <Grid item>
                    <a href="https://github.com/Hangeol-Chang"  style={{ color : 'white' }}>
                        <GitHub></GitHub>
                    </a>
                </Grid>
                <Grid item>
                    <a href="https://www.youtube.com/channel/UCFHxE7grCP07kWQqkZYuf9A"  style={{ color : 'white' }}>
                        <YouTube></YouTube>
                    </a>
                </Grid>
                <Grid item>
                    <a href="https://hangeol-chang.github.io"  style={{ color : 'white' }}>
                        <Article></Article>
                    </a> 
                </Grid>
            </Grid>
            
            {devinfo.map(info => (
                <Typography variant='body2' key={info.title}>
                    <span style={{fontWeight:700,}}>
                        {info.title}
                    </span>
                    <span> : </span>
                    <span>
                        {info.value}
                    </span>
                </Typography>
            ))}

            {/* <Grid container spacing={0} justify="space-evenly">
                {links.map(link => (
                    <Grid item xs key={link.name} sx={{ my : 2}}>
                        <Typography color="white" gutterBottom>
                            <Button variant='text' href={link.link} style={{color : 'white'}}>
                                {link.name}
                            </Button>
                        </Typography>
                    </Grid>
                ))}
            </Grid> */}

            <Typography variant='subtitle2' sx={{mt : 2}}>
                {copyright}
            </Typography>
        </footer>
    )
}