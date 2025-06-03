import React, { useState } from 'react';
import '../styles/login.css';

const CORRECT_PIN = '1234';

const Login = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleAppend = (num) => {
    if (pin.length < 4) setPin(pin + num);
    setError('');
  };

  const handleClear = () => {
    setPin('');
    setError('');
  };

  const handleSubmit = () => {
    if (pin === CORRECT_PIN) {
      setError('');
      onLogin();
    } else {
      setError('PIN incorrecto');
    }
  };

  const display = pin.padEnd(4, '-').replace(/./g, (c) => (c === '-' ? '-' : '•'));

  return (
    <div style={{width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden'}}>
      {/* Header */}
      <div
        style={{
          width: '100vw',
          height: 93,
          background: '#F5DB13',
          boxShadow: '0 4px 16px 0 #F5DB13',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 10
        }}
      >
        <img
          src={require('../img/pok.svg').default}
          alt="Pokédex Logo"
          style={{height: 60}}
        />
      </div>
      {/* Main content */}
      <div
        className="login-container"
        style={{
          width: '100vw',
          height: 'calc(100vh - 93px)',
          position: 'absolute',
          top: 93,
          left: 0,
        }}
      >
        <div
          className="login-box"
          style={{
            width: 320,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            padding: 24,
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2
          }}
        >
          <h1>Pokédex Login</h1>
          <p className="pin-display">{display}</p>
          <div className="keypad" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, width: 180}}>
            {[1,2,3,4,5,6,7,8,9,0].map((num) => (
              <button key={num} onClick={() => handleAppend(num.toString())} style={{width: 50, height: 50, fontSize: 20}}>{num}</button>
            ))}
          </div>
          <div className="actions" style={{marginTop: 16, display: 'flex', gap: 8}}>
            <button className="submit" onClick={handleSubmit}>Login</button>
            <button className="clear" onClick={handleClear}>Clear</button>
          </div>
          {error && <div className="error">{error}</div>}
        </div>
        <div
          className="login-banner"
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: '100%',
            zIndex: 1
          }}
        >
          <img
            src={require('../img/banner.png')}
            alt="Pokédex Banner"
            style={{ maxWidth: '80%', maxHeight: '70vh', borderRadius: 20 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;