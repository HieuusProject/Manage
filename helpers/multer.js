const multer = require('multer')
module.exports = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './publics/uploads/')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now()
            cb(null,`${uniqueSuffix}-${file.originalname}`)
        }
    })

    const upload = multer({ storage: storage })   
    return storage
}