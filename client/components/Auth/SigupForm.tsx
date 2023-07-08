import axios from 'axios';
import * as yup from 'yup';

import { NextPage } from 'next';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';

import { Formik } from 'formik';
import { useContext, useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { AuthContext } from '../../context/auth-context';
import AuthContextType from '../../models/authContext';
import AlertDanger from '../UI/Alert';

const SignupForm: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const { login } = useContext(AuthContext) as AuthContextType;

  const router = useRouter();

  const handleFormSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const signUpData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };
    try {
      setIsLoading(true);

      const signupResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        signUpData
      );

      if (signupResponse.status === 201) {
        const { token, userId } = signupResponse.data;
        login(token, userId);
        setIsLoading(false);
        router.push('/tasks');
      }
    } catch (err) {
      console.log(err);
      setErrorMsg('Email already exists!');
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
                    new account
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
                          <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label className="text-center">
                              First Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Last Name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.firstName}
                              name="firstName"
                              isValid={
                                touched['firstName'] && !errors['firstName']
                              }
                              isInvalid={
                                touched['firstName'] && errors['firstName']
                              }
                            />

                            <Form.Control.Feedback type="invalid">
                              First Name cannot be empty.
                              {/* {errors['password']} */}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label className="text-center">
                              Last Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Last Name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.lastName}
                              name="lastName"
                              isValid={
                                touched['lastName'] && !errors['lastName']
                              }
                              isInvalid={
                                touched['lastName'] && errors['lastName']
                              }
                            />

                            <Form.Control.Feedback type="invalid">
                              Last Name cannot be empty.
                              {/* {errors['password']} */}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="email">
                            <Form.Label className="text-center">
                              Email
                            </Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.email}
                              name="email"
                              isValid={touched['email'] && !errors['email']}
                              isInvalid={touched['email'] && errors['email']}
                            />

                            <Form.Control.Feedback type="invalid">
                              Invalid email.
                              {/* {errors['password']} */}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.password}
                              name="password"
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
                              disabled={!isValid || isSubmitting}
                              variant="primary"
                              type="submit"
                            >
                              {isLoading ? 'Loading…' : 'Signup'}
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already a member?{' '}
                        <Link href="/" className="text-primary fw-bold">
                          Log In
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

export default SignupForm;

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};
