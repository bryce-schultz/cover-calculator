let ns = 'http://www.w3.org/2000/svg';

const Color = {
    RED: "#FF0000",
};

function max_width() 
{
    return window.innerWidth;
}

function max_height() 
{
    return window.innerHeight;
}

export default function SVGCanvas(width, height)
{
    //Local variables
    this.width = width;
    this.height = height;
    this.vertices = [];
    this.creatingShape = false;
    this.xoffset = 0;
    this.yoffset = 0;
    this.stroke = '#000000';
    this.fill = 'none';
    this.parentElement = '';
    this.fontSize = '12';
    this.shapeName = '';
    this.background = '#FFFFFF';

    //Setup canvas variables
    this.canvas = document.createElementNS(ns, 'svg');
    this.canvas.style.width = this.width;
    this.canvas.style.height = this.height;
    this.canvas.setAttribute('style', "background-color:" + this.background);
    document.body.appendChild(this.canvas);

    this.setWidth = function(width)
    {
        this.width = width;
        this.canvas.setAttribute('width', this.width);
        this.canvas.style.width = width + "px";
    }

    this.setHeight = function(height)
    {
        this.height = height;
        this.canvas.setAttribute('height', this.height);
        this.canvas.style.height = height + "px";
    }

    this.getWidth = function()
    {
        return this.canvas.clientWidth;
    }

    this.getHeight = function()
    {
        return this.canvas.clientHeight;
    }

    //
    this.setTextSize = function(size)
    {
        this.fontSize = size;
    }

    this.clear = function()
    {
        while(this.canvas.firstChild)
        {
            this.canvas.firstChild.remove();
        }
    }

    this.parent = function(parent)
    {
        if (this.parentElement != '')
        {
            document.getElementById(this.parentElement).removeChild(this.canvas);
        }
        else
        {
            document.body.removeChild(this.canvas);
        }
        this.parentElement = parent;
        document.getElementById(this.parentElement).appendChild(this.canvas);
    }

    this.resize = function(width, height)
    {
        this.width = width;
        this.height = height;
        this.canvas.style.width = this.width;
        this.canvas.style.height = this.height;
    }

    this.setBackground = function(r = undefined, g = undefined, b = undefined)
    {
        if (g == undefined && b == undefined)
        {
            this.background = r;
            this.canvas.setAttribute('style', "background-color:" + r);
        } else {
            let color = new RGB(r, g, b).toColorCode();
            this.background = color;
            this.canvas.setAttribute('style', "background-color:" + color);
        }
    }

    this.rotate = function(degrees)
    {
        this.canvas.setAttribute('transform', 'rotate(' + degrees + ')');
    }

    this.setColor = function(r = undefined, g = undefined, b = undefined)
    {
        if (g == undefined && b == undefined)
        {
            this.stroke = r;
            this.fill = r;
        } else {
            let color = new RGB(r, g, b);
            this.stroke = color.toColorCode();
            this.fill = color.toColorCode();
        }
    }

    this.setOffset = function(x, y)
    {
        this.xoffset = x;
        this.yoffset = y;
    }

    this.setStroke = function(r = undefined, g = undefined, b = undefined)
    {
        if (g == undefined && b == undefined)
        {
            this.stroke = r;
        }
        else
        {
            let color = new RGB(r, g, b);
            this.stroke = color.toColorCode();
        }
    }

    this.resetStroke = function()
    {
        this.stroke = '#000000';
    }

    this.resetColor = function()
    {
        this.resetFill();
        this.resetStroke();
    }

    this.setFill = function(r = undefined, g = undefined, b = undefined)
    {
        if (g == undefined && b == undefined)
        {
            this.fill = r;
        }
        else
        {
            let color = new RGB(r, g, b);
            this.fill = color.toColorCode();
        }
    }

    this.resetFill = function()
    {
        this.fill = 'none';
    }

    this.rect = function(x, y, width, height)
    {
        var rect = document.createElementNS(ns, 'rect');
        rect.setAttribute('stroke', this.stroke);
        rect.setAttribute('fill', this.fill);
        rect.setAttribute('x', x + this.xoffset);
        rect.setAttribute('y', y + this.yoffset);
        rect.setAttribute('width', width + this.xoffset);
        rect.setAttribute('height', height + this.yoffset);

        this.canvas.appendChild(rect);
        return rect;
    }

    this.line = function(x1, y1, x2, y2)
    {
      var line = document.createElementNS(ns, 'line');
      line.setAttribute('stroke', this.stroke);
      line.setAttribute('fill', this.fill);
      line.setAttribute('x1', x1 + this.xoffset);
      line.setAttribute('y1', y1 + this.yoffset);
      line.setAttribute('x2', x2 + this.xoffset);
      line.setAttribute('y2', y2 + this.yoffset);
      this.canvas.appendChild(line);
      return line;
    }

    this.triangle = function(x1, y1, x2, y2, x3, y3)
    {
        var triangle = document.createElementNS(ns, 'polygon');
        triangle.setAttribute('stroke', this.stroke);
        triangle.setAttribute('fill', this.fill);
        triangle.setAttribute('points', x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3);
        this.canvas.appendChild(triangle);
	    return triangle
    }

    this.circle = function(x, y, r)
    {
      var circle = document.createElementNS(ns, 'circle');
      circle.setAttribute('stroke', this.stroke);
      circle.setAttribute('fill', this.fill);
      circle.setAttribute('cx', x + this.xoffset);
      circle.setAttribute('cy', y + this.yoffset);
      circle.setAttribute('r', r);
      this.canvas.appendChild(circle);
      return circle;
    }

    this.createShape = function(name)
    {
        this.shapeName = name;
        this.vertices = [];
        this.creatingShape = true;
    }

    this.endShape = function(p = 'NONE')
    {
        var group;
        if (document.getElementById(this.shapeName) == null) 
        {
            group = document.createElementNS(ns, 'g');
            group.setAttribute('id', this.shapeName);
        }
        else
        {
            group = document.getElementById(this.shapeName);
        }

        var d = '';
        for (var i = 0; i < this.vertices.length; i++)
        {
          var x = (this.vertices[i].x + this.xoffset);
          var y = (this.vertices[i].y + this.yoffset);

          if (i == 0)
          {
            d += 'M' + x + ' ' + y;
          }
          else
          {
            d += ' L' + x + ' ' + y;
          }
        }
        if (p == 'NONE')
        {

        }
        else if (p == 'CLOSE')
        {
          d += ' Z';
        }

        var path = document.createElementNS(ns, 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', this.fill);
        path.setAttribute('stroke', this.stroke);
        group.appendChild(path);
        this.canvas.appendChild(group);

        this.creatingShape = false;
        this.vertices = [];
        return path;
    }

    this.text = function(t, x, y)
    {
        var text = document.createElementNS(ns, 'text');
        text.setAttribute('font-size', this.fontSize + 'px');
        text.setAttribute('fill', this.stroke);
        text.setAttribute('x', x + this.xoffset);
        text.setAttribute('y', y + this.yoffset + this.fontSize * .75);
        text.textContent = t;

        this.canvas.appendChild(text);
        return text;
    }

    this.vertex = function(x, y)
    {
        if (this.creatingShape)
        {
            this.vertices[this.vertices.length] = new Vertex(x, y);
        }
    }

    this.showVertices = function()
    {
        console.log(this.vertices);
    }
}

function RGB(r = 0, g = 0, b = 0)
{
    this.r = r;
    this.g = g;
    this.b = b;

    this.toHex = function()
    {
        let red = toHex(this.r);
        let green = toHex(this.g);
        let blue = toHex(this.b);
        return red + green + blue;
    }

    this.toColorCode = function()
    {
        let red = toHex(this.r);
        let green = toHex(this.g);
        let blue = toHex(this.b);
        return "#" + red + green + blue;
    }
}

function toHex(num)
{
    var hex = Number(num).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
}

function Vertex(x, y)
{
    this.x = x;
    this.y = y;
}

function invertColor(hexTripletColor) {
    var color = hexTripletColor;
    color = color.substring(1); // remove #
    color = parseInt(color, 16); // convert to integer
    color = 0xFFFFFF ^ color; // invert three bytes
    color = color.toString(16); // convert to hex
    color = ("000000" + color).slice(-6); // pad with leading zeros
    color = "#" + color; // prepend #
    return color;
}