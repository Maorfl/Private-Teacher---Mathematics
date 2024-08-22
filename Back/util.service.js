function isHalfHourMoreThanNow(dateTimeString) {
    const date = new Date(dateTimeString.replace(" ", "T") + ":00Z");
    const now = new Date();
    now.setHours(now.getHours() + 3);
    console.log(date.getTime() - now.getTime() <= 35 * 60000 && date.getTime() - now.getTime() >= 25 * 60000);

    if (date.getTime() - now.getTime() <= 30 * 60000 && date.getTime() - now.getTime() >= 25 * 60000) return true;
    return false;
}

module.exports = { isHalfHourMoreThanNow };
