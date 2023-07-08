import axios from 'axios';
import * as yup from 'yup';

import { NextPage } from 'next';

import { Formik } from 'formik';

import { useContext, useState } from 'react';

import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { AuthContext } from '../../context/auth-context';
import AuthContextType from '../../models/authContext';
import AlertDanger from '../UI/Alert';

const LoginForm: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const [errorMsg, setErrorMsg] = useState<string>('');

  const { login } = useContext(AuthContext) as AuthContextType;

  const router = useRouter();

  const handleFormSubmit = async (values: {
    email: string;
    password: string;
  }) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };
    try {
      setIsLoading(true);

      const loginResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        loginData
      );
      console.log(loginResponse);

      if (loginResponse.status === 201) {
        setIsLoading(false);
        const { token, userId } = loginResponse.data;
        console.log(token, userId);
        login(token, userId);
        router.push('/tasks');
      }
    } catch (err) {
      console.log(err);
      setErrorMsg('Wrong Email or password!');
      setShow(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertDanger message={errorMsg} show={show} setShow={setShow} />;
      <Container>
        <Row className="vh-70 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase text-center">
                    Login
                  </h2>
                  <div className="mb-3">
                    <Formik
                      onSubmit={handleFormSubmit}
                      initialValues={initialValues}
                      validationSchema={schema}
                    >
                      {({
                        isValid,
                        isSubmitting,
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                      }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                          <Form.Group
                            className="mb-3"
                            // controlId="formBasicEmail"
                            controlId="email"
                          >
                            <Form.Label className="text-center">
                              Email
                            </Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.email}
                              // name="email"
                              isValid={touched['email'] && !errors['email']}
                              isInvalid={touched['email'] && errors['email']}
                              feedback={errors['email']}
                            />

                            <Form.Control.Feedback type="invalid">
                              Invalid email.
                              {/* {errors['email']} */}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="password"
                            // controlId="formBasicPassword"
                          >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.password}
                              // name="password"
                              isValid={
                                touched['password'] && !errors['password']
                              }
                              isInvalid={
                                touched['password'] && errors['password']
                              }
                            />

                            <Form.Control.Feedback type="invalid">
                              Password must be 6 characters or more.
                              {/* {errors['password']} */}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <div className="d-grid">
                            <Button
                              variant="primary"
                              type="submit"
                              disabled={!isValid || isSubmitting}
                            >
                              {isLoading ? 'Loading…' : 'Login'}
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>

                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Dont have an account?{' '}
                        <Link href="/signup" className="text-primary fw-bold">
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginForm;

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const initialValues = {
  email: '',
  password: '',
};
