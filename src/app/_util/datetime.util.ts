
export function GetTimeSort(time:string): number
{
	let hour = time.slice(0, 2);
	let minute = time.slice(3, 5);

	return Number("42"+hour+minute);
}

export function DateCount(startDate: string, daynum: string)
{
    let dateRegex = /(\d*)\/(\d*)\/(\d*)/i;
    let match = dateRegex.exec(startDate);

    let finalDay = Number(match[1]) + Number(daynum) - 1;

    return `${finalDay}/${match[2]}/${match[3]}`
}
