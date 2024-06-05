const asyncHandler =require ("express-async-handler");
const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken");
const User =require("../Models/userModel");
const Note =require("../Models/noteModel");

const addNote = asyncHandler(async (req,res)=>{
     const {title,content,tags}=req.body;
     const {user}=req.user;

    if(!title){
        return res.status(400).json({error:true,message:"title is required"});
    }
    if(!content){
        return res.status(400).json({error:true,message:"content is required"});
    }
    const note = new Note({
        title,
        content,
        tags:tags || [],
        userId:user._id,
    });
    await note.save();
    return res.json({
        error:false,
        note,
        message:"Note added successfully"
    });
  });


  const editNoteWithId = asyncHandler(async (req,res)=>{
    const noteId=req.params.noteId;
    const {title,content,tags,isPinned}=req.body;
    const {user}=req.user;
    if(!title && !content && !tags){
        return res.status(400).json({
            error:true,
            message:"no changes provided"
        });
    }
    const note= await Note.findOne({_id:noteId,userId:user._id});
    if(!note){
        return res.status(400).json({
            error:true,
            message:"Note not found"
        });
    }
    if(title) note.title=title;
    if(content) note.content=content;
    if(tags) note.tags=tags;
    if(isPinned) note.isPinned=isPinned;

    await note.save();
    return res.status(200).json({
        error:false,
        note,
        message:"Note update successfully"
    });
  });
  const getAllNotes = asyncHandler(async (req,res)=>{
    const {user}=req.user;
    const notes = await Note.find({userId:user._id}).sort({isPinned:-1});
    return res.json({
        error:false,
        notes,
        message:"all notes retrives successfully"
    })
  });
  const deleteNoteWithId = asyncHandler(async (req,res)=>{
    const noteId=req.params.noteId;
    const {user}=req.user;

    const note= await Note.findOne({_id:noteId,userId:user._id});
    if(!note){
        return res.status(400).json({
            error:true,
            message:"Note not found"
        });
    }

    await Note.deleteOne({_id:noteId,userId:user._id});
    return res.status(200).json({
        error:false,
        message:"Note deletet successfully"
    });
  });
  const updateNotePinnedWithId = asyncHandler(async (req,res)=>{
    const noteId=req.params.noteId;
    const {isPinned}=req.body;
    const {user}=req.user;
    const note= await Note.findOne({_id:noteId,userId:user._id});
    if(!note){
        return res.status(400).json({
            error:true,
            message:"Note not found"
        });
    }
    note.isPinned=isPinned;

    await note.save();
    return res.status(200).json({
        error:false,
        note,
        message:"Note update successfully"
    });
  });
  const searchNotes = asyncHandler(async (req,res)=>{
    const {user}=req.user;
     const {query}=req.query;
     if(!query){
        return res.status(400).json({error:true, message:"search query is required"});
     }
     const matchingNotes = await Note.find({
        userId:user._id,
        $or:[
            {title :{ $regex:new RegExp(query,"i")}},
            {content :{ $regex:new RegExp(query,"i")}},
        ],
     })
     return res.json({
        error:false,
        notes:matchingNotes,
        message:"Notes matching the search query retrives successfully!!",
     })
  });
  module.exports = { addNote , editNoteWithId ,getAllNotes,deleteNoteWithId,updateNotePinnedWithId,searchNotes};