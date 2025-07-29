import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function AgregarAsociado() {
  const [form, setForm] = useState({
    ID: "", Nombre: "", Apellido: "", DNI: "", CUIL: "", CBU: "",
    Programa: "", Funcion: "", EtapaRuta: "", Cooperativa: "", CentroVerde: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "asociados"), form);
      alert("Asociado agregado con éxito");
      setForm({ ID: "", Nombre: "", Apellido: "", DNI: "", CUIL: "", CBU: "", Programa: "", Funcion: "", EtapaRuta: "", Cooperativa: "", CentroVerde: "" });
    } catch (error) {
      console.error("Error al agregar:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(form).map((campo) => (
        <div key={campo}>
          <label>{campo}</label>
          <input
            type="text"
            name={campo}
            value={form[campo]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button type="submit">Agregar Asociado</button>
    </form>
  );
}

export default AgregarAsociado;