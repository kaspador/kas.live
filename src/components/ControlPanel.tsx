'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Wifi, WifiOff, Activity, Layers, Hash, ChevronDown, ChevronUp, X } from 'lucide-react';
import { VisualizationSettings } from '@/types/kaspa';

interface ControlPanelProps {
  settings: VisualizationSettings;
  onSettingsChange: (settings: VisualizationSettings) => void;
  isConnected: boolean;
  connectionStatus: string;
  stats: {
    blockCount: number;
    currentHeight: number;
    daaScore: number;
  };
}

export default function ControlPanel({
  settings,
  onSettingsChange,
  isConnected,
  connectionStatus,
  stats
}: ControlPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Auto-collapse on mobile
      if (mobile) {
        setIsCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateSetting = <K extends keyof VisualizationSettings>(
    key: K,
    value: VisualizationSettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  if (isMinimized) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel"
        style={{
          position: 'fixed',
          top: isMobile ? '10px' : '20px',
          left: isMobile ? '10px' : '20px',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 50
        }}
        onClick={() => setIsMinimized(false)}
      >
        <Settings className="w-6 h-6" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`glass-panel ${isCollapsed ? 'collapsed' : ''}`}
      style={{
        position: 'fixed',
        top: isMobile ? '10px' : '20px',
        left: isMobile ? '10px' : '20px',
        right: isMobile ? '10px' : 'auto',
        width: isMobile ? 'auto' : '300px',
        maxHeight: isMobile ? (isCollapsed ? '70px' : '60vh') : '80vh',
        overflowY: 'auto',
        zIndex: 50,
        fontSize: isMobile ? '16px' : '14px'
      }}
    >
      {/* Header */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: isMobile ? '16px 0' : '12px 0',
          borderBottom: isCollapsed ? 'none' : '1px solid rgba(59, 130, 246, 0.3)',
          cursor: isMobile ? 'pointer' : 'default',
          minHeight: isMobile ? '44px' : 'auto'
        }}
        onClick={isMobile ? () => setIsCollapsed(!isCollapsed) : undefined}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings className="w-5 h-5" />
          <span style={{ fontWeight: 'bold' }}>Kaspa BlockDAG</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isMobile && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCollapsed(!isCollapsed);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                padding: '8px',
                cursor: 'pointer',
                minHeight: '44px',
                minWidth: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
            </button>
          )}
          <button
            onClick={() => setIsMinimized(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#6b7280',
              padding: '8px',
              cursor: 'pointer',
              minHeight: '44px',
              minWidth: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {(!isMobile || !isCollapsed) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            {/* Connection Status */}
            <div style={{ marginTop: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                {isConnected ? (
                  <Wifi style={{ width: '16px', height: '16px', color: '#10b981' }} />
                ) : (
                  <WifiOff style={{ width: '16px', height: '16px', color: '#ef4444' }} />
                )}
                <span style={{
                  fontSize: isMobile ? '16px' : '14px',
                  color: isConnected ? '#10b981' : '#ef4444',
                  fontWeight: 'bold'
                }}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <div style={{ fontSize: isMobile ? '14px' : '12px', color: '#9ca3af' }}>
                {connectionStatus}
              </div>
            </div>

            {/* Stats */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: isMobile ? '18px' : '16px', fontWeight: 'bold' }}>Statistics</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity style={{ width: '16px', height: '16px', color: '#3b82f6' }} />
                  <span style={{ fontSize: isMobile ? '16px' : '14px', color: '#d1d5db' }}>
                    Blocks: {stats.blockCount.toLocaleString()}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers style={{ width: '16px', height: '16px', color: '#8b5cf6' }} />
                  <span style={{ fontSize: isMobile ? '16px' : '14px', color: '#d1d5db' }}>
                    Height: {stats.currentHeight.toLocaleString()}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Hash style={{ width: '16px', height: '16px', color: '#ec4899' }} />
                  <span style={{ fontSize: isMobile ? '16px' : '14px', color: '#d1d5db' }}>
                    DAA: {stats.daaScore.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: isMobile ? '18px' : '16px', fontWeight: 'bold' }}>Settings</h3>
              
              {/* Animation Speed */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontSize: isMobile ? '16px' : '14px',
                  fontWeight: '500' 
                }}>
                  Animation Speed: {settings.animationSpeed.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={settings.animationSpeed}
                  onChange={(e) => updateSetting('animationSpeed', parseFloat(e.target.value))}
                  style={{
                    width: '100%',
                    height: isMobile ? '44px' : '32px',
                    background: '#374151',
                    borderRadius: '4px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
              </div>

              {/* Block Size */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontSize: isMobile ? '16px' : '14px',
                  fontWeight: '500' 
                }}>
                  Block Size: {settings.blockSize}px
                </label>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="5"
                  value={settings.blockSize}
                  onChange={(e) => updateSetting('blockSize', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    height: isMobile ? '44px' : '32px',
                    background: '#374151',
                    borderRadius: '4px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
              </div>

              {/* Auto Scroll Toggle */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  fontSize: isMobile ? '16px' : '14px',
                  fontWeight: '500',
                  minHeight: isMobile ? '44px' : '32px'
                }}>
                  <input
                    type="checkbox"
                    checked={settings.autoScroll}
                    onChange={(e) => updateSetting('autoScroll', e.target.checked)}
                    style={{
                      width: isMobile ? '20px' : '16px',
                      height: isMobile ? '20px' : '16px',
                      accentColor: '#3b82f6'
                    }}
                  />
                  Auto Scroll
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 