import React, { useState } from 'react'
import './Comments.css'

const Comment = ({ comment,onComment,onEdit }) => {
    const [showReplies, SetShowReplies] = useState(false)
    const [replyContent, setReplyContent] = useState("")
    const [editComment, setEditComment] = useState("")
    const [isEdit,setIsEdit] = useState(false)

    const handleAddComment = (id = null) => {
        onComment(id,replyContent)
        setReplyContent("")
    }
    const handleChangeReplyContent = (e) => {
        setReplyContent(e.target.value)
    }
    const handleShowReplies = (comment) => {
        SetShowReplies(!showReplies)
    }

    const handleEdit = (id,content) => {
        if(isEdit){
            setEditComment("")
            setIsEdit(false)
            onEdit(id,editComment)
        }
        else{
            setEditComment(content)
            setIsEdit(true)
        }
    }
    const handleChangeEditContent =(e)=>{
        setEditComment(e.target.value)
    }
    return (
        <div className="singleComment">
            {isEdit ? <input className='editInput' type='text' value={editComment} onChange={handleChangeEditContent} /> :
            <p>{comment.content}</p> }
            <p>Votes: {comment.votes}</p>
            <p>{new Date(comment.timestamp).toLocaleString()}</p>
            <div className='singleComment__btns'>
                <button
                    onClick={() => handleShowReplies(comment)}
                    className='singleComment__btns--btn'>
                    {!showReplies ? "Reply" : "Hide Replies"}</button>
                <button className='singleComment__btns--btn' onClick={()=>handleEdit(comment.id,comment.content)}>{isEdit ? "Save" : "Edit"}</button>
                <button className='singleComment__btns--btn'>Delete</button>
            </div>

            {showReplies ? <div className='addNewComment'>
                <textarea
                    className='addComment'
                    value={replyContent}
                    onChange={(e) => handleChangeReplyContent(e)}
                    name="addComment"
                    cols="30"
                    rows="4"
                    placeholder='add comment here...' />
                <button
                    className='btn'
                    onClick={() => handleAddComment(comment.id)}
                >Add Comment</button>
            </div> : null}

            {showReplies && comment.replies.length > 0 ?
                <>
                    {comment.replies.map((reply) => {
                        return <Comment key={reply.id} comment={reply} onEdit={onEdit} onComment={onComment} />
                    })
                    }
                </>
                : null}
        </div>

    )
}

export default Comment;