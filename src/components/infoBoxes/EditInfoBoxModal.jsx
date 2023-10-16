import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import InfoBoxForm from '../shared/forms/InfoBoxForm'
import messages from '../shared/AutoDismissAlert/messages'
import { updateInfoBox } from '../../api/infoBox'

export default function EditInfoBoxModal(props) {
    const { user, article, show, handleClose, msgAlert, triggerRefresh } = props
    const [infoBox, setInfoBox] = useState(props.infoBox)

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

        updateInfoBox(user, article._id, infoBox)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'success',
                    message: messages.updateInfoBoxSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'error',
                    message: messages.updateInfoBoxFailure,
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
                    heading='Update info box'
                />
            </Modal.Body>
        </Modal>
    )
}