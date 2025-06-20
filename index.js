const express = require("express")
const app = express()
const { seed , client } = require('./db.js')
app.use(express.json())
app.use('/api' , require('./api.js'))

const init = async () => {
    await client.connect()
    await seed()

    const PORT = 3000
    app.listen(PORT , () => {
        console.log(`Listening to PORT: ${PORT}`)
    })

}

init()