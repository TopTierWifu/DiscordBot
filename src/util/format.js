module.exports = class Format {
    constructor() { }

    /**
     * Convert a timestamp to the format: Sat May 01 2021 18:42
     * @param {number | Date} date 
     */
    fullDatetime(date) {
        return new Date(date).toLocaleString("en-US", {
            timeZone: "America/Los_Angeles",
            weekday: "short",
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour12: false,
            hour: "2-digit",
            minute: "2-digit"
        }).replace(",", "");
    }
}