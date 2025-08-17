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

            setUserList((prev) => {
                // if page = 1 → fresh load
                if (pageNumber === 1) {
                    return data.data.userProfile;
                }
                // otherwise → append unique
                const merged = [...prev, ...data.data.userProfile];
                const uniqueMap = new Map<string, UserProfileCardType>();
                for (const user of merged) {
                    uniqueMap.set(user.userId, user);
                }
                return Array.from(uniqueMap.values());
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