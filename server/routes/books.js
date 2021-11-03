// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let Book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  books.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

     let newBook = books();

     res.render('books/details', {
         title: 'Add a Book',
         books: newBook
     })
  }

);

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

     let newBook = books({
      "_id": req.body.id,
      "Title": req.body.Title,
      "Price": req.body.Price,
      "Author": req.body.Author,
      "Genre": req.body.Genre
  });

  books.create(newBook, (err, books) =>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //routes user back to list and refreshes with added changes
          console.log(books);
          res.redirect('books/index');
      }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

     let id = req.params.id;

     books.findById(id, (err, bookToEdit) => {
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             //show the edit view
             res.render('books/details', {
                 title: 'Edit Book', 
                 books: bookToEdit
             })
         }
     });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

     let id = req.params.id

     let updatedBook = books({
         "_id": req.body.id,
         "Title": req.body.Title,
         "Price": req.body.Price,
         "Author": req.body.Author,
        "Genre": req.body.Genre
     });
 
     books.updateOne({_id: id}, updatedBook, (err) => {
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             //routes user back to list and refreshes with changes
             res.redirect('books/index');
         }
     });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

     let id = req.params.id;


     books.remove({_id: id}, (err) => {
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             //routes user back to list and refreshes with changes
             res.redirect('books/index');
         }
     });
});


module.exports = router;
