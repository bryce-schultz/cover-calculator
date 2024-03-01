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

export function getCircumRadiusOfDecagon(inradius)
{
    const sides = 10;
    return inradius / Math.cos(Math.PI / sides);
}

export function generateDecagonPoints(inradius, width, height) 
{
    const centerX = width / 2;
    const centerY = height / 2;
    const numPoints = 10;
    const angleIncrement = (2 * Math.PI) / numPoints;
    
    const points = [];

    for (let i = 0; i < numPoints; i++) {
        const x = centerX + inradius * Math.cos(i * angleIncrement);
        const y = centerY + inradius * Math.sin(i * angleIncrement);
        points.push([x, y]);
    }

    points.push(points[0]);

    return points;
}

export function getDecagonIntersectionPoints(decagonPoints, x1, y1, x2, y2) 
{
    const intersectionPoints = [];

    // Iterate over each edge of the decagon
    for (let i = 0; i < decagonPoints.length; i++) {
        const x3 = decagonPoints[i][0];
        const y3 = decagonPoints[i][1];
        const x4 = decagonPoints[(i + 1) % decagonPoints.length][0];
        const y4 = decagonPoints[(i + 1) % decagonPoints.length][1];

        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (denominator !== 0) {
            const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
            const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

            if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
                const intersectionX = x1 + t * (x2 - x1);
                const intersectionY = y1 + t * (y2 - y1);
                intersectionPoints.push([intersectionX, intersectionY]);
            }
        }
    }

    return intersectionPoints;
}