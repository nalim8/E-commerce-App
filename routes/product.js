const express = require('express')
const router = express.Router()
const db = require('../db')
const createError = require('http-errors');
const bodyParser = require('body-parser')
const ProductModel = require('../models/ProductModel')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }  
}

const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})

const Product = new ProductModel()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))


// Filter by category
router.get('/products', async (req, res, next) => {
  try {  
    const queryParams = req.query
    //console.log(queryParams)
    
    if (!Object.keys(queryParams).length) {
      const result = await Product.find();
      res.status(200).send(result);
    } else {
      const result = await Product.findByCategory(queryParams)
      res.status(200).send(result);
    }   
  } catch(err) {
    next(err);
  }
})

router.get('/products/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    const result = await Product.findOne(productId);
    if (!result) {
        throw createError(404, 'Product not found');
      }
    res.status(200).send(result);
  } catch(err) {
    next(err);
  }
});

router.post('products/', upload.single('image'), async (req, res, next) => {
  try {
    console.log(req.file)
    const data = req.body
    const result = await Product.create(data)
    res.status(201).send(`Product added with ID: ${result.rows[0].id}`)
  } catch(err) {
    next(err)
  }
})

module.exports = router



/* // Filter by category funktioniert noch nicht
router.get('/products', (req, res) => {
    const category = req.query.category 
    db.query('SELECT * FROM product WHERE category_id = (SELECT id FROM product_category WHERE name = $1)', [category], (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
}) */