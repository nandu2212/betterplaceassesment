import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import  {Grid2,Button, Typography, CircularProgress } from '@mui/material'
import axios from 'axios'
import ResultCard from "./resultCard";
import {setPoints,setBet,setBetStatus,setOutput} from '../store/gamereducer'
const GameCard=()=>{
    const dispatch=useDispatch();
const { points, betStatus, rolling,outPut } = useSelector((state) => state.Game)
    // const [points, setPoints] = useState(300);
    const [betType, setBetType] = useState(null);
    const [betAmount, setBetAmount] = useState(0);
    // const [rolling, setRolling] = useState(false)
    const [amountindex, setAmountIndex] = useState(null);
    const [typeIndex, settypeIndex] = useState(null)
    // const [betStatus, setbetStatus] = useState(false)
    // const [output, setOutput] = useState({})
    const handleDieRoll = async () => {
        // setRolling(true);
        dispatch(setBetStatus({betStatus:false,rolling:true}))
        setTimeout(async () => {
            const response = await axios.post('http://localhost:5000/roll', { betAmount, betType });
            console.log(response.data);
        
            dispatch(setOutput(response.data))
            // setPoints(points + response.data.earnedPoints)
            dispatch(setPoints(response.data.earnedPoints))
            // setOutput(response.data);
            // setbetStatus(true);
            // setRolling(false)
            console.log(points,"points")
            dispatch(setBetStatus({betStatus:true,rolling:true}))
            settypeIndex(null)
            setAmountIndex(null)
        }, 2000)
    
}
const BetStatus=()=>{
    // setbetStatus(false)
    setBetAmount(0)
    setBetType(null)
}
    return (
        !betStatus ?
            (<Grid2 container direction="column" justifyContent="center" alignitems="center" spacing={4}>
                <Grid2 item>
                    <Typography variant="h3">CurrentPoints : {points}</Typography>
                </Grid2>
                <Grid2 item>
                    <Typography variant="h6">place your bet </Typography>
                    <Grid2 item container spacing={3} justifyContent="center">
                        {[100, 200, 500].map((amount, index) => (
                            <Button variant={index == amountindex ? "contained" : "outlined"} onClick={() => { setBetAmount(amount); setAmountIndex(index) }} disabled={points < amount || rolling}>{amount}</Button>)
                        )}
                    </Grid2>
                </Grid2>
                <Grid2>
                <Typography variant="h6">choose your option </Typography>
                <Grid2 item container spacing={3} justifyContent="center">
                    {
                        ["Below", "Equalto", "Above"].map((condition, index) => (
                            <Button variant={index == typeIndex ? "contained" : "outlined"} onClick={() => { setBetType(condition); settypeIndex(index) }} disabled={points<100 || rolling} >{condition} 7</Button>
                        ))
                    }

                </Grid2>
                </Grid2>
                {
                    betType && betAmount > 0 ?
                        <Grid2 item>
                            <Button onClick={() => handleDieRoll()}>{rolling ? <CircularProgress size={24} /> : 'Roll Dice'}</Button>
                        </Grid2> : ''
                }
            </Grid2>)
            : (<ResultCard />)

    )
}
export default GameCard