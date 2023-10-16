import { useState } from 'react'
import { Row, Col, Button, Card } from 'react-bootstrap'
import { removeInfoBox } from '../../api/infoBox'
import messages from '../shared/AutoDismissAlert/messages'
import { BsPencil, BsTrash3 } from 'react-icons/bs'
import EditInfoBoxModal from './EditInfoBoxModal'

export default function ShowInfoBox(props) {
    const { infoBox, msgAlert, triggerRefresh, user, article } = props
    const [editModalShow, setEditModalShow] = useState(false)

    const destroyInfoBox = () => {
        removeInfoBox(user, article._id, infoBox._id)
            .then(() =>
                msgAlert({
                    heading: 'success',
                    message: messages.removeInfoBoxSuccess,
                    variant: 'success'
                })
            )
            .then(() => triggerRefresh())
            .catch(() =>
                msgAlert({
                    heading: 'error',
                    message: messages.removeInfoBoxFailure,
                    variant: 'danger'
                })
            )
    }

    let infoButtons = null

    if (article && user && article.owner._id === user._id) {
        infoButtons = (
            <Col md='auto'>
                <Row>
                    <Button 
                        style={{background: 'none', border: 'none', marginLeft: '-2vmin', marginTop: '-.8vmin'}}
                        onClick={() => setEditModalShow(true)}
                    ><BsPencil style={{color: 'black'}}/></Button>
                </Row>
                <Row>
                    <Button 
                        style={{background: 'none', border: 'none', marginLeft: '-2vmin', marginTop: '-.9vmin'}}
                        onClick={() => destroyInfoBox()}
                    ><BsTrash3 style={{color: 'black'}}/></Button>
                </Row>
            </Col>
        )
    } else if (article && article.publicallyEditable && user) {
        infoButtons = (
            <Col md='auto'>
                <Button 
                    style={{background: 'none', border: 'none', marginLeft: '-2.5vmin'}}
                    onClick={() => setEditModalShow(true)}
                ><BsPencil style={{color: 'black'}}/></Button>
            </Col>
        )
    }

    return(
        <>
            <Card.Text>
                <Row>
                    <Col style={{borderRight: '1px solid black'}}>{infoBox.title}</Col>
                    <Col>{infoBox.summary}</Col>
                    { infoButtons }
                </Row>
            </Card.Text>
            <EditInfoBoxModal
                user={user}
                article={article}
                infoBox={infoBox}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}