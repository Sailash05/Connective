import { useState, useEffect } from "react";

import { postService } from '../../../service/post.service.ts';

type VisibilityOption = 'PUBLIC' | 'PRIVATE' | 'FOLLOWERS_ONLY';

type ParameterType = {
    setCreatePost: (value: boolean) => void,
    showFailMessage: (
        title: string,
        msg: string[],
        buttonTxt: string
    ) => void,
    showSuccessMessage: (
        title: string,
        msg: string[],
        buttonTxt: string
    ) => void
}

const CreatePostForm = ({ setCreatePost, showFailMessage, showSuccessMessage }: ParameterType) => {
    
    const [content, setContent] = useState<string>("");
    const [files, setFiles] = useState<File[]>([]);
    const [tags, setTags] = useState<string>("");
    const [Visibility, setVisibility] = useState<VisibilityOption>("PUBLIC");

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files).filter(file =>
            file.type.startsWith('image/') || file.type.startsWith('video/')
        );
        setFiles(prev => [...prev, ...droppedFiles]);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files ?? []).filter(file =>
            file.type.startsWith('image/') || file.type.startsWith('video/')
        );
        setFiles(prev => [...prev, ...selectedFiles]);
    };

    const preventDefaults = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleRemoveFile = (indexToRemove: number) => {
        setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file as any));
        };
    }, [files]);

    const handleCreatePost = async () => {

        if(!content.trim()) {
            showFailMessage('Failed!', ['Please write something'], 'Try again');
            return;
        }

        const formData: FormData = new FormData();
        formData.append('content', content);
        files.forEach(file => formData.append('media', file));
        formData.append('tags', tags);
        formData.append('visibility', Visibility.toUpperCase());

        try {
            const response = await postService.createPost(formData);
            if(response.status === 201) {
                setCreatePost(false);
                showSuccessMessage('Success!', ['Post created!'], 'Okay');
            }
        }
        catch (err) {
            showFailMessage("Failed!", ["Something went wrong.", "Please try again."], "Try again");
        }
    }

    return(
        <div className="bg-black bg-opacity-25 dark:bg-opacity-30 w-[100dvw] h-[100dvh] fixed flex justify-center items-center">
            <div className="bg-white dark:bg-slate-800 w-[35dvw] h-[90dvh] p-6 rounded-2xl flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <h2 className="text-blue-600 dark:text-blue-500 font-bold text-2xl">New Post</h2>
                    <span className="py-1 px-2 hover:scale-125 transition-all cursor-pointer font-bold dark:text-white" onClick={() => setCreatePost(false)}>X</span>
                </div>

                <form className="flex-grow flex flex-col justify-evenly">
                    <div>
                        <label className="font-bold dark:text-white">What's on your mind...</label> <br />
                        <textarea name="" placeholder="Write something..." value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-[8rem] resize-none border border-slate-500 rounded-lg outline-blue-600 p-2"></textarea>
                    </div>

                    <div>
                        <label className="font-bold dark:text-white">Upload Images/Videos</label>

                        {/*  Image or video preview */}
                        {
                            files.length > 0 && (
                                <div className="flex gap-4 overflow-x-auto max-w-full pb-2">
                                {
                                    files.map((file, index) => (
                                        <div key={index} className="relative w-fit shrink-0">
                                        <button onClick={(e) => {e.preventDefault(); handleRemoveFile(index);}} className="text-sm font-bold bg-gray-400 text-white py-1 px-2 rounded-full absolute top-1 right-1 hover:bg-gray-500 transition-all z-10">X</button>

                                        {
                                            file.type.startsWith('image/') ? (
                                                <img src={URL.createObjectURL(file)} alt={file.name} width={100} className="rounded border" />
                                            ) : (
                                                <video src={URL.createObjectURL(file)} width={100} controls className="rounded border" />
                                            )
                                        }
                                        </div>
                                    ))
                                }
                                </div>
                            )
                        }

                        <div onDrop={handleDrop} onDragOver={preventDefaults} onDragEnter={preventDefaults} onDragLeave={preventDefaults} className="w-full p-3 border-2 border-dashed rounded-lg text-center cursor-pointer transition duration-200 ease-in-out hover:border-blue-600 bg-gray-50">

                            <p className="text-gray-500 mb-1">Drag & drop your images/videos here</p>

                            <p className="text-sm text-gray-400">or</p>

                            <label className="inline-block mt-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-800 transition-all cursor-pointer">
                                Browse Files
                                <input type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleFileChange} />
                            </label>
                        </div>
                    </div>
                    

                    <div>
                        <label className="font-bold dark:text-white">Tags <span className="text-slate-600 dark:text-slate-200 font-medium">(Comma-separated)</span></label> <br />
                        <input type="text" placeholder="eg. tech, ai, programming" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-2 rounded-lg border border-slate-500 outline-blue-600" />
                    </div>

                    <div>
                        <label className="font-bold dark:text-white">Visibility</label> <br />
                        <select value={Visibility} onChange={(e) => setVisibility(e.target.value as VisibilityOption)} className="w-full p-2 rounded-lg outline-blue-600 bg-white border border-slate-500 cursor-pointer">
                            <option value="PUBLIC">Public</option>
                            <option value="PRIVATE">Private</option>
                            <option value="FOLLOWERS_ONLY">Followers only</option>
                        </select>
                    </div>
                </form>

                <div className="px-4 flex justify-end gap-4">
                    <button className="font-bold bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition-all" onClick={() => setCreatePost(false)}>Cancel</button>
                    <button className="font-bold bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-all" onClick={() => handleCreatePost()}>Create Post</button>
                </div>
            </div>
        </div>
    );
}

export default CreatePostForm;