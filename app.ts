import express from "express"

const prot = 3000
const app = express()


app.listen(prot, () => console.log(`server runing in ${prot}`))