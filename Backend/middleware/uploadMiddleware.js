const multer = require('multer')


// Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    },
})

// File FIlters
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if(allowedTypes.includes(file.ninetype)){
        cb(null, true)
    }
    else{
        cb(new Error('Only .jpeg, .jpg and .png formats are only allowed') , false)
    }
}

const upload = multer({storage, fileFilter})

module.exports = upload