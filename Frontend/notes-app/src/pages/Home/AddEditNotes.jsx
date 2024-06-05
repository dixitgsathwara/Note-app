import React, { useState } from 'react'
import { TagInput } from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';
export const AddEditNotes = ({noteData,type,onClose,getAllNotes,showToastMessage}) => {
  const [title,setTitle]=useState( (noteData) ? noteData.title: "" );
  const [content,setContent]=useState((noteData) ? noteData.content: "" );
  const [tags,setTags]=useState((noteData) ? noteData.tags: "")
  const [error,setError]=useState(null);
  const addNewNote = async ()=>{
     try {
        const response=await axiosInstance.post('/add-note',{
            title,
            content,
            tags
        });
        if(response.data && response.data.note){
           showToastMessage("Note Added Successfully!!")
           getAllNotes();
           onClose();
        }
        
     } catch (error) {
        if(error.response && error.response.data && error.response.data.message){
            setError(error.response.data.message);
            console.log(error.response.data.message)
        }
     }
  }
  const editNote = async ()=>{
    try {
        const response=await axiosInstance.put('/edit-note/'+noteData._id,{
            title,
            content,
            tags
        });
        if(response.data && response.data.note){
            showToastMessage("Note Update Successfully!!")
           
            getAllNotes();
           onClose();
        }
        
     } catch (error) {
        if(error.response && error.response.data && error.response.data.message){
            setError(error.response.data.message);
            console.log(error.response.data.message)
        }
     }
  }
  const handleAddNote=()=>{
     if(!title){
        setError("please Enter the title");
        return;
     }
     if(!content){
        setError("please enter the content");
        return;
     }
     setError("");
     if (type==='edit') {
        editNote();
     }else{
        addNewNote();
     }
  }
  return (
    <div className='relative'>
        <button className='w-10 h-10 rounded-full flex item-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
            <MdClose className='text-xl text-slate-400 ' />
        </button>
        <div className="flex flex-col gap-2">
            <label className='input-lable'>TITLE</label>
            <input type="text"
            className='text-2xl text-slate-950 outline-none '
            placeholder='Go to' 
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
            />
        </div>
        <div className="flex flex-col gap-2 mt-4">
            <label className='input-lable'>CONTENT</label>
            <textarea type="text"
            className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
            placeholder='Content'
            rows={10}
            value={content}
            onChange={(e)=>{setContent(e.target.value)}} 
            />
        </div>
        <div className="mt-3">
            <label className='input-lable'>TAGS</label>
            <TagInput tags={tags} setTags={setTags}/>
        </div>
        {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}
        <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>
           {type === "edit" ? "UPDATE" : "ADD"}
        </button>
    </div>
  )
}
