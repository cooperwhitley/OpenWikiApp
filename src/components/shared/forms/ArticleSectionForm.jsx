import { Form, Button, Container } from 'react-bootstrap'

export default function ArticleSectionForm(props) {
    const { section, handleChange, handleSubmit, heading } = props

    return (
        <Container className='justify-content-center'>
            <h3 style={{color: 'black'}}>{ heading }</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label style={{color: 'black'}}>Section Heading</Form.Label>
                    <Form.Control
                        placeholder='Heading'
                        id='heading'
                        name='heading'
                        value={section.heading}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label style={{color: 'black'}}>Section Body</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Summarize the topic here"
                        id="body"
                        name="body"
                        value={ section.body }
                        onChange={ handleChange }
                    />
                </Form.Group>
                <Button className='m-2' type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}