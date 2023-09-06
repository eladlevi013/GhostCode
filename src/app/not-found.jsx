"use client"
import React from 'react';
import { motion } from 'framer-motion';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '100px',
};

const textContainerStyle = {
  textAlign: 'center',
  fontFamily: 'dimbo',
  color: '#24150f',
};

const headerStyle = {
  fontSize: '200px',
};

const subtitleStyle = {
  fontSize: '50px',
  marginTop: '-160px',
};

export default function NotFound() {
  return (
    <div style={containerStyle}>
      <div style={textContainerStyle}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          style={{ marginTop: '50px' }}
        >
          <h1 style={headerStyle}>404</h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ marginTop: '50px' }}
        >
          <p style={subtitleStyle}>Page Not Found</p>
        </motion.div>
      </div>
    </div>
  );
}
