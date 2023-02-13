import { Container, Dropdown, FormControl, Nav, Navbar } from "react-bootstrap";
import { HiShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" heigh>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search a Product"
            className="m-auto"
          />
        </Navbar.Text>
        <Nav>
          <Dropdown>
            <Dropdown.Toggle split variant="success" id="dropdown-split-basic">
              <HiShoppingCart fontSize="25px" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <span style={{ padding: 10 }}>Cart is Empty!!</span>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
