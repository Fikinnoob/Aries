import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; // Importa onAuthStateChanged
import { auth } from '.../../config/firebase'; // Asegúrate de que esta ruta sea correcta para tu 'auth' de Firebase

// Tus componentes
import LoginComponent from './components/Login/LoginPage';
import MainComponent from './components/Main/Main'; // Asegúrate de que el nombre del archivo y el import coincidan (antes Main, ahora MainPage si es el archivo)
// import AgregarAsociado from './components/AgregarAsociado/AgregarAsociado'; // Por ahora, comenta estos
// import TablaAsociados from './components/TablaAsociados/TablaAsociados';   // para enfocarnos en Login/Main

import './App.css'; // Tus estilos globales

function App() {
  const [user, setUser] = useState(null); // Estado para guardar la información del usuario autenticado
  const [loading, setLoading] = useState(true); // Estado para indicar si estamos verificando la autenticación inicial

  useEffect(() => {
    // Este listener se ejecuta cada vez que cambia el estado de autenticación de Firebase (login, logout, recarga de página)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Actualiza el estado 'user' con el usuario actual (o null si no hay)
      setLoading(false);    // Ya terminamos de verificar el estado inicial de autenticación
    });

    // Esta función de limpieza se ejecuta cuando el componente App se desmonta
    // Es importante para evitar fugas de memoria.
    return () => unsubscribe();
  }, []); // El array vacío [] asegura que este efecto solo se ejecute una vez al montar el componente

  // Mientras verificamos el estado de autenticación, podemos mostrar un mensaje de carga
  if (loading) {
    return (
      <div className="app-loading">
        <p>Cargando aplicación...</p>
        {/* Aquí podrías poner un spinner de carga si quisieras */}
      </div>
    );
  }

  // Si 'loading' es false, ya sabemos si hay un usuario o no
  if (user) {
    // Hay un usuario logueado, mostramos la página principal
    return (
      <div className="app-container">
        <MainComponent />
        {/* En una aplicación más compleja, aquí podrías tener un sistema de rutas */}
        {/* que cargue AgregarAsociado o TablaAsociados dentro de MainPage o como rutas separadas */}
      </div>
    );
  } else {
    // No hay usuario logueado, mostramos el componente de login
    return (
      <div className="app-container">
        <LoginComponent />
      </div>
    );
  }
}

export default App;