import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { CreatePinButton } from './components/CreatePinButton';
import { Home } from './pages/Home';
import { CreatePin } from './pages/CreatePin';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { Notifications } from './pages/Notifications';
import { Collections } from './pages/Collections';
import { Dashboard } from './pages/Dashboard';
import { Overview } from './pages/dashboard/Overview';
import { MyPins } from './pages/dashboard/MyPins';
import { Analytics } from './pages/dashboard/Analytics';
import { Engagement } from './pages/dashboard/Engagement';
import { Withdrawals } from './pages/dashboard/Withdrawals';
import { PinDetail } from './pages/PinDetail';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Overview />} />
              <Route path="pins" element={<MyPins />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="engagement" element={<Engagement />} />
              <Route path="withdrawals" element={<Withdrawals />} />
            </Route>
            <Route path="/pin/:id" element={<PinDetail />} />
          </Routes>
        </main>
        <CreatePinButton />
      </div>
    </BrowserRouter>
  );
}

export default App;