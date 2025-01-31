import express ,{Request,Response} from "express";
import cors from "cors"
const app=express();
const port=5000;

//middlewares
app.use(express.json());
app.use(cors())


app.post('/roll',(req:Request,res:Response)=>{
try{
    const {betAmount,betType}=req.body;
const roll1:number=Math.floor(Math.random()*6)+1;
const roll2:number=Math.floor(Math.random()*6)+1;
const total:number=roll1+roll2;
let earnedPoints:number=0;
if(total<7 && betType == "Below"){
    earnedPoints+=2*betAmount
}else if(total==7 && betType == "Equalto"){
    earnedPoints+=5*betAmount
}else if(total>7 && betType == "Above"){
earnedPoints+=2*betAmount
}else{
    earnedPoints-=betAmount
}

res.json({earnedPoints,roll1,roll2,total})
}catch(err){
console.log(err);
res.json({err})
}
})

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
})