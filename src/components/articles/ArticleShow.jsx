import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import EditArticleModal from './EditArticleModal'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import { BsPencil, BsTrash3 } from 'react-icons/bs'

import { getOneArticle, updateArticle, removeArticle } from '../../api/article'
import { removeArticleSection } from '../../api/articleSection'
import { removeInfoBox } from '../../api/infoBox'

import messages from '../shared/AutoDismissAlert/messages'

export default function ArticleShow (props) {
    const [article, setArticle] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    let activeInfoBox = null
    let activeSection = null

    const navigate = useNavigate()

    const { id } = useParams()
    const {user, msgAlert} = props
    
    useEffect(() => {
        getOneArticle(id)
            .then(res => setArticle(res.data.article))
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.showArticleFailure,
                    variant: 'danger'
                })
            })
    }, [updated])

    const destroyArticle = () => {
        removeArticle(user, article._id)
            .then(() =>
                msgAlert({
                    heading: 'success',
                    message: messages.removeArticleSuccess,
                    variant: 'success'
                })
            )
            .then(() => navigate('/articles'))
            .catch(() =>
                msgAlert({
                    heading: 'error',
                    message: messages.removeArticleFailure,
                    variant: 'danger'
                })
            )
    }

    const destroyInfoBox = () => {
        removeInfoBox(user, activeInfoBox._id)
            .then(() =>
                msgAlert({
                    heading: 'success',
                    message: messages.removeInfoBoxSuccess,
                    variant: 'success'
                })
            )
            .then(() => setUpdated(prev => !prev))
            .catch(() =>
                msgAlert({
                    heading: 'error',
                    message: messages.removeInfoBoxFailure,
                    variant: 'danger'
                })
            )
    }

    const destroySection = () => {
        removeArticleSection(user, activeSection._id)
            .then(() =>
                msgAlert({
                    heading: 'success',
                    message: messages.removeArticleSectionSuccess,
                    variant: 'success'
                })
            )
            .then(() => setUpdated(prev => !prev))
            .catch(() =>
                msgAlert({
                    heading: 'error',
                    message: messages.removeArticleSectionFailure,
                    variant: 'danger'
                })
            )
    }
    
    let lastUpdated
    if (article) {
        lastUpdated = `${
            article.updatedAt[5] !== 0 ? article.updatedAt.slice(5, 7) : article.updatedAt.slice(6, 7)
            }/${
                article.updatedAt[8] !== 0 ? article.updatedAt.slice(8, 10) : article.updatedAt.slice(9, 10)
            }/${article.updatedAt.slice(0, 4)}`
        }
        
    let adminButtons = null
    let sectionButtons = null
    let infoBoxButtons = null
    if (article && user && article.owner._id === user._id) {
        adminButtons = (
            <>
                <Button
                    className='m-2' variant='info'
                    onClick={() => setEditModalShow(true)}
                >
                    Edit
                </Button>
                <Button
                    className='m-2' variant='danger'
                    onClick={() => destroyArticle()}
                >
                    Delete
                </Button>
            </>
        )
        infoBoxButtons = (
            <Col md='auto'>
                <Row>
                    <Button 
                        style={{background: 'none', border: 'none', marginLeft: '-2vmin', marginTop: '-.8vmin'}}
                    ><BsPencil style={{color: 'black'}}/></Button>
                </Row>
                <Row>
                    <Button 
                        style={{background: 'none', border: 'none', marginLeft: '-2vmin', marginTop: '-.9vmin'}}
                    ><BsTrash3 style={{color: 'black'}}/></Button>
                </Row>
            </Col>
        )
        sectionButtons = (
            <>
                <Button style={{background: 'none', border: 'none', marginLeft: '-1vmin', marginTop: '-.5vmin'}}><BsPencil /></Button>
                <Button style={{background: 'none', border: 'none', marginLeft: '-1vmin', marginTop: '-.5vmin'}}><BsTrash3 /></Button>
            </>
        )
    } else if (article && article.publicallyEditable && user) {
        adminButtons = (
            <>
                <Button
                    className='m-2' variant='info'
                    onClick={() => setEditModalShow(true)}
                >
                    Edit
                </Button>
            </>
        )
        infoBoxButtons = (
            <Col md='auto'>
                <Button 
                    style={{background: 'none', border: 'none', marginLeft: '-2.5vmin'}}
                ><BsPencil style={{color: 'black'}}/></Button>
            </Col>
        )
        sectionButtons = (
            <>
                <Button style={{background: 'none', border: 'none', marginLeft: '-1vmin', marginTop: '-.5vmin'}}><BsPencil /></Button>
            </>
        )
    }
    
    if (!article) {
        return <LoadingScreen />
    }
    
    let infoBoxes
    if (article && article.infoBoxes.length > 0) {
        infoBoxes = article.infoBoxes.map(infoBox => (
            <Card.Text>
                <Row>
                    <Col style={{borderRight: '1px solid black'}}>{infoBox.title}</Col>
                    <Col>{infoBox.summary}</Col>
                    { infoBoxButtons }
                </Row>
            </Card.Text>
        ))
    }

    let articleSections
    if (article && article.sections.length > 0) {
        articleSections = article.sections.map(section => (
            <Row style={{borderBottom: '1px solid white', paddingBottom: '2vmin'}}>
                <h3 style={{padding: '1vmin', paddingLeft: '0'}}>{sectionButtons}{section.heading}</h3>
                <p style={{padding: 0}}>{section.body}</p>
            </Row>
        ))
    }
    
    
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Container className='m-2'>
                <Row>
                    <Col>
                        <h1>{article.title}</h1>
                        <p style={{borderBottom: '1px solid white', paddingBottom: '2vmin'}}>{article.summary}</p>
                    </Col>
                    <Col sm='4'>
                        <Card>
                            <Card.Img variant="top" src={article.photo}/>
                            <Card.Body>
                                {infoBoxes}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {articleSections}
                <Row>
                    <p style={{padding: 0, textAlign: 'center'}}>{article.editorList}; &nbsp;last updated {lastUpdated}</p>
                </Row>
                {adminButtons}
            </Container>
            <EditArticleModal
                user={user}
                show={editModalShow}
                updateArticle={updateArticle}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
                article={article}
            />
        </div>
    )
}