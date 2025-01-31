import { configureStore } from "@reduxjs/toolkit";
import gameReducer from './gamereducer';

const Store=configureStore({
    reducer:({
        Game:gameReducer
    })
})

export default Store;