import { asyncHandler } from "../utils/asyncHandler.js";
import {queryDocumentById,createDocumentByData,queryDocumentsByPagination,deleteById,updateById} from "../db/index.js";
import { uploadOnCloudinary,destroyCloudMedia } from "../utils/cloudinary.js";
import { ObjectId } from "mongodb";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
const getEventById = asyncHandler(async(req,res)=>{
    try { 
        const {eventId}=req.query;
        console.log(eventId)
        if (!ObjectId.isValid(eventId)) {
            throw new ApiError(400, "Invalid eventId ID");
          }
        const event = await queryDocumentById("events",eventId);
        // console.log(event)
       return  res.status(200).json(event)
    } catch (error) {
        console.log(error);
    }
});
const getAnEventByRecency =asyncHandler(async(req,res)=>{
    const {page,limit,type}=req.query;
    const result = await queryDocumentsByPagination("events",type,limit,page);
    if(!result){
        throw new ApiError(400,"Can't find the results ")
    }
    res.status(200).json(new ApiResponse(200,result,"Get result succesfully "))

})
const createEvent =asyncHandler(async(req,res)=>{
    console.log("this is here")
    try {
        // console.log(req.body)
        const {
            name,
            tagline,
            schedule,
            description,
            moderator,
            category,
            sub_category,
            riger_rank,
        } = req.body;
        const FileLocalPath = req.file?.path || "";
        console.log(FileLocalPath)
        const file = FileLocalPath? await uploadOnCloudinary(FileLocalPath): "";
        // const files = req.file
        // console.log(file);
        const eventData = {
            type: "event",
            uid:18,
            name,
            tagline,
            schedule: new Date(schedule), // Ensure the schedule is a Date object
            description,
            files:{
                url: file?.secure_url || "",
                public_id: file?.public_id || "",
            },
            moderator,
            category,
            sub_category,
            riger_rank,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        console.log(eventData)
        try {
            console.log("this hit")
            const insertedId = await createDocumentByData("events",eventData);
            return res.status(201).send({ insertedId });
        } catch (error) {
            res.status(400).send(error);
        } 
        
    } catch (error) {
        console.log(error);
    }
});

const deleteEvent=asyncHandler(async(req,res)=>{
    const {eventId}=req.query;
    console.log(eventId)
    const event = await queryDocumentById("events",eventId);
    if (!event) {
        throw new ApiError(404, "post not found !");
    }
    console.log(event.files.public_id)
    event.files?.public_id != ""
    ? await destroyCloudMedia(event.files.public_id)
    : "";

    const result = await deleteById("events",eventId)
    console.log("Deleted Post ! ");
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Post Deleted Successfully"));

})
const updateEvent=asyncHandler(async(req,res)=>{
    const {eventId}=req.query;
    console.log(eventId)
    const event = await queryDocumentById("events",eventId);
    if (!event) {
        throw new ApiError(404, "post not found !");
    }
    // console.log(event.files.public_id)
    event.files?.public_id != ""
    ? await destroyCloudMedia(event.files.public_id)
    : "";

    const {
        name,
        tagline,
        schedule,
        description,
        moderator,
        category,
        sub_category,
        riger_rank,
    } = req.body;
    const FileLocalPath = req.file?.path || "";
    console.log(FileLocalPath)
    const file = FileLocalPath? await uploadOnCloudinary(FileLocalPath): "";
    // const files = req.file
    // console.log(file);
    const updateData = {
        type: "event",
        uid:18,
        name,
        tagline,
        schedule: new Date(schedule), // Ensure the schedule is a Date object
        description,
        files:{
            url: file?.secure_url || "",
            public_id: file?.public_id || "",
        },
        moderator,
        category,
        sub_category,
        riger_rank,
        // createdAt: new Date(),
        updatedAt: new Date()
    };
//  console.log(updateData)
    try {
        const result = await updateById("events",eventId,updateData)
        res.status(200).json(new ApiResponse(200,{},"updated!"))
        
    } catch (error) {
        throw new ApiError(400,"Not updated")
    }


})

export {
    getEventById,createEvent,getAnEventByRecency,deleteEvent,updateEvent
}