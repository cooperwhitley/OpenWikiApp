import { Form, Button, Container } from 'react-bootstrap'

export default function InfoBoxForm(props) {
    const { infoBox, handleChange, handleSubmit, heading } = props

    return (
        <Container className='justify-content-center'>
            <h3 style={{color: 'black'}}>{ heading }</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label style={{color: 'black'}}>Info box label</Form.Label>
                    <Form.Control
                        placeholder='label'
                        id='title'
                        name='title'
                        value={infoBox.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label style={{color: 'black'}}>Info</Form.Label>
                    <Form.Control
                        placeholder='information'
                        id='summary'
                        name='summary'
                        value={infoBox.summary}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className='m-2' type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}