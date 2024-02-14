import { useWindowDimension } from '../../utilities/hooks/useWindowDimension';
import './canvas.css';
import { useRef, useEffect } from 'react';

const ns = 'http://www.w3.org/2000/svg';

export function drawLine(svg, x1, y1, x2, y2, stroke = 'black')
{
    let line = document.createElementNS(ns, 'line');
    line.setAttribute('stroke', stroke);
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    svg.appendChild(line);
    return line;
}

export function drawPoly(svg, points, fill = 'none', stroke = 'black')
{
    let poly = document.createElementNS(ns, 'polygon');
    poly.setAttribute('fill', fill);
    poly.setAttribute('stroke', stroke);
    poly.setAttribute('points', points.join(' '));
    svg.appendChild(poly);
    return poly;
}

function SVGCanvas({draw})
{
    const svgRef = useRef(null);
    const dimensions = useWindowDimension();

    useEffect(() =>
    {
        const redrawSVG = () =>
        {
            const svg = svgRef.current;

            if (!svg) return;

            const width = svg.clientWidth;
            const height = svg.clientHeight;

            while(svg.firstChild)
            {
                svg.lastChild.remove();
            }

            if (typeof(draw) === 'function')
            {
                draw(svg, width, height);
            }
        }

        redrawSVG();
    }, [draw, dimensions]);

    return <svg className='ux-canvas' ref={svgRef}/>;
}

export default SVGCanvas;