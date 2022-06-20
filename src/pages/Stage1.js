import {Box, Button, Typography} from '@mui/material/'
import { render } from '@testing-library/react';
import { useState, setState, Component } from 'react';

let topbt = [1, 2, 3, 4];
let botbt = [5, 6, 7, 8];

class Stage1 extends Component {
    state = {
        key : '',
    };

    constructor() {
        super();
        console.log("stage1 시작");
        this.setval = this.setval.bind(this);
    }
    
    setval = (val, e) => {
        console.log(this.state.key + " 누른 값 " + val);
    
        // setkey가 비동기로 작동해서, 이를 동기로 바꾸기 위해 콜백함수를 이용.
        // setkey(key.concat(val));
        
        this.setState({ key : this.state.key.concat(val) }, () => {
            let keyc = this.state.key;
            console.log("현재 키 값 : " + keyc + " 키 길이 : " + keyc.length)
    
            if(keyc.length == 8) {
                if(keyc === '18657234'){
                    console.log("pass")
                }            
                else{
                    console.log('fail')
                    this.state.key = '';
                }
            }
        });
    }

    render() {

        return (
            <Box >
                {topbt.map( n => (
                    <Button 
                        key={n}
                        variant="outlined"
                        sx={{ m:3 }}
                        onClick={e => this.setval(n, e)}
                    >
                        {n}
                    </Button>
                ))}
                <h2>Hello! umm... it seems there are some buttons you can click.</h2>
                <Typography>
                    find the correct order to escape this page.<br></br>
                    to find correct order, you may need to search everywhere you can approach.<br></br>
                    such as... 
                </Typography>
    
                <input type="hidden" placeholder='btn order is 1 8 6 5 7 2 3 4' />
                
                <Typography sx={{ fontWeight: 'bold'}}>
                    developer tools?
                </Typography>
                <Typography sx={{ fontSize : '6px' }}>
                    oops! why line break is occur between ... and developer ?
                </Typography>
                
                {botbt.map( n => (
                    <Button
                        key={n}
                        variant="outlined"
                        sx={{ m:3 }}
                        onClick={e => this.setval(n, e)}
                    >
                        {n}
                    </Button>
                ))}
            </Box>
        )
    }
}
export default Stage1