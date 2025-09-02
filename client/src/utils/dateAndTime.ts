
export const timeDifference = (date: string | Date): string => {
    const givenDate: Date = new Date(date);  // Ensure it’s a Date
    const diffTime = Math.abs(new Date().getTime() - givenDate.getTime());  // Use .getTime() for numbers

    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;

    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
    if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;

    return 'just now';
};