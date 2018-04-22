
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

export function GetCurrentDateTime() : string
{
    var dt = new Date();

    var date = dt.getDate();
    var month = dt.getMonth() + 1;
    var year = dt.getFullYear();

    var hour = dt.getHours();
    var minute = dt.getMinutes();
    var sec = dt.getSeconds();

    return `${date}/${month}/${year} ${hour}:${minute}:${sec}`
}

export function GetYMDFromDate(dt: Date) : string {
  var date = dt.getDate();
  var month = dt.getMonth() + 1;
  var year = dt.getFullYear();
  return `${date}-${month}-${year}`;
}

