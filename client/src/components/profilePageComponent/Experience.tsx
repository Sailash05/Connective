import { type ExperienceType } from "../../types/userType";
import { Pencil, Trash2 } from "lucide-react";

const Experience = ({ 
    experience,
    handleExperience,
    expIndex,
    deleteExperience
 }: { 
    experience: ExperienceType,
    handleExperience: (status: 'new' | 'edit', index: number) => void,
    expIndex: number,
    deleteExperience: (index: number) => void
}) => {
    return (
        <div className="p-4 rounded-xl border border-gray-200 shadow-sm bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold dark:text-white">{experience.companyName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{experience.type}</p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                        {experience.role}
                    </span>

                    {/* Edit button */}
                    <button type="button" onClick={() => handleExperience('edit', expIndex)} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Pencil size={16} className="text-gray-600 dark:text-gray-300" />
                    </button>

                    {/* Delete button */}
                    <button type="button" onClick={() => deleteExperience(expIndex)} className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-700" >
                        <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                    </button>
                </div>
            </div>

            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {new Date(experience.from).toLocaleDateString()} - {new Date(experience.to).toLocaleDateString()}
            </div>
        </div>
    );
};

export default Experience;
