
export function getTimeSort(time:string): number
{
	let hour = time.slice(0, 2);
	let minute = time.slice(3, 5);

	return Number("42"+hour+minute);
}

