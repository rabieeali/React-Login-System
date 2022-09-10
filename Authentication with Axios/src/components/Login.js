import { useRef, useState, useEffect } from "react"
import { useAuth } from "../context/AuthProvider";

import axios from '../api/axios'

const LOGIN_URL = '/api'


const Login = () => {


  const { setAuth } = useAuth();


  const userRef = useRef();


  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    userRef.current.focus()
  }, [])


  useEffect(() => {
    setErrMsg()
  }, [user, pwd])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ username: user, password: pwd }),
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true })

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setUser('');
      setPwd('');

      setAuth({ username: user, password: pwd, roles, accessToken })
      setSuccess(true)
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login Failed')
      }
    }
  }





  return (
    <>
      {
        success ? (
          <section>
            <h1>You are Logged In!</h1>
            <br />
            <p><a href="#/">Go To Home</a></p>
          </section>
        ) : (

          <section>
            <strong style={{ color: 'red' }}>{errMsg}</strong>

            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>

              <label htmlFor="username">Username:</label>
              <input
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={e => setUser(e.target.value)}
                value={user}

              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={e => setPwd(e.target.value)}
                value={pwd}

              />
              <button >Sign In</button>
            </form>

            <p>
              need an account?
              <br />
              <a href="#/">Sign Up</a>
            </p>
          </section>
        )}</>
  )
}

export default Login;