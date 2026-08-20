import { Routes, Route } from 'react-router';
import DestinationList from './pages/DestinationList';
import DestinationDetails from './pages/DestinationDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DestinationList />} />
      <Route path="/destination/:id" element={<DestinationDetails />} />
    </Routes>
  );
}

export default App;
