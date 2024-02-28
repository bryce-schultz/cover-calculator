//*********************************************************
// calcCorner
//
// Takes hypotenuse of a right triangle and returns the 
// length of the adjacent side.
//
//  ____a____
//  |      /
// a|    /
//  |  / h
//  |/
//
// a = adjacent side
// h = hypotenuse
//
// a = h / sqrt(2)
//
// Example:
// radius = 10
//
// corner = 10 / sqrt(2)
// corner = 10 / 1.41421356237
// corner = 7.07...
//
export function calcCorner(radius)
{
    const sqrt2 = 1.41421356237;
    return (radius / sqrt2);
}
//*********************************************************


//*********************************************************
// applyScale
//
// Apply a scale to a polygon.
//
// Example:
// scale = 10
// polygon = [[0, 0], [1, 1], [2, 2]]
//
// scaled = [[0, 0], [10, 10], [20, 20]]
//
export function applyScale(polygon, scale)
{
    return polygon.map(point => [point[0] * scale, point[1] * scale]);
}
//*********************************************************

//*********************************************************
// distance
//
// Calculate the distance between two points.
//
// Example:
// point1 = [0, 0]
// point2 = [1, 1]
//
// distance = sqrt((1 - 0)^2 + (1 - 0)^2)
// distance = sqrt(1 + 1)
// distance = sqrt(2)
// distance = 1.414
//
export function distance(point1, point2)
{
    return Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2));
}
//*********************************************************


//*********************************************************
// elapsedDays
//
// Calculate the number of days between two dates.
//
// Example:
// date1 = new Date('2024-02-28')
// date2 = new Date('2024-03-01')
//
// days = (date2 - date1) / (1000 * 60 * 60 * 24)
// days = (86400000) / (1000 * 60 * 60 * 24)
// days = 1
//
export function elapsedDays(date1, date2)
{
    return Math.round((new Date(date2) - new Date(date1)) / (1000 * 60 * 60 * 24));
}