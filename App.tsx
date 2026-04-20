import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './src/pages/home/HomePage.tsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
