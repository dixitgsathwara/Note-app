const express =require("express");
const app=express();
const validateToken =require("../Middleware/validateToken")
const {addNote,editNoteWithId,getAllNotes,deleteNoteWithId,updateNotePinnedWithId,searchNotes} =require("../Controllers/noteController")
const router=express.Router();
router.route('/add-note').post(validateToken,addNote);
router.route('/edit-note/:noteId').put(validateToken,editNoteWithId);
router.route('/get-all-notes/').get(validateToken,getAllNotes);
router.route('/delete-note/:noteId').delete(validateToken,deleteNoteWithId);
router.route('/update-note-pinned/:noteId').post(validateToken,updateNotePinnedWithId);
router.route('/search-notes/').get(validateToken,searchNotes);
module.exports = router;
