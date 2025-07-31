import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'; // Import specific functions
import { auth } from '../../config/firebase'; // Adjust this path to your actual Firebase config file
import styles from './LoginPage.module.css'; // Import the CSS Module

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' or 'success'

  // Effect to listen for authentication state changes (similar to previous example)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log('User signed in:', user.email);
        setMessage('Inicio de sesión correcto, redireccionando...');
        setMessageType('success');
        // In a real app, you'd redirect to a dashboard or main app page here.
        // For example, if using Next.js router: router.push('/dashboard');
      } else {
        // User is signed out
        console.log('No user signed in.');
        setMessage('Por favor inicie sesion para continuar.');
        setMessageType(''); // No specific message type
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!email || !password) {
      setMessage('Por favor ingrese su email y contraseña.');
      setMessageType('error');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // If successful, onAuthStateChanged listener will handle the message/redirection
      // setMessage('Signed in successfully!'); // This will be superseded by onAuthStateChanged
      // setMessageType('success');
    } catch (error) {
      console.error('Error signing in:', error);
      let errorMessage = 'An unknown error occurred.';

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Este correo electronico no se ah registrado.';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Email o contraseña invalido. Por favor intente nuevamente.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'El Email no es valido.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos. Por favor intente mas tarde.';
          break;
        default:
          errorMessage = error.message;
      }
      setMessage(`${errorMessage}`);
      setMessageType('error');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSignIn}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>Entrar</button>
        </form>
        {message && (
          <p className={`${styles.message} ${messageType === 'error' ? styles.errorMessage : styles.successMessage}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginComponent;