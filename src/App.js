import './App.css';
import Filter from './Components/Filter';
import Footer from './Components/Footer';
import Header from './Components/Header';
import ProgramList from './Components/ProgramList';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <Filter />
        </aside>
        <section className = "program-list-section">
          <ProgramList />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
