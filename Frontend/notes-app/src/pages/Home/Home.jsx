import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { NoteCard } from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import { AddEditNotes } from './AddEditNotes'
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import ReactLoading from 'react-loading';
import Toast from '../../components/ToastMessage/ToastMessage'
import { EmptyCard } from '../../components/EmptyCard/EmptyCard'
import img1 from "../../assets/img1.png"
import img2 from "../../assets/img2.png"
export const Home = () => 
{
  const [openAddEditModal,setOpenAddEditModal]=useState({
    isShown:false,
    type:"add",
    data:null,
  })
  const [showToastMsg,setShowToastMsg]=useState({
    isShown:false,
    type:"add",
    message:""
  })
  const [userInfo,setUserInfo]=useState(null);
  const [allNotes,setAllNotes]=useState([]);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [loadingAllNotes, setLoadingAllNotes] = useState(true);
  const [isSearch,setIsSearch]=useState(false);
  const navigate=useNavigate();

  const handleEdit = (noteDetails)=>{
    setOpenAddEditModal({isShown:true,data:noteDetails,type:"edit"});
  }

  const handleClearSearch=()=>{
    setIsSearch(false);
    getAllNotes();
  }

  const onSearchNotes= async(query)=>{
    try {
      const response=await axiosInstance.get('/search-notes',{
        params:{query},
      })
      if(response.data && response.data.notes){
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const showToastMessage=(message,type)=>{
    setShowToastMsg({
      isShown:true,
      message,
      type
    })
  }

  const handleCloseToast=()=>{
    setShowToastMsg({
      isShown:false,
      message:""
    })
  }

  const updateIsPinned= async(noteData)=>{
    try {
      const response=await axiosInstance.post('/update-note-pinned/'+ noteData._id,{
        isPinned:!noteData.isPinned,
      });
      if(response.data && response.data.note){
        if(!noteData.isPinned){
          showToastMessage("Note Pinned Successfully!!")
        }
        else{
          showToastMessage("Note UnPinned Successfully!!")
        }
        getAllNotes();
      }  
   } catch (error) {
      console.log(error);
   }
  }

  const getUserInfo= async()=>
   {
      try {
        const response= await axiosInstance.get('/get-user');
        if(response.status === 200){
          const user=response.data.user;
          setUserInfo(user);
        }else{
          navigate("/")
          console.log("error")
        }
      } 
      catch (error) {
        navigate("/");
        if(error.response.status === 401){
          localStorage.clear();
          navigate("/");
        }
      }
      finally {
        setLoadingUserInfo(false);
      }
  }
  
  const getAllNotes= async ()=>{
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if(response.data && response.data.notes){
        setAllNotes(response.data.notes);
      }
      else{
        console.log(error);
      }
    } catch (error) {
      console.log('An unaccepted error occur, please try again')
    }
    finally {
      setLoadingAllNotes(false);
    }
  }

  const deleteNode = async (data)=>{
    try {

        const response=await axiosInstance.delete('/delete-note/'+data._id);
        if(response.data && !response.data.error){
          showToastMessage("Note Delete Successfully!!","delete");
          getAllNotes();
        }
        
      } catch (error) {

        if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message);
          console.log(error.response.data.message);
        }
        else{
          console.log("An un accepted error");
        }

      }
  }

  useEffect(() => {
    getUserInfo();
    getAllNotes();
    console.log(allNotes)
  }, []);

  if (loadingAllNotes || loadingUserInfo) {
    return <div className="flex items-center justify-center min-h-screen">
              <ReactLoading type="spinningBubbles" color="#007bff" height={100} width={100} />
           </div>
  }
   
  return (
    <>
     {userInfo && <Navbar userInfo={userInfo} onSearchNotes={onSearchNotes} handleClearSearch={handleClearSearch}/>}
     <div className="container mx-auto">
     {allNotes.length > 0 ?(<div className='grid grid-cols-3 gap-4 mt-8 '>
      {allNotes.length > 0 && allNotes.map((item)=>(
        <NoteCard
        key={item._id}
        title={item.title}
        date={item.createdOn}
        content={item.content}
        tags={item.tags} 
        isPinned={item.isPinned}
        onEdit={()=>{handleEdit(item)}}
        onDelete={()=>{deleteNode(item)}}
        onPinNote={()=>{updateIsPinned(item)}}
       />
      ))}
     </div>):(<EmptyCard img={isSearch? img2 : img1} message={isSearch?`oops! no notes found matching your search`:`start creating your first note click the 'add' button to jot down your thoughts,ideas and reminders Let's get started!`}/>)}
     </div>
     <button className='w-16 h-16 flex items-center justify-center  rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' onClick={()=>{
      setOpenAddEditModal({isShown:true ,type:"add",data:null})
     }}>
      <MdAdd className='text-[32px] text-white' />
     </button>
     <Modal
      isOpen={openAddEditModal.isShown}
      onRequestClose={()=>{}}
      style={{
        overlay:{
          backgroundColor:"rgba(0,0,0,0.2)",
        },
      }} 
      contentLabel=""
      className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 "
     >
     <AddEditNotes
       type={openAddEditModal.type}
       noteData={openAddEditModal.data}
       onClose={()=>{
      setOpenAddEditModal({
        isShown:false,
        type:"add",
        data:null,
      })
     }}
     getAllNotes={getAllNotes}
     showToastMessage={showToastMessage}
     />
     </Modal>
     <Toast
       isShown={showToastMsg.isShown}
       message={showToastMsg.message}
       type={showToastMsg.type}
       onClose={handleCloseToast}
       />
    </>
  )
}