import express from 'express'

const app = express()

app.use(express.json())

let tealist= []
let nextId = 1

app.post('/teas',(req,res)=>{
    const {name,price} = req.body
    const newTea = {id:nextId++, name, price}
    tealist.push(newTea)
    res.status(201).send(newTea)
})

app.get('/teas',(req,res)=>{
    res.status(200).send(tealist)
})

//EXTRACTING A SPECIFIC REQUEST FOR EXAMPLE A TEA WITH SPECIFIC ID
//THE USER WILL GIVE THE ID
app.get('/teas/:id',(req,res)=>{
    const tea = tealist.find(t=> t.id === parseInt(req.params.id)) //SINCE ID URL MA HUNCHA SO PARAMS USE GARNE REQ.BODY FOr body ko content
    if(!tea){
        return res.status(404).send("tea not found!!")

    }
    else{
        return res.status(200).send(tea)
    }

})

//UPDATE TEA
app.put('/teas/:id',(req,res)=>{
    const tea = tealist.find(t=> t.id=== parseInt(req.params.id))
 
if(!tea){
        return res.status(404).send("tea not found!!")

    }
    const {name,price} = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
}) 

app.delete('/teas/:id',(req,res)=>{
    tealist.findIndex(t=> t.id=== parseInt(req.params.id)) //WE DIODNT USE FIND AS FIND RETURNS THE ELEMENT AND FINDNEXT RETURNS INDEX SO WE CAN ALSO HAVE THE POSITION OF ELEMENT
    if(index === -1){
    return res.status(404).send('tea not found')
    }
    tealist.splice(index,1)
    return res.status(204),send("DELETED!")

})
app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`)
}) 