import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ArticleSectionForm from '../shared/forms/ArticleSectionForm'
import messages from '../shared/AutoDismissAlert/messages'
import { updateArticleSection } from '../../api/articleSection'

export default function EditArticleSectionModal(props) {
    const { user, article, show, handleClose, msgAlert, triggerRefresh } = props
    const [section, setSection] = useState(props.section)

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

        updateArticleSection(user, article._id, section)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'success',
                    message: messages.updateArticleSectionSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'error',
                    message: messages.updateArticleSectionFailure,
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
                    heading='Update article section'
                />
            </Modal.Body>
        </Modal>
    )
}