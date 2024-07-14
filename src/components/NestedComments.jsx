import React, { useState } from 'react';
import "./NestedCommnets.css"
import useComments from '../hooks/use-comments';
import Comment from './Comment';

const NestedComments = ({comments}) => {
    const [content, setContent] = useState("")
    const { allComments, insertComment,editComment } = useComments(comments);

    const handleAddComment = (id=null,content) => {
        insertComment(id, content)
        setContent("")
    }

    const handleEditComment = (id=null,content) => {
        editComment(id, content)
    }

    const handleChangeContent = (e) => {
        setContent(e.target.value)
    }

    return (
        <div className='commentsContainer'>
            <div className='addNewComment'>
                <textarea
                    className='addComment'
                    value={content}
                    onChange={(e) => handleChangeContent(e)}
                    name="addComment"
                    cols="30"
                    rows="4"
                    placeholder='add comment here...' />
                <button className='btn' onClick={()=>handleAddComment(null,content)}>Add Comment</button>
            </div>
            {
                allComments?.map((comment) => {
                    return (
                        <Comment key={comment.id} comment={comment} onEdit={handleEditComment} onComment={handleAddComment} />
                    )
                })
            }
        </div>
    )
}

export default NestedComments;