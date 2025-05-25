export function displayProjects() {
    const svg = document.getElementById("chart");

    // ====== 1. Data ======
    const data = [
      { year: 2008, value: 1 },
      { year: 2009, value: 3.3 },
      { year: 2010, value: 5.8 },
      { year: 2011, value: 2.4 },
      { year: 2012, value: 4.5 },
      { year: 2013, value: 6.9 }
    ];
  
    // ====== 2. Chart dimensions ======
    const width = 700;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
  
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
  
    // ====== 3. Find max value for scaling ======
    const maxValue = Math.max(...data.map(d => d.value));
  
    // ====== 4. Scaling functions ======
    const xStep = chartWidth / (data.length - 1);
    const yScale = value => chartHeight - (value / maxValue) * chartHeight;
  
    // ====== 5. Create group for content ======
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", `translate(${margin.left}, ${margin.top})`);
    svg.appendChild(g);
  
    // ====== 6. Draw axes lines ======
    const drawAxes = () => {
      // X axis
      const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
      xAxis.setAttribute("x1", 0);
      xAxis.setAttribute("y1", chartHeight);
      xAxis.setAttribute("x2", chartWidth);
      xAxis.setAttribute("y2", chartHeight);
      xAxis.setAttribute("stroke", "#ccc");
      g.appendChild(xAxis);
  
      // Y axis
      const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
      yAxis.setAttribute("x1", 0);
      yAxis.setAttribute("y1", 0);
      yAxis.setAttribute("x2", 0);
      yAxis.setAttribute("y2", chartHeight);
      yAxis.setAttribute("stroke", "#ccc");
      g.appendChild(yAxis);
    };
  
    drawAxes();
  
    // ====== 7. Draw Area ======
    let areaPath = `M 0 ${chartHeight} `; // Start at bottom-left
    data.forEach((d, i) => {
      const x = i * xStep;
      const y = yScale(d.value);
      areaPath += `L ${x} ${y} `;
    });
    areaPath += `L ${chartWidth} ${chartHeight} Z`; // Down to bottom-right then close
  
    const area = document.createElementNS("http://www.w3.org/2000/svg", "path");
    area.setAttribute("d", areaPath);
    area.setAttribute("class", "area");
    g.appendChild(area);
  
    // ====== 8. Draw Line ======
    let linePath = "";
    data.forEach((d, i) => {
      const x = i * xStep;
      const y = yScale(d.value);
      linePath += i === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
    });
  
    const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
    line.setAttribute("d", linePath);
    line.setAttribute("class", "line");
    g.appendChild(line);
  
    // ====== 9. Draw Points (Circles) ======
    data.forEach((d, i) => {
      const x = i * xStep;
      const y = yScale(d.value);
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", x);
      circle.setAttribute("cy", y);
      circle.setAttribute("r", 5);
      circle.setAttribute("class", "point");
      g.appendChild(circle);
    });
  
    // ====== 10. Draw Labels ======
    data.forEach((d, i) => {
      const x = i * xStep;
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", x);
      label.setAttribute("y", chartHeight + 20);
      label.setAttribute("text-anchor", "middle");
      label.textContent = d.year;
      g.appendChild(label);
    });
  
}