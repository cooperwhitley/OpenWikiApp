import { useState } from 'react'
import { createArticle } from '../../api/article'
import messages from '../shared/AutoDismissAlert/messages'
import ArticleForm from '../shared/forms/ArticleForm'
import { useNavigate } from 'react-router-dom'

export default function ArticleCreate(props) {
    const { user, msgAlert } = props
    const navigate = useNavigate()
    
    const [article, setArticle] = useState({
        title: '',
        summary: '',
        publicallyEditable: true,
        photo: ''
    })

    const onChange = (evt) => {
        evt.persist()

        setArticle(prevArticle => {
            const updatedName = evt.target.name
            let updatedValue = evt.target.value

            if (updatedName === 'publicallyEditable' && evt.target.checked) {
                updatedValue = true
            } else if (updatedName === 'publicallyEditable' && !evt.target.checked) {
                updatedValue = false
            }

            const updatedArticle = { [updatedName] : updatedValue }

            return {
                ...prevArticle, ...updatedArticle
            }
        })
    }

    const onSubmit = (evt) => {
        evt.preventDefault()
        
        createArticle(user, article)
            .then(res => {navigate(`/articles/${res.data.article._id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Awesome!',
                    message: messages.createArticleSuccess,
                    variant: 'success'
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'error',
                    message: messages.createArticleFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <ArticleForm
            article={article}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading='Add a new article'
        />
    )
}