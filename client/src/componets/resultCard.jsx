import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { CancelOutlined, CheckCircleOutline } from '@mui/icons-material'
const ResultCard = (props) => {
    const { earnedPoints, roll1, roll2, total } = props.Result
    console.log(earnedPoints, roll1, roll2, total)
    return (
        <Card sx={{ maxWidth: 345, margin: 'auto', borderRadius: 2, boxShadow: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>Bet Status</Typography>
                <Typography variant="h6" sx={{ marginTop: 2, color: '#555' }}>Score1:{roll1}</Typography>
                <Typography variant="h6" sx={{ marginTop: 1, color: '#555' }}>Score2:{roll2}</Typography>
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
            <Button variant="contained" sx={{ color: 'error.main' }} onClick={props.BetStatus}>place bet again</Button>
        </Card>
    )
}

export default ResultCard