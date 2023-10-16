import { useState } from 'react'
import { Row, Button } from 'react-bootstrap'
import { removeArticleSection } from '../../api/articleSection'
import messages from '../shared/AutoDismissAlert/messages'
import { BsPencil, BsTrash3 } from 'react-icons/bs'
import EditArticleSectionModal from './EditArticleSectionModal'

export default function ShowArticleSection(props) {
    const { section, msgAlert, triggerRefresh, user, article } = props
    
    const [editModalShow, setEditModalShow] = useState(false)

    const destroySection = () => {
        removeArticleSection(user, article._id, section._id)
            .then(() =>
                msgAlert({
                    heading: 'success',
                    message: messages.removeArticleSectionSuccess,
                    variant: 'success'
                })
            )
            .then(() => triggerRefresh())
            .catch(() =>
                msgAlert({
                    heading: 'error',
                    message: messages.removeArticleSectionFailure,
                    variant: 'danger'
                })
            )
    }

    let sectionButtons = null

    if (article && user && article.owner._id === user._id) {
        sectionButtons = (
            <>
                <Button 
                    style={{background: 'none', border: 'none', marginLeft: '-1vmin', marginTop: '-.5vmin'}}
                    onClick={() => setEditModalShow(true)}    
                ><BsPencil /></Button>
                <Button 
                    style={{background: 'none', border: 'none', marginLeft: '-1vmin', marginTop: '-.5vmin'}}
                    onClick={() => destroySection()}
                ><BsTrash3 /></Button>
            </>
        )
    } else if (article && article.publicallyEditable && user) {
        sectionButtons = (
            <>
                <Button 
                    style={{background: 'none', border: 'none', marginLeft: '-1vmin', marginTop: '-.5vmin'}}
                    onClick={() => setEditModalShow(true)}    
                ><BsPencil /></Button>
            </>
        )
    }

    return (
        <>
            <Row style={{borderBottom: '1px solid white', paddingBottom: '2vmin'}}>
                    <h3 style={{padding: '1vmin', paddingLeft: '0'}}>{sectionButtons}{section.heading}</h3>
                    <p style={{padding: 0}}>{section.body}</p>
            </Row>
            <EditArticleSectionModal
                user={user}
                article={article}
                section={section}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}