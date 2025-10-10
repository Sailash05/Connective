import { useEffect, useState } from "react";
import { type UserProfileCardType } from "../types/UserProfileCardType";
import { userService } from "../service/user.service";

const useUserLoad = (
    pageNumber: number,
    limit: number,
    search: string,
    sortBy: string,
    isMutual: boolean,
    type: string
) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [userList, setUserList] = useState<UserProfileCardType[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const response = await userService.getUserProileList(
                pageNumber,
                limit,
                search.trim(),
                sortBy,
                isMutual,
                type
            );
            const data = response.data;

            setUserList(prev => {
                const isFirstPage = response.data.data.paging.currentPage === 1;
                if (isFirstPage) return data.data.userProfile;

                const merged = [...prev, ...data.data.userProfile];

                // Use userProfile._id as unique key
                const unique = Array.from(
                    new Map(merged.map(u => [u.userProfile._id, u])).values()
                );

                return unique;
            });


            setHasMore(data.data.paging.currentPage < data.data.paging.totalPage);
            setLoading(false);
        }
        catch (err:any) {
            console.log(err.message);
            setLoading(false);
            setError(true);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [pageNumber, search, sortBy, isMutual]);

    const resetUsers = () => {
        setUserList([]);
        setHasMore(false);
    };

    return { loading, error, userList, hasMore, resetUsers };
};

export default useUserLoad;