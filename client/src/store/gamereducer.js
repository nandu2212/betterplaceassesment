import { createSlice } from '@reduxjs/toolkit';


const initialState={
    currentBet:0,
    points:5000,
    betType:null,
    betStatus:false,
    rolling:false,
    outPut:{
        earnedPoints:0,
        roll1:0,
        roll2:0,
        total:0
    }
}

const gameSlice=createSlice({
    name:"Game",
    initialState,
reducers:{
    setPoints: (state, action) => {
        state.points += action.payload
    },
    setBet: (state, action) => {
        state.currentBet = action.payload.amount;
        state.betType = action.payload.type;
    },
    setBetStatus: (state, action) => {
        state.betStatus = action.payload.betStatus;
        state.rolling = action.payload.rolling
    },
    setOutput:(state,action)=>{
        state.outPut=action.payload
    }
}
})

export const{setPoints,setBet,setBetStatus,setOutput}=gameSlice.actions;
export default gameSlice.reducer;