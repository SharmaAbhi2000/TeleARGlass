import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// function for add product
const addProduct = async (req, res) => {
    try {

        const {
          name,
          description,
          // New pricing fields
          actual_price,
          discountPrice,
          is_prebooking,
          pre_book_price,
          post_book_price,

          // Backward compatibility fields
          price,
          prebookingEnabled,
          firstPaymentPercentage,

          // Unused/back-compat (kept to avoid breaking existing admin forms)
          category,
          subCategory,
          sizes,
          features,
          bestseller,
          subscribtion,
        } = req.body;
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        // Normalize pricing fields (support both new and old payloads)
        const normalizedActualPrice =
          actual_price !== undefined
            ? Number(actual_price)
            : price !== undefined
              ? Number(price)
              : 0;

        const normalizedIsPrebooking =
          is_prebooking !== undefined
            ? (typeof is_prebooking === "string" ? is_prebooking === "true" : Boolean(is_prebooking))
            : prebookingEnabled !== undefined
              ? (typeof prebookingEnabled === "string" ? prebookingEnabled === "true" : Boolean(prebookingEnabled))
              : false;

        // If only percentage provided (legacy), derive split from actual price
        const percentage = firstPaymentPercentage ? Number(firstPaymentPercentage) : 0;
        const derivedPreBook = normalizedIsPrebooking && percentage > 0
          ? Math.round(normalizedActualPrice * (percentage / 100))
          : undefined;
        const derivedPostBook = normalizedIsPrebooking && percentage > 0
          ? Math.max(0, normalizedActualPrice - (derivedPreBook || 0))
          : undefined;

        const normalizedPreBook = pre_book_price !== undefined ? Number(pre_book_price) : (derivedPreBook || 0);
        const normalizedPostBook = post_book_price !== undefined ? Number(post_book_price) : (derivedPostBook || 0);

        const productData = {
          name,
          description,
          image: imagesUrl,
          category,
          features,
          bestseller: typeof bestseller === "string" ? bestseller === "true" : Boolean(bestseller),
          subscribtion: typeof subscribtion === "string" ? subscribtion === "true" : Boolean(subscribtion),

          // New pricing structure
          actual_price: normalizedActualPrice,
          discountPrice: Number(discountPrice),
          is_prebooking: normalizedIsPrebooking,
          pre_book_price: normalizedPreBook,
          post_book_price: normalizedPostBook,

          date: Date.now(),
        };

       //console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        // Backward compatibility: include derived price field for frontend expecting price
        const mapped = products.map((doc) => {
            const obj = doc.toObject();
            if (obj.actual_price !== undefined && obj.price === undefined) {
                obj.price = obj.actual_price;
            }
            return obj;
        });
        res.json({success:true,products: mapped})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const { productId } = req.body
        const productDoc = await productModel.findById(productId)
        if (!productDoc) {
            return res.json({ success: false, message: 'Product not found' })
        }
        const product = productDoc.toObject();
        if (product.actual_price !== undefined && product.price === undefined) {
            product.price = product.actual_price;
        }
        res.json({success:true,product})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { listProducts, addProduct, removeProduct, singleProduct }