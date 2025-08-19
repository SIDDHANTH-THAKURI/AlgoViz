import React from 'react';
import type { VisualizationState } from '../types';

interface DebugInfoProps {
  visualizationState: VisualizationState;
  selectedCategory: string;
}

const DebugInfo = ({ visualizationState, selectedCategory }: DebugInfoProps) => {
  const currentStep = visualizationState.steps[visualizationState.currentStep];
  
  return (
    <div className="glass-card p-4 mt-4 text-xs">
      <h4 className="font-bold mb-2">Debug Info:</h4>
      <div className="space-y-1">
        <div>Category: {selectedCategory}</div>
        <div>Total Steps: {visualizationState.steps.length}</div>
        <div>Current Step: {visualizationState.currentStep + 1}</div>
        <div>Is Playing: {visualizationState.isPlaying ? 'Yes' : 'No'}</div>
        <div>Is Paused: {visualizationState.isPaused ? 'Yes' : 'No'}</div>
        {currentStep && (
          <div className="mt-2">
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
    </div>
  );
};

export default DebugInfo;