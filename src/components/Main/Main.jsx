import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase'; // Asegúrate de que esta ruta sea correcta
import styles from './Main.module.css'; // Importa tus estilos CSS Module

const MainPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  useEffect(() => {
    // Escucha los cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Usuario autenticado
        setUser(currentUser);
      } else {
        // No hay usuario autenticado, redirigir al login
        console.log('No user authenticated. Redirecting to login...');
        // OJO: En una aplicación real con React Router (o Next.js), usarías:
        // history.push('/login'); // para React Router v5
        // navigate('/login');   // para React Router v6
        // router.push('/login'); // para Next.js
        // Por simplicidad, aquí usamos una redirección directa:
        window.location.href = '/Login'; // Asumiendo que tu página de login está en /login
      }
      setLoading(false); // La verificación de autenticación ha terminado
    });

    // Limpiar el listener al desmontar el componente
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // La redirección al login se manejará automáticamente por el onAuthStateChanged listener
      console.log('User signed out successfully.');
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out. Please try again.'); // Un mensaje simple al usuario
    }
  };

  if (loading) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.contentBox}>
          <p className={styles.redirectMessage}>Checking authentication status...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Si loading es false y no hay usuario, significa que ya hemos iniciado la redirección
    return (
      <div className={styles.mainContainer}>
        <div className={styles.contentBox}>
          <p className={styles.redirectMessage}>Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentBox}>
        <h2>Aries</h2>
        <p>You have successfully logged in.</p>
        <p>Usuario: <span className={styles.userInfo}>{user.email}</span></p>
        {/* Aquí puedes añadir el contenido principal de tu aplicación */}
        <p>This is your personalized dashboard. Explore all the features!</p>
        <button onClick={handleSignOut} className={styles.logoutButton}>
          Salir
        </button>
      </div>
    </div>
  );
};

export default MainPage;