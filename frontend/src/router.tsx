import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/home';

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
  );
}
