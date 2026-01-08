import React from 'react';

const AuthSlider = ({ mode, setMode }) => {
  return (
    <div className="auth-slider">
      <div className="slider-track">
        <div className={`slider-thumb ${mode === 'signup' ? 'right' : 'left'}`} />
        <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Login</button>
        <button className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>Signup</button>
      </div>
    </div>
  );
};

export default AuthSlider;