import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import InfoBoxForm from '../shared/forms/InfoBoxForm'
import messages from '../shared/AutoDismissAlert/messages'
import { createInfoBox } from '../../api/infoBox'

export default function NewArticleSectionModal(props) {
    const { user, article, show, handleClose, msgAlert, triggerRefresh } = props
    const [infoBox, setInfoBox] = useState({})

    const onChange = (evt) => {
        evt.persist()

        setInfoBox(prevInfoBox => {
            const updatedName = evt.target.name
            let updatedValue = evt.target.value

            const updatedInfoBox = { [updatedName] : updatedValue }

            return {
                ...prevInfoBox, ...updatedInfoBox
            }
        })
    }

    const onSubmit = (evt) => {
        evt.preventDefault()
        console.log(user)
        createInfoBox(user, article._id, infoBox)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'success',
                    message: messages.createInfoBoxSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'error',
                    message: messages.createInfoBoxFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <InfoBoxForm
                    infoBox={infoBox}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading='Add new info box'
                />
            </Modal.Body>
        </Modal>
    )
}