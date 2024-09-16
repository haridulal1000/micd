export interface SkillSet {
	id: number;
	name: string;
	level: 'basic' | 'intermediate' | 'advanced';
	category: string;
	skillset_number: number;
	workspace_skillset_id: string;
}

export interface UserSkillSet {
	id: number;
	name: string;
	level: 'basic' | 'intermediate' | 'advanced';
	category: string;
	skillset_number: number;
	workspace_skillset_id: string;
	expertise: {
		id: number;
		expertise: 'expert' | 'average' | 'beginner';
	};
}

export interface ISkillSetExpertise {
	expert: number;
	average: number;
	beginner: number;
}

export interface ISkillSetSkills {
	basic: number | null;
	intermediate: number | null;
	advanced: number | null;
}

export interface IUserSkillSetSummary {
	expertise: ISkillSetExpertise;
	skills: ISkillSetSkills;
}
