import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import EditArticleModal from './EditArticleModal'
import ShowArticleSection from '../articleSections/ShowArticleSection'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import { BsPencil, BsTrash3, BsPlusSquare } from 'react-icons/bs'

import { getOneArticle, updateArticle, removeArticle } from '../../api/article'
import { removeArticleSection } from '../../api/articleSection'
import { removeInfoBox } from '../../api/infoBox'

import messages from '../shared/AutoDismissAlert/messages'
import NewArticleSectionModal from '../articleSections/NewArticleSectionModal'
import NewInfoBoxModal from '../infoBoxes/NewInfoBoxModal'
import ShowInfoBox from '../infoBoxes/ShowInfoBox'

export default function ArticleShow (props) {
    const [article, setArticle] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [sectionModalShow, setSectionModalShow] = useState(false)
    const [infoBoxModalShow, setInfoBoxModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

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
    
    let lastUpdated
    if (article) {
        lastUpdated = `${
            article.updatedAt[5] !== 0 ? article.updatedAt.slice(5, 7) : article.updatedAt.slice(6, 7)
            }/${
                article.updatedAt[8] !== 0 ? article.updatedAt.slice(8, 10) : article.updatedAt.slice(9, 10)
            }/${article.updatedAt.slice(0, 4)}`
        }
        
    let adminButtons = null
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
    }
    
    if (!article) {
        return <LoadingScreen />
    }
    
    let infoBoxes
    if (article && article.infoBoxes.length > 0) {
        infoBoxes = article.infoBoxes.map(infoBox => (
            <ShowInfoBox 
                key={infoBox.id}
                infoBox={infoBox}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                user={user}
                article={article}
            />
        ))
    }

    let articleSections
    if (article && article.sections.length > 0) {
        articleSections = article.sections.map(section => (
            <ShowArticleSection
                key={section.id}
                section={section}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                user={user}
                article={article}
            />
        ))
    }

    let addButtons
    if (article && user && article.owner._id === user._id || article.publicallyEditable && user) {
        addButtons = (
            <Card.Text>
                <Row>
                    <Col>
                        <Button 
                            style={{background: 'none', border: 'none', color: 'black', textAlign: 'left'}}
                            onClick={() => setSectionModalShow(true)}
                        ><BsPlusSquare style={{color: 'black'}}/> <span style={{fontSize: '1.2vmin'}}>Add section</span></Button>
                    </Col>
                    <Col>
                        <Button 
                            style={{background: 'none', border: 'none', color: 'black', textAlign: 'left'}}
                            onClick={() => setInfoBoxModalShow(true)}
                        ><BsPlusSquare style={{color: 'black'}}/> <span style={{fontSize: '1.2vmin'}}>Add Info Box</span></Button>
                    </Col>
                </Row>
            </Card.Text>
        )
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
                                {addButtons}
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
            <NewArticleSectionModal
                user={user}
                article={article}
                show={sectionModalShow}
                msgAlert={msgAlert}
                handleClose={() => setSectionModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
            <NewInfoBoxModal
                user={user}
                article={article}
                show={infoBoxModalShow}
                msgAlert={msgAlert}
                handleClose={() => setInfoBoxModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </div>
    )
}