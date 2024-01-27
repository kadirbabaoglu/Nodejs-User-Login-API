const mongoose =require('mongoose')

const db = () =>{
    mongoose.connect(process.env.DB_URL , {
        
    }).then(()=>{
        console.log('database connetion success')
    }).catch((err)=>{
        console.log('Database conneciton error' + err)
    })
}

module.exports = db