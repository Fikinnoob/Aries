import AgregarAsociado from './components/AgregarAsociado/AgregarAsociado';
import TablaAsociados from './components/TablaAsociados/TablaAsociados';
import './App.css';

function App() {
  return (

    <div>
      <h1>Gestion de asociados</h1>
      <AgregarAsociado />
      <hr />
      <TablaAsociados />  
    </div>


  )
}

export default App
