import { Button, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../../context/auth-context';
import { useContext } from 'react';
import AuthContextType from '../../models/authContext';
import { useRouter } from 'next/router';

function Navigation() {
  const { token, logout } = useContext(AuthContext) as AuthContextType;

  const router = useRouter();

  const logoutHandler = () => {
    logout();
    router.replace('/');
  };

  return (
    <Navbar bg="info" fixed="top" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Task Manager</Navbar.Brand>

        {token ? (
          <Button onClick={logoutHandler} variant="secondary">
            Logout
          </Button>
        ) : (
          <Button variant="secondary">Login</Button>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;
