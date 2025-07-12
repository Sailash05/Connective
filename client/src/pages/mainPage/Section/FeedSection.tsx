import FeedPost from "../../../components/mainPageComponent/feedComponent/FeedPost";

const FeedSection = ({ setCreatePost }: { setCreatePost: (value: boolean) => void}) => {

    return(
        <section className="bg-gray-100 dark:bg-slate-950 px-6 py-4">
            <FeedPost setCreatePost={setCreatePost} /> 
        </section>
    );
}

export default FeedSection;