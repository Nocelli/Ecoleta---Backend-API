import express from 'express'

const app = express()

app.get('/users', (request, response) => {
    return response.status(200).json({'Msg' : 'Hello World!'})
})


app.listen(3001,() => {
    console.log('Server running! (go!,catch it!)')
})