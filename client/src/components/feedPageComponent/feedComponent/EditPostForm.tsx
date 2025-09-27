import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

import { postService } from "../../../service/post.service.ts";
import { type PostFileType } from "../../../types/postType.ts";
import CreatingPostLoading from "../../loadingComponent/postLoading/CreatePostLoading.tsx";

type VisibilityOption = "PUBLIC" | "PRIVATE" | "FOLLOWERS_ONLY";

type EditPostFormProps = {
    _id: string;
    content: string;
    tags: string[];
    visibility: VisibilityOption;
    mediaUrls?: PostFileType[];
};

const EditPostForm = ({ post, setIsEditing }: { 
    post: EditPostFormProps,
    setIsEditing: (isEditing: boolean) => void}
) => {
    const [content, setContent] = useState<string>(post.content);
    const [files, setFiles] = useState<File[]>([]);
    const [tags, setTags] = useState<string>(post.tags.join(", ") || "");
    const [visibility, setVisibility] = useState<VisibilityOption>(post.visibility || "PUBLIC");

    const [existingMedia, setExistingMedia] = useState<PostFileType[]>(post.mediaUrls || []);
    const [deletedMedia, setDeletedMedia] = useState<string[]>([]);
    const [editingLoading, setEditingLoading] = useState<boolean>(false);

    const MAX_IMAGES = 10;
    const MAX_VIDEOS = 1;

    const preventDefaults = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files).filter(
            (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
        );
        handleFilesValidation(droppedFiles);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files ?? []).filter(
            (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
        );
        handleFilesValidation(selectedFiles);
    };

    const handleFilesValidation = (newFiles: File[]) => {
        // Count existing media
        const existingVideoCount = existingMedia.filter(f => f.type === "video").length;
        const existingImageCount = existingMedia.filter(f => f.type === "image").length;

        const newVideos = newFiles.filter(f => f.type.startsWith("video"));
        const newImages = newFiles.filter(f => f.type.startsWith("image"));

        // Cannot mix images and videos
        if ((existingVideoCount + newVideos.length > 0) && (existingImageCount + newImages.length > 0)) {
            alert("You cannot mix images and videos in the same post");
            return;
        }

        // Max 1 video
        if (existingVideoCount + newVideos.length > MAX_VIDEOS) {
            alert("You can only upload 1 video per post");
            return;
        }

        // Max 10 images
        if (existingImageCount + newImages.length > MAX_IMAGES) {
            alert("You can upload up to 10 images per post");
            return;
        }

        setFiles(prev => [...prev, ...newFiles]);
    };

    const handleRemoveFile = (indexToRemove: number) => {
        setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleRemoveExistingMedia = (index: number) => {
        const removed = existingMedia[index];
        setExistingMedia(prev => prev.filter((_, i) => i !== index));
        setDeletedMedia(prev => [...prev, removed.public_id]);
    };

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file as any));
        };
    }, [files]);

    const handleUpdatePost = async () => {
        if (!content.trim()) return;

        // Validate media rules again before sending
        const totalImages = existingMedia.filter(f => f.type === "image").length + files.filter(f => f.type.startsWith("image/")).length;
        const totalVideos = existingMedia.filter(f => f.type === "video").length + files.filter(f => f.type.startsWith("video/")).length;

        if (totalVideos > 1) return alert("You can only upload 1 video per post");
        if (totalImages > 10) return alert("You can upload up to 10 images per post");
        if (totalVideos > 0 && totalImages > 0) return alert("You cannot mix images and videos in the same post");

        const tagsArray = tags.split(",").map(t => t.trim()).filter(t => t !== "");
        const formData = new FormData();
        formData.append("content", content);
        formData.append("tags", JSON.stringify(tagsArray));
        formData.append("visibility", visibility.toUpperCase());
        files.forEach(f => formData.append("newMedia", f));
        if (deletedMedia.length > 0) formData.append("deletedMedia", JSON.stringify(deletedMedia));

        try {
            setEditingLoading(true);
            await postService.updatePost(post._id, formData);
            setEditingLoading(false);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            setEditingLoading(false);
        } finally {
            setEditingLoading(false);
        }
    };

    return (
        <div className="bg-black bg-opacity-25 dark:bg-opacity-30 w-[100dvw] h-[100dvh] fixed flex justify-center items-center inset-0 z-50">
            <div className="bg-white dark:bg-slate-800 max-md:min-w-[90dvw] max-md:overflow-y-scroll max-md:space-y-2 md:w-[35dvw] min-h-[90dvh] p-6 rounded-2xl flex flex-col justify-between">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-blue-600 dark:text-white font-bold text-2xl">Edit Post</h2>
                    <button onClick={() => setIsEditing(false)} className="bg-gray-200 hover:bg-gray-300 transition-all p-1 rounded-full">
                        <IoClose className="text-2xl text-gray-600" />
                    </button>
                </div>

                {/* Form */}
                <form className="flex-grow flex flex-col justify-evenly" onSubmit={(e) => { e.preventDefault(); handleUpdatePost(); }}>
                    {/* Content */}
                    <div>
                        <label className="font-bold dark:text-white">Update your thoughts...</label>
                        <textarea
                            placeholder="Write something..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-[8rem] resize-none border border-slate-500 rounded-lg outline-blue-600 p-2"
                        />
                    </div>

                    {/* Existing media */}
                    {existingMedia.length > 0 && (
                        <div className="flex gap-4 overflow-x-auto max-w-full pb-2">
                            {existingMedia.map((media, index) => (
                                <div key={media.public_id} className="relative w-fit shrink-0">
                                    <button onClick={(e) => { e.preventDefault(); handleRemoveExistingMedia(index); }}
                                        className="text-sm font-bold bg-red-500 text-white py-1 px-2 rounded-full absolute top-1 right-1 hover:bg-red-600 transition-all z-10">X</button>
                                    {media.type === "video" ? (
                                        <video src={media.url} width={100} controls className="rounded border" />
                                    ) : (
                                        <img src={media.url} alt={media.originalName} width={100} className="rounded border" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* New media */}
                    <div>
                        <label className="font-bold dark:text-white">Upload New Images/Videos</label>
                        {files.length > 0 && (
                            <div className="flex gap-4 overflow-x-auto max-w-full pb-2">
                                {files.map((file, index) => (
                                    <div key={index} className="relative w-fit shrink-0">
                                        <button onClick={(e) => { e.preventDefault(); handleRemoveFile(index); }}
                                            className="text-sm font-bold bg-gray-400 text-white py-1 px-2 rounded-full absolute top-1 right-1 hover:bg-gray-500 transition-all z-10">X</button>
                                        {file.type.startsWith("image/") ? (
                                            <img src={URL.createObjectURL(file)} alt={file.name} width={100} className="rounded border" />
                                        ) : (
                                            <video src={URL.createObjectURL(file)} width={100} controls className="rounded border" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div onDrop={handleDrop} onDragOver={preventDefaults} onDragEnter={preventDefaults} onDragLeave={preventDefaults} className="w-full p-3 border-2 border-dashed rounded-lg text-center cursor-pointer transition duration-200 ease-in-out hover:border-blue-600 bg-gray-50">
                            <p className="text-gray-500 mb-1">Drag & drop your new files here</p>
                            <p className="text-sm text-gray-400">or</p>
                            <label className="inline-block mt-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-800 transition-all cursor-pointer">
                                Browse Files
                                <input type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleFileChange} />
                            </label>
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="font-bold dark:text-white">Tags <span className="text-slate-600 dark:text-slate-200 font-medium">(Comma-separated)</span></label>
                        <input type="text" placeholder="eg. tech, ai, programming" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-2 rounded-lg border border-slate-500 outline-blue-600" />
                    </div>

                    {/* Visibility */}
                    <div>
                        <label className="font-bold dark:text-white">Visibility</label>
                        <select value={visibility} onChange={(e) => setVisibility(e.target.value as VisibilityOption)} className="w-full p-2 rounded-lg outline-blue-600 bg-white border border-slate-500 cursor-pointer">
                            <option value="PUBLIC">Public</option>
                            <option value="PRIVATE">Private</option>
                            <option value="FOLLOWERS_ONLY">Followers only</option>
                        </select>
                    </div>
                </form>

                {/* Buttons */}
                <div className="px-4 flex justify-end gap-4">
                    <button className="font-bold bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition-all" onClick={() => setIsEditing(false)}>Cancel</button>
                    <button className="font-bold bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-all" onClick={handleUpdatePost}>Update Post</button>
                </div>
            </div>
            {editingLoading && <CreatingPostLoading content={"Updating"} />}
        </div>
    );
};

export default EditPostForm;
