import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ArticleForm from '../shared/forms/ArticleForm'
import { updateArticleSuccess, updateArticleFailure } from '../shared/AutoDismissAlert/messages'

export default function EditArticleModal(props) {
    const { user, show, updateArticle, handleClose, msgAlert, triggerRefresh } = props

    const [article, setArticle] = useState(props.article)

    const onChange = (evt) => {
        evt.persist()

        setArticle(prevArticle => {
            const updatedName = evt.target.name
            let updatedValue = evt.target.value

            if (updatedName === 'publicallyEditable' && evt.target.checked) {
                updatedValue = true
            } else if (updatedName === 'publicallyEditable' && !evt.target.checked) {
                updatedValue = false
            }

            const updatedArticle = { [updatedName] : updatedValue }

            return {
                ...prevArticle, ...updatedArticle
            }
        })
    }

    const onSubmit = (evt) => {
        evt.preventDefault()

        updateArticle(user, article)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'success',
                    message: updateArticleSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'error',
                    message: updateArticleFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton style={{borderBottom: 'none', paddingBottom: '0'}}/>
            <Modal.Body>
                <ArticleForm
                    article={article}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading='Update Article'
                />
            </Modal.Body>
        </Modal>
    )
}