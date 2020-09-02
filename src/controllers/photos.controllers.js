//Imports
const Photo = require("../models/Photo")
const fs = require("fs")

//Controller Class
class PhotoController{

    get = async (req, res) => {
        let photo;
        if(req.params.photoId){
            photo = await Photo.findById(req.params.photoId)
        } else {
            photo = await Photo.find()    
        }
        res.json(photo)
       
    }

    render = async (req, res) => {
        const photo = await Photo.findById(req.params.photoId)
        res.setHeader('content-type', photo.image.mimetype);
        res.send(photo.image.buffer);
    }

    post = async (req, res) => {
        try{
            //Retrieve data
            const {path, filename, mimetype} = req.file
            const {title, notes} = req.body
            //Set Image Buffer
            const buffer = fs.readFileSync(path)
            //Save Image
            const image = {buffer, path, filename, mimetype}
            const newPhoto = new Photo({title, image, notes})
            await newPhoto.save()
            res.json({message: `Photo id ${newPhoto._id} Posted`})
            console.log(newPhoto)
            console.log(req.file)

        } catch(err){
            console.log(err)
        } 
    }

    put = async (req, res) => {
        const {title, notes} = req.body
        const update = await Photo.findOneAndUpdate(req.params.photoId, {title, notes})
        res.json({message: `Updated Photo id ${req.params.photoId}`})
    }
    
    delete = async (req, res) => {
        const deletedPhoto = await Photo.findOneAndDelete(req.params.photoId)
        console.log("DELETED", deletedPhoto)
        res.json({message: `Deleted Image ${deletedPhoto.title}`})
    }
}

module.exports = new PhotoController()