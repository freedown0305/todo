import { useState } from 'react';
import { Button,Navbar,Container,Nav,NavDropdown,Accordion,Badge,Row,Col,Form} from 'react-bootstrap';
import './App.css';
import Data from './data.js';

function App() {
  let [todo, todoChange] = useState(Data);
  let [registForm, registFormChange] = useState(false);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">개발 투두리스트</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={()=>{registFormChange(!registForm)}}>작성하기</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Accordion>
        {
          todo.map((v) => {
            return (
              <Accordion.Item eventKey={v.id} key={v.id}>
                <Accordion.Header>
                  {v.complete 
                    ?
                    <Badge pill bg="success">
                      완료
                    </Badge>
                    :
                    <Badge pill bg="secondary">
                      미완료
                    </Badge>
                  }

                  {v.title}
                </Accordion.Header>
                <Accordion.Body>
                  {v.desc}
                </Accordion.Body>
              </Accordion.Item>
            )
          })
        }
      </Accordion>

      <br />

      {
        registForm
        ? <Regist todoChange={todoChange} todo={todo} registFormChange={registFormChange} />
        : null
      }
    </div>
  );
}

function Regist (props) {
  let [registValue, registValueChange] = useState({
      id : props.todo.length + 1,
      complete : 0,
      title : '',
      desc : ''
  });

  function onChange (e) {
    const {value, name} = e.target;
    registValueChange({
      ...registValue,
      [name] : value
    });
  }

  function setList () {
    console.log(registValue);
    console.log(props.todo);

    props.todoChange([
      ...props.todo,
      registValue
    ]);

    props.registFormChange(false);
  }

  return (
    <Container>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            제목
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" name="title" placeholder="제목" onChange={onChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            내용
          </Form.Label>
          <Col sm="10">
            <Form.Control as="textarea" rows="3" name="desc" placeholder="내용" onChange={onChange}/>
          </Col>
        </Form.Group>

        <Button variant="primary" type="button" onClick={setList}>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default App;