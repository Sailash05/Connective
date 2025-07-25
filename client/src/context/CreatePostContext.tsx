import { createContext, useContext, useState, type ReactNode } from "react";

type CreatePostType = {
    createPost: boolean;
    setCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePostContext = createContext<CreatePostType | undefined>(undefined);

export const useCreatePost = (): CreatePostType => {
    const context = useContext(CreatePostContext);
    if (!context) {
        throw new Error("useCreatePost must be used within a CreatePostProvider");
    }
    return context;
};

const CreatePostProvider = ({ children }: { children: ReactNode }) => {
    const [createPost, setCreatePost] = useState<boolean>(false);

    return (
        <CreatePostContext.Provider value={{ createPost, setCreatePost }}>
        {children}
        </CreatePostContext.Provider>
    );
};

export default CreatePostProvider;