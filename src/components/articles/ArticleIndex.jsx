import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import "./ArticleIndex.css"

import { getAllArticles } from '../../api/article'

import messages from '../shared/AutoDismissAlert/messages'

export default function ArticleIndex ({ msgAlert }) {

    const [articles, setArticles] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        getAllArticles()
            .then(res => {
                setArticles(res.data.articles)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.indexArticlesFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <LoadingScreen />
    }

    if (!articles) {
        return <LoadingScreen />
    } else if (articles.length === 0) {
        return <p>No articles yet, add some knowledge!</p>
    }

    const articleCards = articles.map(article => (
        <Card key={article._id} bg='dark' text='white' className='ArticleListCard mb-2'>
            <Card.Img variant="top" src={article.photo} />
            <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>
                    {/* checks for article length, if longer than 200 characters cut off and add elipses */}
                    {article.summary.length > 200 ? 
                    `${article.summary.slice(0, 200)}...` :
                    article.summary }
                    {/* add blank space, i always remember this bc i read it like tbsp and laugh */}
                    {/* because in my head i hear "nablespoon" which is really funny */}
                    &nbsp;
                </Card.Text>
            </Card.Body>
            <Link to={`/articles/${article._id}`} className='ArticleListCardLink'>
                Read more
            </Link>
        </Card>
    ))

    return (
        <div className="ArticleIndex">
            {articleCards}
        </div>
    )
}