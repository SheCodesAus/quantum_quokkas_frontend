export function formatDate(startDate) {
    const isoDate = startDate;
    const date = new Date(isoDate);
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    const formattedDate = new Intl.DateTimeFormat('en-AU', options).format(
        date
    );
    return formattedDate;
}
