import { Form, Button, Container } from "react-bootstrap";

export default function (props) {
    const { article, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3 style={{color: 'black'}}>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label style={{color: 'black'}}>Article Title</Form.Label>
                    <Form.Control
                        placeholder="title"
                        id="title"
                        name="title"
                        value={ article.title }
                        onChange={ handleChange }
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label style={{color: 'black'}}>Summary Section</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Summarize the topic here"
                        id="summary"
                        name="summary"
                        value={ article.summary }
                        onChange={ handleChange }
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check
                        label="Publicly Editable"
                        name="publicallyEditable"
                        defaultChecked={ article.publicallyEditable }
                        onChange={ handleChange }
                        style={{color: 'black'}}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{color: 'black'}}>Upload Photo</Form.Label>
                    <Form.Control
                        placeholder="link goes here"
                        id="photo"
                        name="photo"
                        value={ article.photo }
                        onChange={ handleChange }
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}