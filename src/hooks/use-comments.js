import React, { useState } from 'react'

const useComments = (comments) => {
    const [allComments, setAllComments] = useState(comments)

    const insertNode = (tree, commentId, content) => {
        return tree.map((comment) => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                     replies: [...comment.replies, content]
                }
            }
            else if (comment.replies && comment.replies.length > 0) {
                return {
                    ...comment,
                     replies: insertNode(comment.replies, commentId, content)
                }
            }
            return comment;
        })
    }

    const editNode = (tree,commentId, content) => {
        return tree.map((comment) => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                     content: content
                }
            }
            else if (comment.replies && comment.replies.length > 0) {
                return {
                    ...comment,
                     replies: editNode(comment.replies, commentId, content)
                }
            }
            return comment;
        })
    }

    const editComment = (commentId, content) => {
        if (commentId) {
            console.log(commentId, content,"inside edit comment")
            setAllComments((prevComments) => editNode(prevComments, commentId, content))
        }
    }

    const insertComment = (commentId, content) => {
        console.log(`insertComment`,commentId, content)
        const newComment = {
            "id": new Date().toISOString(),
            "content": content,
            "votes": 0,
            "timestamp": new Date().toLocaleString(),
            "replies": []
        }
        if (commentId) {
            setAllComments((prevComments) => insertNode(prevComments, commentId, newComment))
        }
        else {
            setAllComments([newComment, ...allComments])
        }
    }
    return { allComments:allComments, insertComment,editComment }
}

export default useComments;