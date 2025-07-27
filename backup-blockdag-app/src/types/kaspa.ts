export interface KaspaBlock {
  id: number;
  blockHash: string;
  timestamp: number;
  parentIds: number[];
  height: number;
  daaScore: number;
  heightGroupIndex: number;
  selectedParentId: number;
  color: 'blue' | 'red' | 'gray';
  isInVirtualSelectedParentChain: boolean;
  mergeSetRedIds: number[];
  mergeSetBlueIds: number[];
}

export interface KaspaEdge {
  fromBlockId: number;
  toBlockId: number;
  fromHeight: number;
  toHeight: number;
  fromHeightGroupIndex?: number;
  toHeightGroupIndex?: number;
}

export interface KaspaHeightGroup {
  height: number;
  size: number;
}

export interface KaspaApiResponse {
  blocks: KaspaBlock[];
  edges: KaspaEdge[];
  heightGroups: KaspaHeightGroup[];
}

export interface BlockPosition {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  scale: number;
  targetScale: number;
  opacity: number;
  targetOpacity: number;
  animationStartTime: number;
  isNew: boolean;
}

export interface VisualizationSettings {
  heightDifference: number;
  updateInterval: number;
  animationSpeed: number;
  showEdges: boolean;
  autoScroll: boolean;
  demoMode: boolean;
  blockSize: number;
  horizontalSpacing: number;
  verticalSpacing: number;
}

export interface CameraState {
  x: number;
  y: number;
  scale: number;
  targetX: number;
  targetY: number;
  targetScale: number;
}

export interface ViewportDimensions {
  width: number;
  height: number;
} 