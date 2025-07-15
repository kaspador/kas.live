'use client';

import { motion } from 'framer-motion';
import { Settings, Wifi, WifiOff, Activity, Layers, Hash } from 'lucide-react';
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
  const updateSetting = <K extends keyof VisualizationSettings>(
    key: K,
    value: VisualizationSettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    top: '16px',
    left: '16px',
    background: 'rgba(30, 41, 59, 0.9)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '12px',
    padding: '16px',
    minWidth: '280px',
    zIndex: 40,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
  };

  const sliderStyle: React.CSSProperties = {
    width: '100%',
    height: '8px',
    background: '#374151',
    borderRadius: '4px',
    outline: 'none',
    cursor: 'pointer'
  };

  const checkboxStyle: React.CSSProperties = {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    border: '2px solid #6b7280',
    backgroundColor: '#374151',
    cursor: 'pointer'
  };

  return (
    <>
      {/* Control Panel */}
      <motion.div
        style={panelStyle}
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Settings style={{ width: '20px', height: '20px', color: '#a855f7' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>Kaspa BlockDAG</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Height Difference */}
          <div>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#d1d5db', marginBottom: '8px', display: 'block' }}>
              Height Difference: {settings.heightDifference}
            </label>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={settings.heightDifference}
              onChange={(e) => updateSetting('heightDifference', parseInt(e.target.value))}
              style={sliderStyle}
            />
          </div>

          {/* Update Interval */}
          <div>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#d1d5db', marginBottom: '8px', display: 'block' }}>
              Update Interval: {settings.updateInterval}ms
            </label>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={settings.updateInterval}
              onChange={(e) => updateSetting('updateInterval', parseInt(e.target.value))}
              style={sliderStyle}
            />
          </div>

          {/* Animation Speed */}
          <div>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#d1d5db', marginBottom: '8px', display: 'block' }}>
              Animation Speed: {settings.animationSpeed}x
            </label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={settings.animationSpeed}
              onChange={(e) => updateSetting('animationSpeed', parseFloat(e.target.value))}
              style={sliderStyle}
            />
          </div>

          {/* Block Size */}
          <div>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#d1d5db', marginBottom: '8px', display: 'block' }}>
              Block Size: {settings.blockSize}px
            </label>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={settings.blockSize}
              onChange={(e) => updateSetting('blockSize', parseInt(e.target.value))}
              style={sliderStyle}
            />
          </div>

          {/* Toggles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.showEdges}
                onChange={(e) => updateSetting('showEdges', e.target.checked)}
                style={checkboxStyle}
              />
              <span style={{ fontSize: '14px', color: '#d1d5db' }}>Show Edges</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.autoScroll}
                onChange={(e) => updateSetting('autoScroll', e.target.checked)}
                style={checkboxStyle}
              />
              <span style={{ fontSize: '14px', color: '#d1d5db' }}>Auto Scroll</span>
            </label>


          </div>
        </div>
      </motion.div>

      {/* Status Panel */}
      <motion.div
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          background: 'rgba(30, 41, 59, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '12px',
          padding: '16px',
          minWidth: '240px',
          zIndex: 40,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          {isConnected ? (
            <Wifi style={{ width: '20px', height: '20px', color: '#10b981' }} />
          ) : (
            <WifiOff style={{ width: '20px', height: '20px', color: '#ef4444' }} />
          )}
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>Connection</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: isConnected ? '#10b981' : '#ef4444'
              }}
            />
            <span style={{ fontSize: '14px', color: '#d1d5db' }}>Status: {connectionStatus}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers style={{ width: '16px', height: '16px', color: '#6366f1' }} />
            <span style={{ fontSize: '14px', color: '#d1d5db' }}>Blocks: {stats.blockCount}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity style={{ width: '16px', height: '16px', color: '#f59e0b' }} />
            <span style={{ fontSize: '14px', color: '#d1d5db' }}>Height: {stats.currentHeight}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Hash style={{ width: '16px', height: '16px', color: '#ec4899' }} />
            <span style={{ fontSize: '14px', color: '#d1d5db' }}>DAA Score: {stats.daaScore.toLocaleString()}</span>
          </div>
        </div>
      </motion.div>
    </>
  );
} 