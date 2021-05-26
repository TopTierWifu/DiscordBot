const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;

/**
 * Convert a timestamp to the format: Sat May 01 2021 18:42
 * @arg {number | Date} date 
 */
exports.fullDatetime = (date) => {
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

/**@arg {Date | number} duration Date or number in milliseconds*/
exports.fullDurationString = (duration) => {
    const { seconds: s, minutes: m, hours: h, days: d } = exports.parseDuration(duration);
    let text = "";

    switch (true) {
        case d > 0: text += `${d}d `;
        case h > 0: text += `${h}h `;
        case m > 0: text += `${m}m `;
        case s > 0: text += `${s}s`;
    }

    return text;
}

/**@arg {Date | number} duration */
exports.parseDuration = (duration) => {
    let dur = new Date(duration).getTime();
    let milliseconds, seconds, minutes, hours, days;

    switch (true) {
        case dur >= day: days = ~~(dur / day); dur = dur % day;
        case dur >= hour: hours = ~~(dur / hour); dur = dur % hour;
        case dur >= minute: minutes = ~~(dur / minute); dur = dur % minute;
        case dur >= second: seconds = ~~(dur / second); dur = dur % second;
        default: milliseconds = dur;
    }

    return {
        milliseconds,
        seconds,
        minutes,
        hours,
        days,
    };
}