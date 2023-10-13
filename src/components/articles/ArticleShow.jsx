import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'

import { getOneArticle, updateArticle, removeArticle } from '../../api/article'

import messages from '../shared/AutoDismissAlert/messages'

export default function ArticleShow (props) {
    const [article, setArticle] = useState(null)
    
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

    let infoBoxes
    if (article && article.infoBoxes.length > 0) {
        infoBoxes = article.infoBoxes.map(infoBox => (
            <Card.Text>
                <Row>
                    <Col style={{borderRight: '1px solid black'}}>{infoBox.title}</Col>
                    <Col>{infoBox.summary}</Col>
                </Row>
            </Card.Text>
        ))
    }

    let articleSections
    if (article && article.sections.length > 0) {
        articleSections = article.sections.map(section => (
            <Row style={{borderBottom: '1px solid white', paddingBottom: '2vmin'}}>
                <h3 style={{padding: '1vmin'}}>{section.heading}</h3>
                <p style={{padding: 0}}>{section.body}</p>
            </Row>
        ))
    }

    let lastUpdated
    if (article) {
        lastUpdated = `${
            article.updatedAt[5] !== 0 ? article.updatedAt.slice(5, 7) : article.updatedAt.slice(6, 7)
            }/${
            article.updatedAt[8] !== 0 ? article.updatedAt.slice(8, 10) : article.updatedAt.slice(9, 10)
            }/${article.updatedAt.slice(0, 4)}`
    }

    if (!article) {
        return <LoadingScreen />
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
            </Container>
        </div>
    )
}