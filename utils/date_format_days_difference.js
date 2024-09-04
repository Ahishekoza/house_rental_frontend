export const formaDatesAndGetDaysDifference = (fromDate,toDate)=>{
    const date_formate = new Date(fromDate);
    const date_to = new Date(toDate);
    const iso_from_Date = date_formate.toISOString();
    const iso_to_Date = date_to.toISOString();


    const timedifference = new Date(iso_to_Date).getTime()  - new Date(iso_from_Date).getTime();

    const daysDifference = timedifference / (1000*3600*24)

    return Math.floor(daysDifference)
}