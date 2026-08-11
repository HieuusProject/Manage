const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
require("dotenv").config();
cloudinary.config({
    cloud_name: process.env.CLOUDKEYNAME,
    api_key: process.env.CLOUDKEY,
    api_secret: process.env.CLOUDSECRET,
});    
// cloudinary.config({
//     cloud_name: "jvegjm1h",
//     api_key: "471696744563981",
//     api_secret: "728oHKG-zVr8d8dxHXDOPgVbcoE"
// }); 
module.exports.upload = (req, res, next) => {
    if(req.file){
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                    resolve(result);
                    } else {
                    reject(error);
                    }
                });
            streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
        async function upload(req) {
            let result = await streamUpload(req);
            console.log(result.secure_url);
            req.body[req.file.fieldname] = result.secure_url;
            //console.log(req.file)
            next();
        }
        upload(req);            
    }
    else{
        next();
    }
}