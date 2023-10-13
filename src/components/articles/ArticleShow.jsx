import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button } from 'react-bootstrap'

import { getOneArticle, updateArticle, removeArticle } from '../../api/article'

import messages, { showArticleFailure } from '../shared/AutoDismissAlert/messages'

export default function ArticleShow ({ user, msgAlert }) {
    const [article, setArticle] = useState(null)
    
    const [updated, setUpdated] = useState(false)

    const navigate = useNavigate()

    const { id } = useParams()
    
    useEffect(() => {
        getOneArticle(id)
            .then(res => setArticle(res.data.article))
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: showArticleFailure,
                    variant: 'danger'
                })
            })
    }, [updated])
    
    return (
        <div>
            <h1>{article.title}</h1>
        </div>
    )
}