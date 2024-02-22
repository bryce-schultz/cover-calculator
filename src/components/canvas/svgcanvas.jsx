import { useWindowDimension } from '../../utilities/hooks/useWindowDimension';
import './canvas.css';
import { useRef, useEffect } from 'react';

const ns = 'http://www.w3.org/2000/svg';

export function drawLine(svg, x1, y1, x2, y2, stroke = 'black')
{
    let line_element = document.createElementNS(ns, 'line');
    line_element.setAttribute('stroke', stroke);
    line_element.setAttribute('x1', x1);
    line_element.setAttribute('y1', y1);
    line_element.setAttribute('x2', x2);
    line_element.setAttribute('y2', y2);
    svg.appendChild(line_element);
    return line_element;
}

export function drawPoly(svg, points, fill = 'none', stroke = 'black')
{
    let polygon_element = document.createElementNS(ns, 'polygon');
    polygon_element.setAttribute('fill', fill);
    polygon_element.setAttribute('stroke', stroke);
    polygon_element.setAttribute('points', points.join(' '));
    svg.appendChild(polygon_element);
    return polygon_element;
}

export function drawText(svg, x, y, text, fill = 'black', fontSize = 12, fontFamily = 'Arial')
{
    let text_element = document.createElementNS(ns, 'text');
    text_element.setAttribute('x', x);
    text_element.setAttribute('y', y);
    text_element.setAttribute('fill', fill);
    text_element.setAttribute('font-size', fontSize);
    text_element.setAttribute('font-family', fontFamily);
    text_element.textContent = text;
    svg.appendChild(text_element);
    return text_element;
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