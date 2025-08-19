import React, { useEffect, useRef } from 'react';
import type { VisualizationState } from '../types';

interface DebugInfoProps {
  visualizationState: VisualizationState;
  selectedCategory: string;
}

const DebugInfo = ({ visualizationState, selectedCategory }: DebugInfoProps) => {
  const currentStep = visualizationState.steps[visualizationState.currentStep];
  const panelRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (panelRef.current) {
        panelRef.current.open = window.innerWidth >= 768;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <details ref={panelRef} className="glass-card p-4 mt-4 text-xs font-mono">
      <summary className="font-bold cursor-pointer select-none">Debug Info</summary>
      <div className="mt-2 divide-y divide-white/10">
        <div className="py-1">Category: {selectedCategory}</div>
        <div className="py-1">Total Steps: {visualizationState.steps.length}</div>
        <div className="py-1">Current Step: {visualizationState.currentStep + 1}</div>
        <div className="py-1">Is Playing: {visualizationState.isPlaying ? 'Yes' : 'No'}</div>
        <div className="py-1">Is Paused: {visualizationState.isPaused ? 'Yes' : 'No'}</div>
        {currentStep && (
          <div className="py-1 space-y-1">
            <div className="font-semibold">Current Step Data:</div>
            <div>Message: {currentStep.message || 'No message'}</div>
            {selectedCategory === 'pathfinding' && (
              <div>Grid: {currentStep.grid ? `${currentStep.grid.length}x${currentStep.grid[0]?.length}` : 'No grid'}</div>
            )}
            {selectedCategory === 'trees' && (
              <div>
                <div>Tree: {currentStep.tree ? `Root: ${currentStep.tree.value}` : 'No tree'}</div>
                <div>Highlighted: [{currentStep.highlightedNodes?.join(', ') || 'none'}]</div>
              </div>
            )}
          </div>
        )}
      </div>
    </details>
  );
};

export default DebugInfo;