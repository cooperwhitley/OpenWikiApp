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

    if (!article) {
        return <LoadingScreen />
    }
    

    return (
        <>
            <Container className='m-2'>
                <Row>
                    <Col>
                        <h1>{article.title}</h1>
                        <p>{article.summary}</p>
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
            </Container>
        </>
    )
}