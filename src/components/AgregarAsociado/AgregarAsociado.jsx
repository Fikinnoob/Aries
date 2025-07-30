import { useState } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import styles from './AgregarAsociado.module.css';

function AgregarAsociado() {
  const [form, setForm] = useState({
    Nombre: "", Apellido: "", DNI: "", CUIL: "", CBU: "",
    Programa: "", Funcion: "", EtapaRuta: "", Cooperativa: "", CentroVerde: ""
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "asociados"), form);
      setSuccess(true);
      setForm({Nombre: "", Apellido: "", DNI: "", CUIL: "", CBU: "", Programa: "", Funcion: "", EtapaRuta: "", Cooperativa: "", CentroVerde: "" });
    } catch (error) {
      console.error("Error al agregar:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Agregar Nuevo Asociado</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.grid}>
          {Object.keys(form).map((campo) => (
            <div className={styles.formGroup} key={campo}>
              <label className={styles.label}>{campo}</label>
              <input
                type="text"
                className={styles.input}
                name={campo}
                value={form[campo]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>
        <button type="submit" className={styles.submitButton}>Agregar Asociado</button>
        {success && <p className={styles.successMessage}>Asociado agregado con éxito!</p>}
      </form>
    </div>
  );
}

export default AgregarAsociado;