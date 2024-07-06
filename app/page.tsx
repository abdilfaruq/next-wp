'use client';

import * as React from 'react';
import Image from "next/image";
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  interface UserData {
    token: string;
    user_display_name: string;
    user_nicename: string;
    user_email: string;
  }

  useEffect(() => {
      setLoading(false);
  }, []);

  const handleLogin = async () => {
      setLoading(true);
      try {
          const response = await fetch('http://wp-next.test/wp-json/jwt-auth/v1/token', {

            method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ username, password })
          });
  
          if (!response.ok) {
              throw new Error('Login failed'); 
          }
  
          const data: UserData = await response.json();
          setUserData(data);
          setError(null);
  
      } catch (error: any) {
          setError('Oops! Login failed. Pastikan username dan password Anda benar.');
          setUserData(null);
      } finally {
          setLoading(false);
      }
  };
  
  return (
      <Container fixed>
          <Image
              src="/Untitled-design-scaled.jpg"
              alt="Background Image"
              layout="fill"
              objectFit="cover"
          />
          <Container maxWidth="sm" style={{ position: 'relative', zIndex: 1 }}>
              <Box mt={8}>
                  <Typography variant="h4" gutterBottom style={{ color: '#3f51b5', textAlign: 'center', fontWeight: 600 }}>
                      Provide Your WordPress Credentials
                  </Typography>
                  <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="username"
                      label="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="password"
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleLogin}
                      disabled={loading}
                      style={{
                          marginTop: '1rem',
                          borderRadius: 24, 
                          padding: '12px 24px',
                          textTransform: 'none',
                      }}
                  >
                      Login
                  </Button>
                  {error && (
                      <Typography variant="body1" style={{ marginTop: '1rem', color: 'red', textAlign: 'center', fontWeight: 'bold' }}>
                          {error}
                      </Typography>
                  )}
                  {userData && (
                      <Card style={{
                          marginTop: '2rem',
                          width: '100%',
                          overflow: 'auto',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          borderRadius: '12px',
                          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                      }}>                        
                          <CardContent>
                              <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
                                  User Account Details
                              </Typography>
                              <div style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', margin: 0 }}>
                                  <Typography variant="body1" component="div" style={{ whiteSpace: 'pre-wrap' }}>
                                      <strong>Token:</strong> {userData.token}<br />
                                      <strong>Username:</strong> {userData.user_display_name}<br />
                                      <strong>Alias:</strong> {userData.user_nicename}<br />
                                      <strong>Primary Email:</strong> {userData.user_email}
                                  </Typography>
                              </div>
                          </CardContent>
                      </Card>
                  )}
                  {loading && (
                      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
                          <CircularProgress color="primary" />
                      </div>
                  )}
              </Box>
          </Container>
      </Container>
  );
}
