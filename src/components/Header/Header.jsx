import S from './styles.module.scss'
import { HiOutlineLogout } from 'react-icons/hi';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown'

export function Header(){
    return (
      <div className={S.navBar}>
      <Navbar style={{background:'#e0f1e0'}} expand="lg" className={S.navBarItens}>
        <Container fluid >
          <Navbar.Brand>Clínica tal</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to='/initial'>Painel Administrativo</Nav.Link>
              <Nav.Link as={Link} to='/procedures'>Resumo Diário</Nav.Link>
              <NavDropdown title="Procedimentos">
                <NavDropdown.Item as={Link} to='/create_consult'>Criar consultas</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/create_exam'>Criar exame</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/scheduling_consult'>Agendamento</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Cadastros">
                <NavDropdown.Item  as={Link} to='/register_patient'>Cadastrar paciente</NavDropdown.Item >
                <NavDropdown.Item as={Link} to='/register_doctor'>Cadastrar Doutor</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to='/search_patient'>Procurar paciente</Nav.Link>
              </Nav>

              <Nav className={S.logout}>
                <Nav.Link className={S.Username}>Olá, fulana</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                  <HiOutlineLogout className={S.iconLogout} />
                </Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
    );
  }
  
   