import React, { useEffect } from 'react'
import S from './styles.module.scss'
import { HiOutlineLogout } from 'react-icons/hi'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown'

export function Header() {
  const getUserName = () => {
    const userDataString = localStorage.getItem('user')
    const userData = JSON.parse(userDataString)
    return userData?.user?.nome
  }

  const getClinicName = () => {
    const userDataString = localStorage.getItem('user')
    const userData = JSON.parse(userDataString)
    const clinicName = userData?.user?.clinica
    return clinicName
  }

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload()
    navigate("/")
  } 

  return (
    <div className={S.navBar}>
      <Navbar
        style={{ background: '#e0f1e0' }}
        expand="lg"
        className={S.navBarItens}
      >
        <Container fluid>
          <Navbar.Brand>{getClinicName()}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/initial">
                Painel administrativo
              </Nav.Link>
              <NavDropdown title="Resumos">
              <NavDropdown.Item as={Link} to="/procedures">
                Resumo diário
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/procedures_scheduling">
                Agendamento de procedimento
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/report_professional">
                Relatório por profissional
              </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Procedimentos">
                <NavDropdown.Item as={Link} to="/create_consult">
                  Criar consultas
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/create_exam">
                  Criar exame
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/scheduling_consult">
                  Criar agendamento
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Cadastros">
                <NavDropdown.Item as={Link} to="/register_patient">
                  Cadastrar paciente
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register_doctor">
                  Cadastrar doutor
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/search_patient">
                Procurar paciente
              </Nav.Link>
            </Nav>

            <Nav className={S.logout}>
              <Nav.Link className={S.Username}>Olá, {getUserName()}</Nav.Link>
              <Button eventKey={2} onClick={handleLogout}>
                <HiOutlineLogout className={S.iconLogout} />
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
