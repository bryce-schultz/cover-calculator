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
// corner = 10 / 1.414
// corner = 7.07
//
export function calcCorner(radius)
{
    return (radius/ Math.sqrt(2));
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