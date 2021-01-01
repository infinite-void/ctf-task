const { nanoid } = require('nanoid');
const Product = require('../models/product');

exports.add = (req, res, next) => {
        
        if(!req.user) 
                return res.status(403).send({ message: "Not authenticated to perform this operation."});

        
        const product = new Product({
                uid: nanoid(),
                name: req.body.name,
                quantity: req.body.quantity,
                lastmodifiedby: req.user.email
        });

        product.save( function (error) {
                
                if(error) 
                        return res.status(501).send({ message: "Error in inserting product. Check product details."});
                
                res.status(200).send({ message: "Product added successfully.", uid: product.uid, name: product.name });
                console.log("Product : " + product.name + " added to database.");
                next();
        });
};

exports.delete = (req, res, next) => {
        
        if(!req.user) 
                return res.status(403).send({ message: "Not authenticated to perform this operation."});

        Product.findOneAndDelete({ uid: req.body.uid }, function(err, product) {
                
                if(err) 
                        return res.status(501).send({ message: "Error in deleting product. Check product details. Try Again"});
                
                if(!product) 
                        return res.status(400).send({ message: "Product Not Found. Check product details."});
                
                res.status(200).send({ message: "Product deleted successfully.", uid: product.uid, name: product.name });
                console.log("Product : " + product.name + " deleted from database.");
                next();
        });
};

exports.update = (req, res, next) => {

        if(!req.user) 
                return res.status(403).send({ message: "Not authenticated to perform this operation."});

        Product.updateOne({ uid: req.body.uid }, { quantity: req.body.quantity }, function(err, product) {
                
                if(err) 
                        return res.status(501).send({ message: "Error in deleting product. Check product details. Try Again"});
                
                if(!product) 
                        return res.status(400).send({ message: "Product Not Found. Check product details."});
                
                res.status(200).send({ message: "Product updated successfully.", product: product        });
                next();

        });
        
};

exports.findrecord = (req, res, next) => {
        
        if(!req.user) 
                return res.status(403).send({ message: "Not authenticated to perform this operation."});

        Product.findOne({ uid: req.query.uid }, { _id: 0, uid: 1, name: 1, quantity: 1, lastmodifiedby: 1 }, function(err, product) {
                
                if(err) 
                        return res.status(501).send({ message: "Error in fetching product. Check product details."});
                
                res.status(200).send({ product: product });
        });
}

exports.listall = (req, res, next) => {
        
        if(!req.user) 
                return res.status(403).send({ message: "Not authenticated to perform this operation."});

        
        Product.find({}, { _id: 0, uid: 1, name: 1, quantity: 1, lastmodifiedby: 1 }, function(err, products) {
                
                if(err) 
                        return res.status(501).send({ message: "Error in fetching products. Try again"});
                
                
                return res.status(200).send(products);
        });
};