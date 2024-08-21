import mongoose from "mongoose"

export const connectDB = ()=>{
    mongoose.connect(process.env.MONGODB).then((data)=>{
        console.log(`Connecting to Mongo ${data.connection.host}`)
    })
    // .catch((err)=>{
    //     console.log(err)
    // })
}