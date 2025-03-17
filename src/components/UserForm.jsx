import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  Nav,
  Image,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppContext } from "../Context/useAppContext";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  // State for form type (login/signup/forgot)
  const [formType, setFormType] = useState("login");
  let { login, logout } = useAppContext();
  const navigate = useNavigate();
  // State for form validation
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // State for form data
  const initialFormState = {
    email: "",
    password: "",
    confirmPassword: "",
    userType: "normal",
    firstName: "",
    lastName: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  const sendFormData = async (data) => {
    try {
      // Replace with your actual backend API endpoint
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      console.log("Success:", result);
      return result;
    } catch (error) {
      console.error("Error sending data:", error);
      throw error;
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate_user = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/validate?email=${formData.email}&password=${formData.password}`
      );
      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return false;
      }

      login();

      navigate("/");
      return true;
    } catch (error) {
      console.error("error fetching user validation data", error);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // Form validation
    if (
      formType === "signup" &&
      formData.password !== formData.confirmPassword
    ) {
      setError("Passwords do not match");
      return;
    }

    setValidated(true);

    // Simulate form submission
    if (formType === "login") {
      setSuccess("Login successful!");

      validate_user();
    } else if (formType === "signup") {
      setSuccess("Account created successfully!");
      sendFormData(formData);
      // console.log("Signup data:", formData);
    } else if (formType === "forgot") {
      setSuccess("Password reset link sent to your email!");
      console.log("Forgot password for:", formData.email);
    }

    // Clear error if success
    setError("");
    setFormData(initialFormState);
  };

  // Switch between form types
  const switchForm = (type) => {
    setFormType(type);
    setValidated(false);
    setError("");
    setSuccess("");
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card
            className="shadow-lg border-0"
            style={{
              borderRadius: "15px",
              background: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <Card.Header className="text-center border-0 bg-transparent pt-4">
              <div className="mb-3">
                <Image
                  // src="https://img.icons8.com/color/96/000000/tree-planting.png"
                  alt="Gardening Logo"
                  width="80"
                />
              </div>
              <h2 className="text-success">GreenThumb Garden System</h2>
              <p className="text-muted">Grow with us, nurture your garden</p>

              <Nav variant="tabs" className="justify-content-center border-0">
                <Nav.Item>
                  <Nav.Link
                    active={formType === "login"}
                    onClick={() => switchForm("login")}
                    className={
                      formType === "login"
                        ? "bg-success text-white"
                        : "text-success"
                    }
                  >
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={formType === "signup"}
                    onClick={() => switchForm("signup")}
                    className={
                      formType === "signup"
                        ? "bg-success text-white"
                        : "text-success"
                    }
                  >
                    Sign Up
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={formType === "forgot"}
                    onClick={() => switchForm("forgot")}
                    className={
                      formType === "forgot"
                        ? "bg-success text-white"
                        : "text-success"
                    }
                  >
                    Forgot Password
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>

            <Card.Body className="px-4 py-4">
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {/* Login Form */}
                {formType === "login" && (
                  <>
                    <Form.Group className="mb-3" controlId="loginEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="loginPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your password.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      variant="success"
                      type="submit"
                      className="w-100 py-2"
                      style={{
                        backgroundColor: "#2E8B57",
                        borderColor: "#2E8B57",
                      }}
                    >
                      Login
                    </Button>
                  </>
                )}

                {/* Sign Up Form */}
                {formType === "signup" && (
                  <>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group controlId="firstName">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="First name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide your first name.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="lastName">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Last name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide your last name.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="signupEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="userType">
                      <Form.Label>User Type</Form.Label>
                      <Form.Select
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        required
                      >
                        <option value="normal">Normal User</option>
                        <option value="gardener">Gardener</option>
                        <option value="supervisor">Supervisor</option>
                        <option value="admin">Admin</option>
                      </Form.Select>
                      <Form.Text className="text-muted">
                        Select your role in the gardening system.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="signupPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="8"
                      />
                      <Form.Control.Feedback type="invalid">
                        Password must be at least 8 characters.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="confirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please confirm your password.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      variant="success"
                      type="submit"
                      className="w-100 py-2"
                      style={{
                        backgroundColor: "#2E8B57",
                        borderColor: "#2E8B57",
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}

                {/* Forgot Password Form */}
                {formType === "forgot" && (
                  <>
                    <Form.Group className="mb-4" controlId="forgotEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your registered email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        We'll send a password reset link to this email.
                      </Form.Text>
                    </Form.Group>

                    <Button
                      variant="success"
                      type="submit"
                      className="w-100 py-2"
                      style={{
                        backgroundColor: "#2E8B57",
                        borderColor: "#2E8B57",
                      }}
                    >
                      Reset Password
                    </Button>
                  </>
                )}
              </Form>
            </Card.Body>

            <Card.Footer className="text-center bg-transparent border-0 pb-4">
              <small className="text-muted">
                &copy; {new Date().getFullYear()} GreenThumb Garden System. All
                rights reserved.
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserForm;
