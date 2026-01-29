import React from 'react';

function Preloader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <video style={{width:"150px",height:"100vh"}}
        src="/pree.mp4" 
        autoPlay
        loop
        muted
        playsInlin
      />
    </div>
  );
}

export default Preloader;
