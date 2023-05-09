const formatDate = (eventDate) => {
    const date = new Date(eventDate);
    return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    }).format(date);
    };

const formattedDate = formatDate('2001-02-23');
console.log(formattedDate); // Output: 23rd February 2001