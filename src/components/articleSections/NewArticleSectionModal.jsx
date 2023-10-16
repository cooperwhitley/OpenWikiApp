import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ArticleSectionForm from '../shared/forms/ArticleSectionForm'
import messages from '../shared/AutoDismissAlert/messages'
import { createArticleSection } from '../../api/articleSection'

export default function NewArticleSectionModal(props) {
    const { user, article, show, handleClose, msgAlert, triggerRefresh } = props
    const [section, setSection] = useState({})

    const onChange = (evt) => {
        evt.persist()

        setSection(prevSection => {
            const updatedName = evt.target.name
            let updatedValue = evt.target.value

            const updatedSection = { [updatedName] : updatedValue }

            return {
                ...prevSection, ...updatedSection
            }
        })
    }

    const onSubmit = (evt) => {
        evt.preventDefault()
        console.log(user)
        createArticleSection(user, article._id, section)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'success',
                    message: messages.createArticleSectionSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'error',
                    message: messages.createArticleSectionFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ArticleSectionForm
                    section={section}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading='Create article section'
                />
            </Modal.Body>
        </Modal>
    )
}