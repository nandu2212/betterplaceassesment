import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { CancelOutlined, CheckCircleOutline } from '@mui/icons-material'
import {setBetStatus} from '../store/gamereducer'
const ResultCard = () => {
    const dispatch=useDispatch();
    const { earnedPoints, roll1, roll2, total } = useSelector((state) => state.Game.outPut)
    return (
        <Card sx={{ maxWidth: 345, margin: 'auto', borderRadius: 2, boxShadow: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>Bet Status</Typography>
                <Typography variant="h6" sx={{ marginTop: 2, color: '#555' }}>Die1 result:{roll1}</Typography>
                <Typography variant="h6" sx={{ marginTop: 1, color: '#555' }}>Die2 result:{roll2}</Typography>
                <Typography variant="h6" sx={{ marginTop: 1, color: '#555' }}>total:{total}</Typography>
                {earnedPoints < 0 ? (
                    <>
                        <CancelOutlined color="error" sx={{ fontSize: 40, marginTop: 3 }} />
                        <Typography variant="span" sx={{ color: 'error.main', fontSize: 18, fontWeight: 'bold' }}>You lost</Typography>
                    </>
                ) : (
                    <>
                        <CheckCircleOutline color="success" sx={{ fontSize: 40 }} />
                        <Typography variant="h3" sx={{ color: 'success.main', marginTop: 1 }}>You won : {earnedPoints}</Typography>
                    </>
                )}
            </CardContent>
            <Button variant="contained" sx={{ color: 'error.main' }} onClick={()=>dispatch(setBetStatus({betStatus:false,rolling:false}))}>place bet again</Button>
        </Card>
    )
}

export default ResultCard