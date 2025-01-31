import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import  {Grid2,Button, Typography, CircularProgress } from '@mui/material'
import axios from 'axios'
import ResultCard from "./resultCard";
import {setPoints,setBet,setBetStatus,setOutput} from '../store/gamereducer'
const GameCard=()=>{
    const dispatch=useDispatch();
    const { points, betStatus, rolling } = useSelector((state) => state.Game)
    const [betType, setBetType] = useState(null);
    const [betAmount, setBetAmount] = useState(0);
    
    const [amountIndex, setAmountIndex] = useState(null);
    const [typeIndex, setTypeIndex] = useState(null)
    const handleDieRoll = async () => {
        dispatch(setBetStatus({betStatus:false,rolling:true}))
        dispatch(setBet({amount:betAmount,type:betType}))
        setTimeout(async () => {
            const response = await axios.post('http://localhost:5000/roll', { betAmount, betType });
            dispatch(setOutput(response.data))
            dispatch(setPoints(response.data.earnedPoints))
            dispatch(setBetStatus({betStatus:true,rolling:true}))
            setTypeIndex(null)
            setAmountIndex(null)
        }, 2000)
    
}

    return (
        !betStatus ?
            (
            <Grid2 container direction="column" justifyContent="center" alignItems="center" spacing={4} sx={{ padding: 3 }}>
                {/* Current Points */}
                <Grid2 item>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#3f51b5', marginBottom: 2 }}>
                        Current Points: {points}
                    </Typography>
                </Grid2>
            
                {/* Bet Amount Section */}
                <Grid2 item>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555', marginBottom: 2 }}>
                        Place Your Bet
                    </Typography>
                    <Grid2 item container spacing={3} justifyContent="center">
                        {[100, 200, 500].map((amount, index) => (
                            <Button
                                key={amount}
                                variant={index === amountIndex ? 'contained' : 'outlined'}
                                onClick={() => { setBetAmount(amount); setAmountIndex(index); }}
                                disabled={points < amount || rolling}
                                sx={{
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    padding: '10px 20px',
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: '#3f51b5',
                                        borderColor: '#3f51b5',
                                        color: 'white',
                                    }
                                }}
                            >
                                {amount}
                            </Button>
                        ))}
                    </Grid2>
                </Grid2>
            
                {/* Bet Type Section */}
                <Grid2 item>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555', marginBottom: 2 }}>
                        Choose Your Option
                    </Typography>
                    <Grid2 item container spacing={3} justifyContent="center">
                        {["Below", "Equalto", "Above"].map((condition, index) => (
                            <Button
                                key={condition}
                                variant={index === typeIndex ? 'contained' : 'outlined'}
                                onClick={() => { setBetType(condition); setTypeIndex(index); }}
                                disabled={points < 100 || rolling}
                                sx={{
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    padding: '10px 20px',
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: '#3f51b5',
                                        borderColor: '#3f51b5',
                                        color: 'white',
                                    }
                                }}
                            >
                                {condition} 7
                            </Button>
                        ))}
                    </Grid2>
                </Grid2>
            
                {/* Roll Dice Button */}
                {betType && betAmount > 0 ? (
                    <Grid2 item>
                        <Button
                            variant="contained"
                            onClick={() => handleDieRoll()}
                            disabled={rolling}
                            sx={{
                                padding: '12px 30px',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                borderRadius: 3,
                                backgroundColor: '#3f51b5',
                                '&:hover': {
                                    backgroundColor: '#303f9f',
                                }
                            }}
                        >
                            {rolling ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Roll Dice'}
                        </Button>
                    </Grid2>
                ) : null}
            </Grid2>
            ):<ResultCard/>

    )
}
export default GameCard