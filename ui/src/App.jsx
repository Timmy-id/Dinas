import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import SignUpForm from './modules/auth/components/SignUpForm';
import SignInForm from './modules/auth/components/SignInForm';
import DashboardPage from './modules/dashboard/components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/register' element={<SignUpForm />} />
        <Route path='/login' element={<SignInForm />} />
      </Routes>
    </Router>
  );
}

export default App;
