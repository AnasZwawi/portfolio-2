import React from "react";

interface SkillProps {
  icon: React.ReactNode; // For the icon
  name: string;         // For the skill name
}

export const Skill: React.FC<SkillProps> = ({ icon, name }) => {
  return (
    <div>
      <div className="bg-black py-3 px-[16px] font-medium rounded-lg flex items-center gap-1">
        {icon}
        {name}
      </div>
    </div>
  );
};
