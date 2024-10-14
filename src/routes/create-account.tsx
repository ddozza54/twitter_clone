import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { Error, Form, Input, Switcher, Title, Wrapper } from '../components/auth-components';
import GithubButton from '../components/github-button';

export default function CreateAccount() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError('');
    if (
      isLoading ||
      name === '' ||
      email === '' ||
      password === ''
    )
      return;
    try {
      setIsLoading(true);
      // 1. create an account
      const credentials =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      //로그인에 성공하면 바로 user에 대한 정보를 받을 수 있다.
      console.log(credentials.user);
      // 2. set the name of the user
      await updateProfile(credentials.user, {
        displayName: name,
      });
      // 3. redirect to the home page
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code, e.message);
        setError(e.message);
      }
      //setError
    } finally {
      setIsLoading(false);
    }
    console.log(name, email, password);
  };

  return (
    <Wrapper>
      <Title>Join 🐦</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input
          onChange={onChange}
          type="submit"
          value={
            isLoading ? 'Loading...' : 'Create Account'
          }
        />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account?{' '}
        <Link to="/login">Please Login &rarr</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
