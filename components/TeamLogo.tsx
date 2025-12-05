import React from 'react';
import { TEAMS } from '../constants';

interface TeamLogoProps {
  teamId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const TeamLogo: React.FC<TeamLogoProps> = ({ teamId, size = 'md', className = '' }) => {
  const team = TEAMS[teamId];
  if (!team) return <div className="w-8 h-8 bg-gray-500 rounded-full" />;

  const sizeClasses = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-10 h-10 text-xs',
    lg: 'w-16 h-16 text-sm',
    xl: 'w-24 h-24 text-base'
  };

  return (
    <div 
      className={`rounded-full flex items-center justify-center font-bold text-white shadow-lg border-2 border-white/10 ${sizeClasses[size]} ${className}`}
      style={{ 
        backgroundColor: team.primaryColor,
        borderColor: team.secondaryColor 
      }}
      title={team.name}
    >
      {team.abbrev}
    </div>
  );
};

export default TeamLogo;
