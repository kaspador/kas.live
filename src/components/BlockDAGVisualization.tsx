'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { KaspaBlock, VisualizationSettings, CameraState } from '@/types/kaspa';
import ControlPanel from './ControlPanel';

interface BlockInfoPanelProps {
  block: KaspaBlock;
  onClose: () => void;
}

const BlockInfoPanel: React.FC<BlockInfoPanelProps> = ({ block, onClose }) => {
  const formatHash = (hash: string) => {
    return hash.length > 16 ? `${hash.slice(0, 8)}...${hash.slice(-8)}` : hash;
  };

  const TooltipIcon = ({ title }: { title: string }) => {
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });
    
    const handleMouseEnter = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPosition({ 
        x: rect.left + rect.width / 2, 
        y: rect.top - 10 
      });
      setShowTooltip(true);
    };
    
    return (
      <>
        <span 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setShowTooltip(false)}
          style={{ 
            marginLeft: '4px', 
            color: '#6b7280', 
            cursor: 'help',
            fontSize: '12px',
            fontWeight: 'normal',
            padding: '2px',
            borderRadius: '50%',
            transition: 'color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'}
          onMouseOut={(e) => e.currentTarget.style.color = '#6b7280'}
        >ⓘ</span>
        
        {showTooltip && (
          <div style={{
            position: 'fixed',
            left: tooltipPosition.x - 150,
            top: tooltipPosition.y - 50,
            width: '300px',
            padding: '8px 12px',
            background: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            borderRadius: '6px',
            fontSize: '12px',
            lineHeight: '1.4',
            zIndex: 1000,
            pointerEvents: 'none',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)'
          }}>
            {title}
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '0',
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid rgba(0, 0, 0, 0.9)'
            }} />
          </div>
        )}
      </>
    );
  };

  return (
    <div style={{
      position: 'fixed',
      top: '0',
      left: '0',
      width: '300px',
      height: '100vh',
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRight: '1px solid rgba(59, 130, 246, 0.3)',
      color: 'white',
      padding: '20px',
      overflowY: 'auto',
      zIndex: 100,
      fontSize: '14px'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '1px solid rgba(59, 130, 246, 0.3)',
        paddingBottom: '10px'
      }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Block Information</h3>
        <button 
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#6b7280',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '0',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >×</button>
      </div>

      {/* Block Hash */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginBottom: '4px',
          fontWeight: 'bold'
        }}>
          Block Hash
          <TooltipIcon title="The hash of a block is its unique identifier in the block DAG. A block's hash is derived directly from the block itself using a cryptographic hash function. That ensures that no two blocks in the DAG have the same hash, and that each hash represents only the original block from which it was derived." />
        </div>
        <div style={{ 
          background: 'rgba(59, 130, 246, 0.1)',
          padding: '8px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '12px',
          wordBreak: 'break-all'
        }}>
          {block.blockHash || 'N/A'}
        </div>
      </div>

      {/* Block Parents */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginBottom: '4px',
          fontWeight: 'bold'
        }}>
          Block Parents
          <TooltipIcon title="Every block in the block DAG (aside from the genesis) has one or more parents. A parent is simply the hash of another block that had been added to the DAG at a prior time. Here, we represent each parent with an arrow. Note that all arrows point from right to left — from child to parent." />
        </div>
        <div style={{ 
          background: 'rgba(59, 130, 246, 0.1)',
          padding: '8px',
          borderRadius: '4px',
          maxHeight: '120px',
          overflowY: 'auto'
        }}>
          {block.parentIds && block.parentIds.length > 0 ? (
            block.parentIds.map((parentId, index) => (
              <div key={index} style={{ 
                fontFamily: 'monospace',
                fontSize: '12px',
                marginBottom: '4px',
                padding: '2px 4px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '2px'
              }}>
                {formatHash(parentId.toString())}
              </div>
            ))
          ) : (
            <div style={{ color: '#6b7280' }}>Genesis Block</div>
          )}
        </div>
      </div>

      {/* Block Merge Set */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginBottom: '4px',
          fontWeight: 'bold'
        }}>
          Block Merge Set
          <TooltipIcon title="The merge set of a block is the set of blocks that are an ancestor (either a direct or an indirect parent) of the block but are not an ancestor of the block's selected parent. Note that this includes the block's selected parent itself." />
        </div>
        <div style={{ 
          background: 'rgba(59, 130, 246, 0.1)',
          padding: '8px',
          borderRadius: '4px',
          color: '#6b7280'
        }}>
          {(block.mergeSetRedIds?.length || 0) + (block.mergeSetBlueIds?.length || 0) || 'N/A'}
        </div>
      </div>

      {/* Block Children */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginBottom: '4px',
          fontWeight: 'bold'
        }}>
          Block Children
          <TooltipIcon title="Every block in the block DAG (aside from the blocks forming the tips) has one or more children. A child is simply the hash of another block that has been added to the DAG at a later time and that has the block hash in its parents. Here, we represent each child with an arrow." />
        </div>
        <div style={{ 
          background: 'rgba(59, 130, 246, 0.1)',
          padding: '8px',
          borderRadius: '4px',
          color: '#6b7280'
        }}>
          N/A
        </div>
      </div>

      {/* Is Block In VSPC */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginBottom: '4px',
          fontWeight: 'bold'
        }}>
          Is Block In VSPC
          <TooltipIcon title="Every block in the DAG (aside from the genesis) has a selected parent. That selected parent likewise has a selected parent. Following this chain of selected parents will eventually bring us to the genesis. We call this chain the Selected Parent Chain of a block, or its SPC. The virtual block is a special, invisible block whose parents are always the blocks in the DAG that do not yet have any children. The Virtual Selected Parent Chain, or the VSPC, is the Selected Parent Chain of the virtual block." />
        </div>
        <div style={{ 
          background: 'rgba(59, 130, 246, 0.1)',
          padding: '8px',
          borderRadius: '4px'
        }}>
          {block.isInVirtualSelectedParentChain ? 'Yes' : 'No'}
        </div>
      </div>

      {/* Block Color */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginBottom: '4px',
          fontWeight: 'bold'
        }}>
          Block Color
          <TooltipIcon title="Every block in the DAG is classified as one of two colors: red (attacker) and blue (honest). Every block in the merge set is classified as one of two colors: red and blue. For security reasons, only a certain amount of blocks in a block's merge set may be blue. The blocks that do not make the cut are regarded as attacker blocks and are marked red." />
        </div>
        <div style={{ 
          background: 'rgba(59, 130, 246, 0.1)',
          padding: '8px',
          borderRadius: '4px',
          textTransform: 'capitalize'
        }}>
          {block.color || 'Blue'}
        </div>
      </div>

      {/* Block DAA Score */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginBottom: '4px',
          fontWeight: 'bold'
        }}>
          Block DAA Score
          <TooltipIcon title="Every block in the DAG has a DAA Score. The DAA Score is related to the number of honest blocks ever added to the DAG. Since blocks are created at a rate of one per second, the score is a metric of the elapsed time since network launch." />
        </div>
        <div style={{ 
          background: 'rgba(59, 130, 246, 0.1)',
          padding: '8px',
          borderRadius: '4px',
          fontFamily: 'monospace'
        }}>
          {block.daaScore?.toLocaleString() || 'N/A'}
        </div>
      </div>

      {/* Block Height */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginBottom: '4px',
          fontWeight: 'bold'
        }}>
          Block Height
        </div>
        <div style={{ 
          background: 'rgba(59, 130, 246, 0.1)',
          padding: '8px',
          borderRadius: '4px',
          fontFamily: 'monospace'
        }}>
          {block.height?.toLocaleString() || 'N/A'}
        </div>
      </div>
    </div>
  );
};

export default function BlockDAGVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const [selectedBlock, setSelectedBlock] = useState<KaspaBlock | null>(null);
  
  // Animation and data refs - no React state for smooth performance
  const allBlocksRef = useRef<KaspaBlock[]>([]);
  const animationFrameRef = useRef<number>(0);
  const timeOffsetRef = useRef(0);
  const lastApiCallRef = useRef<number>(Date.now());
  const mouseRef = useRef({ isDown: false, startX: 0, startY: 0 });
  const isPausedRef = useRef(false);
  
  const [camera, setCamera] = useState<CameraState>({
    x: 0,
    y: 0,
    scale: 1,
    targetX: 0,
    targetY: 0,
    targetScale: 1
  });
  
  const [settings, setSettings] = useState<VisualizationSettings>({
    heightDifference: 20,
    updateInterval: 1500,
    animationSpeed: 1,
    showEdges: true,
    autoScroll: true,
    demoMode: true,
    blockSize: 50,
    horizontalSpacing: 150,
    verticalSpacing: 80
  });
  
  const [stats, setStats] = useState({
    blockCount: 0,
    currentHeight: 0,
    daaScore: 0
  });

  // Fetch live data from Kaspa API
  const fetchLiveData = useCallback(async () => {
    try {
      setConnectionStatus('Fetching...');
      
      const response = await fetch(
        `https://kgi.kaspad.net:3147/head?heightDifference=${settings.heightDifference}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.blocks && Array.isArray(data.blocks)) {
        const newBlocks = data.blocks.sort((a: KaspaBlock, b: KaspaBlock) => b.height - a.height);
        
        const existingIds = new Set(allBlocksRef.current.map(block => block.id));
        const blocksToAdd = newBlocks.filter((block: KaspaBlock) => !existingIds.has(block.id));
        
        if (blocksToAdd.length > 0) {
          allBlocksRef.current = [...allBlocksRef.current, ...blocksToAdd];
          console.log(`Added ${blocksToAdd.length} new blocks. Total: ${allBlocksRef.current.length}`);
          
          // Log block colors to see what we're getting from the API
          const colorDistribution = blocksToAdd.reduce((acc: Record<string, number>, block: KaspaBlock) => {
            const color = block.color || 'undefined';
            acc[color] = (acc[color] || 0) + 1;
            return acc;
          }, {});
          console.log('Block colors from API:', colorDistribution);
          console.log('Sample block data:', blocksToAdd.slice(0, 2));
        }
        
        setIsConnected(true);
        setConnectionStatus('Connected (Live)');
        
        // Update stats
        setStats({
          blockCount: allBlocksRef.current.length,
          currentHeight: allBlocksRef.current.length > 0 ? Math.max(...allBlocksRef.current.map(b => b.height)) : 0,
          daaScore: allBlocksRef.current.length > 0 ? Math.max(...allBlocksRef.current.map(b => b.daaScore)) : 0
        });
        
      } else {
        throw new Error('Invalid data format received from API');
      }
      
    } catch (error) {
      console.error('Failed to fetch live data:', error);
      setIsConnected(false);
      setConnectionStatus(`Connection Failed`);
    }
  }, [settings.heightDifference]);

  // Canvas rendering function - smooth as silk!
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply camera transform
    ctx.save();
    ctx.translate(camera.x, camera.y);
    ctx.scale(camera.scale, camera.scale);
    
    if (allBlocksRef.current.length === 0) {
      ctx.restore();
      return;
    }
    
    // Group blocks by height for layout
    const heightGroups: { [key: number]: KaspaBlock[] } = {};
    allBlocksRef.current.forEach(block => {
      if (!heightGroups[block.height]) {
        heightGroups[block.height] = [];
      }
      heightGroups[block.height].push(block);
    });
    
    const heights = Object.keys(heightGroups).map(Number).sort((a, b) => a - b);
    const blockPositions = new Map<number, { x: number, y: number, block: KaspaBlock }>();
    
        // Enhanced positioning algorithm for main chain highlighting
    // First, identify which blocks we need to position (visible + their parents for arrows)
    const neededBlockIds = new Set<number>();
    
    heights.forEach((height, heightIndex) => {
      const blocksAtHeight = heightGroups[height];
      const xPosition = heightIndex * settings.horizontalSpacing + 1000 + timeOffsetRef.current;
      
      // Check if this height level is visible
      if (xPosition > -camera.x - 200 && xPosition < -camera.x + canvas.width + 200) {
        blocksAtHeight.forEach(block => {
          neededBlockIds.add(block.id);
          // Also add all parents to ensure arrows work
          block.parentIds.forEach(parentId => neededBlockIds.add(parentId));
        });
      }
    });
    
    // Now calculate positions only for blocks at height levels that contain needed blocks
    heights.forEach((height, heightIndex) => {
      const blocksAtHeight = heightGroups[height];
      const hasNeededBlocks = blocksAtHeight.some(block => neededBlockIds.has(block.id));
      
      if (hasNeededBlocks) {
        const xPosition = heightIndex * settings.horizontalSpacing + 1000 + timeOffsetRef.current;
        
        // Use simple grid positioning to avoid overlaps
        blocksAtHeight.forEach((block, blockIndex) => {
          const yPosition = 300 + (blockIndex - (blocksAtHeight.length - 1) / 2) * settings.verticalSpacing;
          blockPositions.set(block.id, { x: xPosition, y: yPosition, block });
        });
      }
    });
    
    // Draw arrows/connections FIRST (behind blocks)
    if (settings.showEdges) {
      allBlocksRef.current.forEach(block => {
        if (block.parentIds && block.parentIds.length > 0) {
          const toPos = blockPositions.get(block.id);
          if (!toPos) return;
          
          block.parentIds.forEach(parentId => {
            const fromPos = blockPositions.get(parentId);
            if (!fromPos) return;
            
            // Check if this is a main chain connection
            const isMainChainConnection = block.isInVirtualSelectedParentChain && 
                                        parentId === block.selectedParentId;
            
            // Set connection style based on whether it's main chain or not
            if (isMainChainConnection) {
              ctx.strokeStyle = '#2563eb'; // Bold blue for main chain
              ctx.lineWidth = 3;
              ctx.shadowColor = '#2563eb';
              ctx.shadowBlur = 8;
            } else {
              ctx.strokeStyle = 'rgba(139, 149, 183, 0.4)'; // Light gray for other connections
              ctx.lineWidth = 1.5;
              ctx.shadowBlur = 0;
            }
            
            // Draw arrow line
            ctx.beginPath();
            ctx.moveTo(fromPos.x + settings.blockSize/2, fromPos.y + settings.blockSize/2);
            ctx.lineTo(toPos.x + settings.blockSize/2, toPos.y + settings.blockSize/2);
            ctx.stroke();
            
            // Draw arrow head
            const angle = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
            const headLength = isMainChainConnection ? 12 : 8; // Larger arrow for main chain
            
            ctx.shadowBlur = 0; // Remove shadow for arrow head
            ctx.fillStyle = isMainChainConnection ? '#2563eb' : 'rgba(139, 149, 183, 0.6)';
            
            ctx.beginPath();
            ctx.moveTo(toPos.x + settings.blockSize/2, toPos.y + settings.blockSize/2);
            ctx.lineTo(
              toPos.x + settings.blockSize/2 - headLength * Math.cos(angle - Math.PI/6),
              toPos.y + settings.blockSize/2 - headLength * Math.sin(angle - Math.PI/6)
            );
            ctx.lineTo(
              toPos.x + settings.blockSize/2 - headLength * Math.cos(angle + Math.PI/6),
              toPos.y + settings.blockSize/2 - headLength * Math.sin(angle + Math.PI/6)
            );
            ctx.closePath();
            ctx.fill();
          });
        }
      });
    }
    
    // Now draw blocks ON TOP of arrows
    heights.forEach((height, heightIndex) => {
      const blocksAtHeight = heightGroups[height];
      const xPosition = heightIndex * settings.horizontalSpacing + 1000 + timeOffsetRef.current;
      
      // Only render if on screen (using original narrow range for actual rendering)
      if (xPosition > -camera.x - 200 && xPosition < -camera.x + canvas.width + 200) {
        blocksAtHeight.forEach((block) => {
          // Use same positioning logic as arrow calculation
          const blockPos = blockPositions.get(block.id);
          if (!blockPos) return; // Skip if no position calculated
          const yPosition = blockPos.y;
          
          // Check if this block is selected
          const isSelected = selectedBlock && selectedBlock.id === block.id;
          
          // Draw block with enhanced styling for main chain
          const isMainChain = block.isInVirtualSelectedParentChain;
          const color = block.color === 'blue' ? '#3b82f6' : 
                       block.color === 'red' ? '#ef4444' : 
                       block.color === 'gray' ? '#6b7280' : '#10b981';
          
          ctx.fillStyle = color;
          
          // Enhanced shadow and glow for main chain blocks
          if (isMainChain) {
            ctx.shadowColor = '#2563eb';
            ctx.shadowBlur = isSelected ? 18 : 12;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
          } else {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = isSelected ? 12 : 6;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
          }
          
          // Rounded rectangle with enhanced styling
          const size = isMainChain ? settings.blockSize * 1.1 : settings.blockSize; // Slightly larger for main chain
          const adjustedX = isMainChain ? xPosition - (size - settings.blockSize) / 2 : xPosition;
          const adjustedY = isMainChain ? yPosition - (size - settings.blockSize) / 2 : yPosition;
          
          ctx.beginPath();
          ctx.roundRect(adjustedX, adjustedY, size, size, 8);
          ctx.fill();
          
          // Add border for main chain blocks
          if (isMainChain && !isSelected) {
            ctx.shadowBlur = 0;
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
          
          // Selection border (overrides main chain border)
          if (isSelected) {
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 3;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
          
          // Block ID text - show last 4 digits of hash for now
          ctx.shadowBlur = 0;
          ctx.fillStyle = 'white';
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(
            block.id.toString().slice(-4), 
            adjustedX + size/2, 
            adjustedY + size/2
          );
        });
      }
    });
    
    ctx.restore();
  }, [camera, settings, selectedBlock]);

  // Handle block clicking
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (mouseRef.current.isDown) return; // Don't click if dragging
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left - camera.x) / camera.scale;
    const clickY = (e.clientY - rect.top - camera.y) / camera.scale;
    
    // Check if click is on any block
    const heightGroups: { [key: number]: KaspaBlock[] } = {};
    allBlocksRef.current.forEach(block => {
      if (!heightGroups[block.height]) {
        heightGroups[block.height] = [];
      }
      heightGroups[block.height].push(block);
    });
    
    const heights = Object.keys(heightGroups).map(Number).sort((a, b) => a - b);
    
    for (let heightIndex = 0; heightIndex < heights.length; heightIndex++) {
      const height = heights[heightIndex];
      const blocksAtHeight = heightGroups[height];
      const xPosition = heightIndex * settings.horizontalSpacing + 1000 + timeOffsetRef.current;
      
      for (let blockIndex = 0; blockIndex < blocksAtHeight.length; blockIndex++) {
        const block = blocksAtHeight[blockIndex];
        
        // Recalculate position using same logic as render function
        const isMainChain = block.isInVirtualSelectedParentChain;
        const allBlocksAtHeight = blocksAtHeight;
        const mainChainBlocks = allBlocksAtHeight.filter(b => b.isInVirtualSelectedParentChain);
        const otherBlocks = allBlocksAtHeight.filter(b => !b.isInVirtualSelectedParentChain);
        
        let yPosition;
        if (isMainChain) {
          const mainChainIndex = mainChainBlocks.findIndex(b => b.id === block.id);
          const centerY = 300;
          const yOffset = mainChainBlocks.length > 1 ? (mainChainIndex - (mainChainBlocks.length - 1) / 2) * 25 : 0;
          yPosition = centerY + yOffset;
        } else {
          const otherIndex = otherBlocks.findIndex(b => b.id === block.id);
          const centerY = 300;
          const totalOthers = otherBlocks.length;
          const isAbove = otherIndex < Math.ceil(totalOthers / 2);
          const positionInGroup = isAbove ? otherIndex : otherIndex - Math.ceil(totalOthers / 2);
          const groupSize = isAbove ? Math.ceil(totalOthers / 2) : Math.floor(totalOthers / 2);
          const baseOffset = isAbove ? -120 : 120;
          const additionalOffset = groupSize > 1 ? (positionInGroup - (groupSize - 1) / 2) * settings.verticalSpacing * 0.8 : 0;
          yPosition = centerY + baseOffset + additionalOffset;
        }
        
        const size = isMainChain ? settings.blockSize * 1.1 : settings.blockSize;
        const adjustedX = isMainChain ? xPosition - (size - settings.blockSize) / 2 : xPosition;
        const adjustedY = isMainChain ? yPosition - (size - settings.blockSize) / 2 : yPosition;
        
        // Check if click is within block bounds
        if (clickX >= adjustedX && clickX <= adjustedX + size &&
            clickY >= adjustedY && clickY <= adjustedY + size) {
          
          // Pause animation and select block
          isPausedRef.current = true;
          setSelectedBlock(block);
          return;
        }
      }
    }
    
    // If no block was clicked, resume animation
    isPausedRef.current = false;
    setSelectedBlock(null);
  };

  // Smooth animation loop - pure 60fps bliss!
  useEffect(() => {
    if (!settings.autoScroll) return;
    
    const animate = () => {
      // Only move if not paused
      if (!isPausedRef.current) {
        timeOffsetRef.current -= 2 * settings.animationSpeed;
      }
      
      // Render the frame
      render();
      
      // Fetch new data periodically
      const now = Date.now();
      if (now - lastApiCallRef.current > settings.updateInterval) {
        fetchLiveData();
        lastApiCallRef.current = now;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [settings.autoScroll, settings.animationSpeed, settings.updateInterval, render, fetchLiveData]);

  // Handle canvas setup and resize
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      render();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [render]);

  // Initialize with live data
  useEffect(() => {
    fetchLiveData();
  }, [fetchLiveData]);

  // Canvas mouse interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseRef.current.isDown = true;
    mouseRef.current.startX = e.clientX - camera.x;
    mouseRef.current.startY = e.clientY - camera.y;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mouseRef.current.isDown) return;
    
    setCamera(prev => ({
      ...prev,
      x: e.clientX - mouseRef.current.startX,
      y: e.clientY - mouseRef.current.startY,
      targetX: e.clientX - mouseRef.current.startX,
      targetY: e.clientY - mouseRef.current.startY
    }));
  };

  const handleMouseUp = () => {
    mouseRef.current.isDown = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setCamera(prev => ({
      ...prev,
      scale: Math.max(0.1, Math.min(3, prev.scale * scaleFactor)),
      targetScale: Math.max(0.1, Math.min(3, prev.scale * scaleFactor))
    }));
  };

  const handleCloseBlockInfo = () => {
    setSelectedBlock(null);
    isPausedRef.current = false;
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', 
      overflow: 'hidden' 
    }}>
      {/* Block Information Panel */}
      {selectedBlock && (
        <BlockInfoPanel 
          block={selectedBlock} 
          onClose={handleCloseBlockInfo}
        />
      )}
      
      {/* Control Panel */}
      <div style={{ marginLeft: selectedBlock ? '300px' : '0', transition: 'margin-left 0.3s ease' }}>
        <ControlPanel
          settings={settings}
          onSettingsChange={setSettings}
          isConnected={isConnected}
          connectionStatus={connectionStatus}
          stats={stats}
        />
        
        {/* Canvas Visualization */}
        <div 
          ref={containerRef}
          style={{ 
            width: '100%', 
            height: '100%', 
            position: 'relative', 
            cursor: mouseRef.current.isDown ? 'grabbing' : 'grab' 
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            onClick={handleCanvasClick}
            style={{
              width: '100%',
              height: '100%',
              display: 'block'
            }}
          />
        </div>
      </div>
    </div>
  );
} 