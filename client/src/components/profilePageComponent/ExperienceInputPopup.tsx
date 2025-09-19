import { useState } from "react";
import { type ExperienceType } from "../../types/userType";
import FailMessage from "../message/FailMessage";
import { IoClose } from "react-icons/io5";

const ExperienceInputPopup = ({
    exp,
    expIndex,
    experienceStatus,
    setExperiencePopup
}: {
    exp: ExperienceType[],
    expIndex: number,
    experienceStatus: 'new' | 'edit',
    setExperiencePopup: (experiencePopup: boolean) => void
}) => {

    const [failMessage, setFailMessage] = useState<boolean>(false);

    let expValue: ExperienceType = experienceStatus === 'new' ? {
        companyName: '',
        type: '',
        role: '',
        from: new Date(),
        to: new Date()
    } : exp[expIndex];

    const [companyName, setCompanyName] = useState<string>(expValue.companyName);
    const [type, setType] = useState<string>(expValue.type);
    const [role, setRole] = useState<string>(expValue.role);
    const [from, setFrom] = useState<string>(
        expValue.from ? new Date(expValue.from).toISOString().split("T")[0] : ""
    );
        const [to, setTo] = useState<string>(
        expValue.to ? new Date(expValue.to).toISOString().split("T")[0] : ""
    );

    const editExperience = () => {
        exp[expIndex] = {
            companyName: companyName,
            role: role,
            type: type,
            from: new Date(from),
            to: new Date(to)
        };
    }

    const addExperience = () => {
        exp.push({
            companyName: companyName.trim(),
            role: role.trim(),
            type: type.trim(),
            from: new Date(from),
            to: new Date(to)
        });
    }

    const handleSave = () => {
        if(!companyName.trim() || !role.trim() || !type.trim()) {
            setFailMessage(true);
            return;
        }
        experienceStatus === 'new' ? addExperience() : editExperience();
        setExperiencePopup(false);
    }

    return(
        <div className="bg-black bg-opacity-25 dark:bg-opacity-30 w-[100dvw] h-[100dvh] fixed flex justify-center items-center inset-0">
            <div className="bg-white dark:bg-slate-800 max-md:min-w-[90dvw] max-md:overflow-y-scroll max-md:space-y-2 md:w-[35dvw] h-[70dvh] p-6 rounded-2xl flex flex-col justify-between">

                <div className="flex justify-between items-center">
                    <h2 className="text-blue-600 dark:text-white font-bold text-2xl">{experienceStatus.charAt(0).toUpperCase() + experienceStatus.slice(1)} Experience</h2>
                    <button onClick={() => setExperiencePopup(false)} className="bg-gray-200 hover:bg-gray-300 transition-all p-1 rounded-full ">
                        <IoClose className="text-2xl text-gray-600" />
                    </button>
                </div>

                <form className="flex-grow flex flex-col justify-evenly">
                    <div>
                        <label className="font-bold dark:text-white">Company Name: </label> <br />
                        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter your company name" className="w-full p-2 rounded-lg border border-slate-500 outline-blue-600" />
                    </div>

                    <div>
                        <label className="font-bold dark:text-white">Role: </label> <br />
                        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Enter your role" className="w-full p-2 rounded-lg border border-slate-500 outline-blue-600" />
                    </div>

                    <div>
                        <label className="font-bold dark:text-white">Type: </label> <br />
                        <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Type (e.g. Full-time, Internship)" className="w-full p-2 rounded-lg border border-slate-500 outline-blue-600" />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-grow">
                            <label className="font-bold dark:text-white">From: </label> <br />
                            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="flex-1 p-2 border rounded-lg w-full" />
                        </div>
                        <div className="flex-grow">
                            <label className="font-bold dark:text-white">To: </label> <br />
                            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="flex-1 p-2 border rounded-lg w-full" />
                        </div>
                    </div>
                </form>

                <div className="px-4 flex justify-end gap-4">
                    <button onClick={() => setExperiencePopup(false)} className="font-bold bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition-all">
                        Cancel
                    </button>
                    <button onClick={() => handleSave()} className="font-bold bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-all">
                        {experienceStatus === 'new' ? 'Add Experience' : 'Save'}
                    </button>
                </div>

            </div>
            {
                failMessage && (
                    <FailMessage title={'FAILED'} message={['Please fill all the details.']} button={'Okay'} buttonFunc={() => setFailMessage(false)} />
                )
            }
        </div>
    );
}

export default ExperienceInputPopup;