'use strict'
const express = require ('express');
const cors = require ('cors');
require ('dotenv').config();
const server = express();
server.use(cors());
server.use(express.json());
const PORT = process.env.PORT;


const mongoose = require('mongoose');
main().catch(err => console.log(err));
let Book;
async function main() {
//   await mongoose.connect('mongodb://localhost:27017/mybooks');
  await mongoose.connect(process.env.MONGO_URL)
  const bookSchema = new mongoose.Schema({
    title: String,
    description:String,
    status:String,
    email:String,
    url:String
  });
  Book = mongoose.model('Book', bookSchema);
//   seedData();
}
async function seedData()
{
    const book1= new Book({
        title:'All the Light We Cannot See',
    description:'Winner of the Pulitzer Prize* A New York Times Book Review Top Ten Book* A National Book Award finalist',
    status:'In stock soon',
    email:'aseel_fawwaz@yahoo.com',
    url:'https://images-na.ssl-images-amazon.com/images/I/51uG-IHat3L._SY291_BO1,204,203,200_QL40_FMwebp_.jpg'
    // url:'https://images-na.ssl-images-amazon.com/images/I/51uG-IHat3L._SY291_BO1,204,203,200_QL40_FMwebp_.jpg'
    })

    const book2= new Book({
        title:'Men in the Sun',
    description:'Politics and the novel, Ghassan Kanafani once said, are an indivisible case. Fadl al-Naqib has reflected that Kanafani wrote the Palestinian story, then he was written by it. His narratives offer entry into the Palestinian experience of the conflict that has anguished the people of the Middle East for more than a century.',
    status:'In stock soon',
    email:'aseel_fawwaz@yahoo.com',
    url:'https://images-na.ssl-images-amazon.com/images/I/51KN2XAA78L._SX315_BO1,204,203,200_.jpg'
    // url:'https://images-na.ssl-images-amazon.com/images/I/51KN2XAA78L._SX315_BO1,204,203,200_.jpg'
    })

    const book3= new Book({
        title:'The Lord of the Rings',
    description:'J.R.R. Tolkien’s grand masterwork in a new hardcover illustrated with the art created by Tolkien himself as he envisioned Middle-earth , One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them.',
    status:'In stock soon',
    email:'aseel_fawwaz@yahoo.com',
    url:'https://images-na.ssl-images-amazon.com/images/I/41vN31PD7SL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg'
    // url:'https://images-na.ssl-images-amazon.com/images/I/41vN31PD7SL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg'
    })

    await book1.save();
    await book2.save();
    await book3.save();
}
server.get('/', homeHandler);
server.get('/mybooks',getBooks);
server.post('/addBook',addBook);
server.delete('/deletebook/:id',deleteBook);

function homeHandler(req,res){

    res.send('Wellcome to home page');
}
function getBooks(req,res){
    Book.find({},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    })
}

async function addBook(req,res){
    // console.log(req.body);
    const {bookName, description, status,email} = req.body;
    await Book.create({ 
        bookName: bookName,
        description: description,
        status: status,
        myEmail: email,
    });

    Book.find({myEmail:email},(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    })
}
 function deleteBook(req,res){
    const bookId = req.params.id;
    const email = req.query.email;
    Book.deleteOne({_id:bookId},(err,result)=>{

        Book.find({myEmail:email},(err,result)=>{
            if(err)
            {
                console.log(err);
            }
            else
            {
                res.send(result);
            }
        })

    })
}



server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})