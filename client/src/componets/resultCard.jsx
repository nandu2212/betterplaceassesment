import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { CancelOutlined, CheckCircleOutline } from '@mui/icons-material'
import {setBetStatus} from '../store/gamereducer'
const ResultCard = () => {
    const dispatch=useDispatch();
    const { earnedPoints, roll1, roll2, total } = useSelector((state) => state.Game.outPut)
    const {betType,currentBet}=useSelector((state)=>state.Game)
    return (
        <Card sx={{ 
            maxWidth: 345, 
            margin: 'auto', 
            borderRadius: 2, 
            boxShadow: 5, 
            backgroundColor: '#f5f5f5', 
            padding: 3 
        }}>
            <CardContent sx={{ textAlign: 'center' }}>
                <Typography 
                    variant="h3" 
                    sx={{ 
                        fontWeight: 'bold', 
                        color: '#3f51b5', 
                        marginBottom: 2 
                    }}
                >
                    Bet Status
                </Typography>
                <Typography 
                    variant="h6" 
                    sx={{ marginTop: 1, color: '#555' }}
                >
                    Die1 result: {roll1}
                </Typography>
                <Typography 
                    variant="h6" 
                    sx={{ marginTop: 1, color: '#555' }}
                >
                    Die2 result: {roll2}
                </Typography>
                <Typography 
                    variant="h6" 
                    sx={{ marginTop: 1, color: '#555' }}
                >
                    Total: {total}
                </Typography>
                <Typography 
                    variant="h6" 
                    sx={{ fontWeight: 'bold', marginTop: 1, color: '#555' }}
                >
                    You placed a bet of {currentBet} on {betType} 7
                </Typography>
                
                {earnedPoints < 0 ? (
                    <>
                        <CancelOutlined 
                            color="error" 
                            sx={{ fontSize: 50, marginTop: 3 }} 
                        />
                        <Typography 
                            variant="span" 
                            sx={{ color: 'error.main', fontSize: 18, fontWeight: 'bold', marginTop: 1 }}
                        >
                            You lost {earnedPoints * -1}
                        </Typography>
                    </>
                ) : (
                    <>
                        <CheckCircleOutline 
                            color="success" 
                            sx={{ fontSize: 50 }} 
                        />
                        <Typography 
                            variant="h4" 
                            sx={{ color: 'success.main', marginTop: 1, fontWeight: 'bold' }}
                        >
                            You won: {earnedPoints}
                        </Typography>
                    </>
                )}
            </CardContent>
            <Button 
                variant="contained" 
                sx={{
                    backgroundColor: '#3f51b5',
                    color: 'white',
                    marginTop: 2,
                    '&:hover': {
                        backgroundColor: '#303f9f',
                    }
                }}
                onClick={() => dispatch(setBetStatus({ betStatus: false, rolling: false }))} 
            >
                Place Bet Again
            </Button>
        </Card>
        
    )
}

export default ResultCard