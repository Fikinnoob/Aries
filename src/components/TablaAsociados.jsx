import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function TablaAsociados() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const snapshot = await getDocs(collection(db, "asociados"));
      setDatos(snapshot.docs.map(doc => doc.data()));
    };
    obtenerDatos();
  }, []);

  return (
    <table border="1">
      <thead>
        <tr>
          {["ID", "Nombre", "Apellido", "DNI", "CUIL", "CBU", "Programa", "Funcion", "EtapaRuta", "Cooperativa", "CentroVerde"].map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datos.map((asociado, i) => (
          <tr key={i}>
            <td>{asociado.ID}</td>
            <td>{asociado.Nombre}</td>
            <td>{asociado.Apellido}</td>
            <td>{asociado.DNI}</td>
            <td>{asociado.CUIL}</td>
            <td>{asociado.CBU}</td>
            <td>{asociado.Programa}</td>
            <td>{asociado.Funcion}</td>
            <td>{asociado.EtapaRuta}</td>
            <td>{asociado.Cooperativa}</td>
            <td>{asociado.CentroVerde}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaAsociados;