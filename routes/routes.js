const cloudinary = require('../cloudinary/cloudinary')

const express = require('express')

const route = express()

const postSchema = require('../schema/schema')

route.get('/getPost', async (req, res) => {
    const data = await postSchema.find()
    // console.log(data)
    res.status(200).json(data)
})

route.post('/createPost', async (req, res) => {
    try {

        const {name,location,likes,description,PostImage,date}=req.body

        const imgage = await cloudinary.uploader.upload(PostImage,{
            folder:"img-folder"
        })

        const datas =await postSchema.create({
            name:name,
            location:location,
            likes:likes,
            description:description,
            PostImage: imgage.secure_url,
            date:date
        })
        // console.log(datas)
        datas.save()
        res.status(200).json({
            message:"Post Saved"
        })

    } catch (e) {
        return res.json({
            status: e.message
        })
    }
})

module.exports = route;