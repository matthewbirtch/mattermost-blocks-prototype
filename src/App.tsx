import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import FramesPage from './pages/FramesPage';
import ComponentsPage from './pages/ComponentsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/frames" element={<FramesPage />} />
      <Route path="/components" element={<ComponentsPage />} />
    </Routes>
  );
}
