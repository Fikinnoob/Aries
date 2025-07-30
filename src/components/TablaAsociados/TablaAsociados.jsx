import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import styles from './TablaAsociado.module.css';

function TablaAsociados() {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const snapshot = await getDocs(collection(db, "asociados"));
        setDatos(snapshot.docs.map(doc => doc.data()));
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerDatos();
  }, []);

  const columnas = ["ID", "Nombre", "Apellido", "DNI", "CUIL", "CBU", "Programa", "Funcion", "Etapa/Ruta", "Cooperativa", "Centro Verde"];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Listado de Asociados</h1>
      {loading ? (
        <p>Cargando datos...</p>
      ) : datos.length === 0 ? (
        <p className={styles.emptyMessage}>No hay asociados registrados</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              {columnas.map((col) => (
                <th key={col} className={styles.th}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datos.map((asociado, i) => (
              <tr key={i} className={styles.tr}>
                <td className={styles.td}>{asociado.ID}</td>
                <td className={styles.td}>{asociado.Nombre}</td>
                <td className={styles.td}>{asociado.Apellido}</td>
                <td className={styles.td}>{asociado.DNI}</td>
                <td className={styles.td}>{asociado.CUIL}</td>
                <td className={styles.td}>{asociado.CBU}</td>
                <td className={styles.td}>{asociado.Programa}</td>
                <td className={styles.td}>{asociado.Funcion}</td>
                <td className={styles.td}>{asociado.EtapaRuta}</td>
                <td className={styles.td}>{asociado.Cooperativa}</td>
                <td className={styles.td}>{asociado.CentroVerde}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TablaAsociados;