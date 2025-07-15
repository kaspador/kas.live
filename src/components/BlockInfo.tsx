'use client';

import { motion } from 'framer-motion';
import { X, Hash, Clock, Users, Layers, Award } from 'lucide-react';
import { KaspaBlock } from '@/types/kaspa';

interface BlockInfoProps {
  block: KaspaBlock;
  onClose: () => void;
}

export default function BlockInfo({ block, onClose }: BlockInfoProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full mx-4 block-info-panel"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Hash className="w-5 h-5 text-purple-400" />
            Block #{block.id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Block Hash */}
          <div>
            <label className="text-sm font-medium text-gray-400 mb-1 block">
              Block Hash
            </label>
            <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm text-white break-all">
              {block.blockHash}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Layers className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-gray-400">Height</span>
              </div>
              <div className="text-lg font-bold text-white">
                {block.height.toLocaleString()}
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-gray-400">DAA Score</span>
              </div>
              <div className="text-lg font-bold text-white">
                {block.daaScore.toLocaleString()}
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-gray-400">Timestamp</span>
              </div>
              <div className="text-sm font-bold text-white">
                {new Date(block.timestamp).toLocaleString()}
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-gray-400">Parents</span>
              </div>
              <div className="text-lg font-bold text-white">
                {block.parentIds.length}
              </div>
            </div>
          </div>

          {/* Block Type */}
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Block Type
            </label>
            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                block.color === 'blue' 
                  ? 'bg-blue-900 text-blue-300 border border-blue-700'
                  : block.color === 'red'
                  ? 'bg-red-900 text-red-300 border border-red-700'
                  : 'bg-gray-700 text-gray-300 border border-gray-600'
              }`}>
                {block.color.charAt(0).toUpperCase() + block.color.slice(1)} Block
              </span>
              
              {block.isInVirtualSelectedParentChain && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-900 text-emerald-300 border border-emerald-700">
                  Main Chain
                </span>
              )}
            </div>
          </div>

          {/* Parent IDs */}
          {block.parentIds.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-400 mb-2 block">
                Parent Block IDs
              </label>
              <div className="bg-gray-900 rounded-lg p-3 max-h-24 overflow-y-auto">
                <div className="text-sm font-mono text-white space-y-1">
                  {block.parentIds.map((parentId, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-gray-500">#{index + 1}</span>
                      <span>{parentId}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Height Group Index:</span>
              <span className="text-white ml-2 font-mono">{block.heightGroupIndex}</span>
            </div>
            <div>
              <span className="text-gray-400">Selected Parent:</span>
              <span className="text-white ml-2 font-mono">{block.selectedParentId}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 