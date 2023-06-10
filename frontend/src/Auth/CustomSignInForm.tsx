import React, { useRef, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";

function SignIn() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<any>(null);

  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = React.useState<string | null>(null);

  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    let data = { username: "", password: "" };
    if (emailRef.current !== null && passwordRef.current !== null) {
      data = {
        username: emailRef.current.value,
        password: passwordRef.current.value,
      };
    }

    oktaAuth
      .signInWithCredentials(data)
      .then((res) => {
        const sessionToken = res.sessionToken;
        if (!sessionToken) {
          throw new Error("authentication process failed");
        }
        setSessionToken(sessionToken);
        oktaAuth.signInWithRedirect({
          originalUri: "/",
          // @ts-ignore
          sessionToken: sessionToken,
        });
      })
      .catch((err) => {
        setError(err);
        console.log(`handle error here: ${err}`);
      });
  };

  if (sessionToken) return <div />;

  if (error) {
    return (
      <Redirect
        to={{
          pathname: "/error",
          state: { statusCode: error },
        }}
      />
    );
  }

  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: "100vh" }}
    >
      <div className='w-100 mt-5' style={{ maxWidth: "400px" }}>
        <Card className='text-2'>
          <Card.Body>
            <h2 className='text-center mb-4'>Sign In</h2>
            <Form onSubmit={onSubmit}>
              <Form.Group id='email' className='py-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className='text-2'
                  type='email'
                  ref={emailRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group id='password' className='py-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className='text-2'
                  type='password'
                  ref={passwordRef}
                  required
                ></Form.Control>
                <Button className='w-100 mt-5' type='submit'>
                  Log In
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
export { SignIn };
