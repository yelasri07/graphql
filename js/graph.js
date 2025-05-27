import { convertXPToReadable } from "../utils/convert.js";

export function displayProjects(projects, totalXP) {
  const svg = document.getElementById("chart");

  let data = projects.map(value => {
    return {
      date: new Date(value.createdAt),
      amount: value.amount,
      projectName: value.object.name
    }
  })

  const width = 800;
  const height = 400;
  const padding = 50;

  const minDate = Math.min(...data.map(t => t.date));
  const maxDate = Math.max(...data.map(t => t.date));
  const maxAmount = totalXP;


  const getX = date => {
    if (minDate === maxDate) return width / 2;
    return padding + ((date - minDate) / (maxDate - minDate)) * (width - 2 * padding);
  };

  const getY = amount => {
    if (maxAmount === 0) return height - padding;
    return height - padding - (amount / maxAmount) * (height - 2 * padding);
  };

  const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  yAxis.setAttribute("x1", padding);
  yAxis.setAttribute("y1", padding);
  yAxis.setAttribute("x2", padding);
  yAxis.setAttribute("y2", height - padding);
  yAxis.setAttribute("stroke", "#ccc");
  yAxis.setAttribute("stroke-width", 2);
  svg.appendChild(yAxis);

  const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  xAxis.setAttribute("x1", padding);
  xAxis.setAttribute("y1", height - padding);
  xAxis.setAttribute("x2", width - padding);
  xAxis.setAttribute("y2", height - padding);
  xAxis.setAttribute("stroke", "#ccc");
  xAxis.setAttribute("stroke-width", 2);
  svg.appendChild(xAxis);

  const numTicks = 10;
  for (let i = 0; i <= numTicks; i++) {
    const value = (maxAmount / numTicks) * i;
    const y = getY(value);
    
    console.log(value, convertXPToReadable(value))

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", padding - 10);
    label.setAttribute("y", y + 4);
    label.setAttribute("text-anchor", "end");
    label.setAttribute("font-size", "10");
    // label.setAttribute("font-family", "Arial, sans-serif");
    label.textContent = Math.round(convertXPToReadable(value));
    svg.appendChild(label);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", padding);
    line.setAttribute("y1", y);
    line.setAttribute("x2", width - padding);
    line.setAttribute("y2", y);
    // line.setAttribute("stroke", "black");
    line.setAttribute("stroke-dasharray", "1");
    svg.appendChild(line);
  }

  const labelInterval = Math.ceil(data.length / 8);

  let accum = []
  data.forEach((t, i) => {
    const cx = getX(t.date);

    // console.log(t.projectName,t.amount)
    accum.push(t.amount)
    t.cy = getY(accum.reduce((accumulator, currentValue) => accumulator + currentValue))  

    // console.log(t.projectName, t.cy)

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", t.cy);
    circle.setAttribute("r", 4);
    circle.setAttribute("fill", "#dc2626");
    svg.appendChild(circle);

    const tooltip = document.createElementNS("http://www.w3.org/2000/svg", "text");
    tooltip.setAttribute("id", "tooltip");
    tooltip.setAttribute("visibility", "hidden");
    tooltip.setAttribute("font-size", "10");
    tooltip.setAttribute("font-family", "Arial, sans-serif");
    tooltip.setAttribute("fill", "black");
    svg.appendChild(tooltip);

    circle.addEventListener("mouseover", () => {
      tooltip.setAttribute("x", padding + 50);
      tooltip.setAttribute("y", padding + 10);
      tooltip.innerHTML = `${t.projectName}`;
      tooltip.setAttribute("visibility", "visible");
    });

    circle.addEventListener("mouseout", () => {
      tooltip.setAttribute("visibility", "hidden");
    });


    if (i % labelInterval === 0) {
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", cx);
      text.setAttribute("y", height - padding + 25);
      text.setAttribute("text-anchor", "end");
      text.setAttribute("font-size", "10");
      text.setAttribute("transform", `rotate(-45, ${cx}, ${height - padding + 25})`);
      text.setAttribute("font-family", "Arial, sans-serif");
      text.textContent = t.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      svg.appendChild(text);
    }
  });

  const points = data.map(t => `${getX(t.date)},${t.cy}`).join(" ");
  const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  polyline.setAttribute("points", points);
  polyline.setAttribute("fill", "none");
  polyline.setAttribute("stroke-width", 2);
  svg.appendChild(polyline);
}



export function displaySkills(skills) {
  let visitedSkill = {}
  let filterSkills = []
  skills.forEach(value => {
    if (!visitedSkill[value.type]) {
      visitedSkill[value.type] = true
      filterSkills.push(value)
    }
  })

  skills = filterSkills

  const svg = document.getElementById("skills-chart");

  const width = 800;
  const height = 400;
  const padding = 50;

  const maxAmount = 100;
  const barWidth = (width - 2 * padding) / skills.length;

  const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  xAxis.setAttribute("x1", padding);
  xAxis.setAttribute("y1", height - padding);
  xAxis.setAttribute("x2", width - padding);
  xAxis.setAttribute("y2", height - padding);
  xAxis.setAttribute("stroke", "#ccc");
  svg.appendChild(xAxis);

  const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  yAxis.setAttribute("x1", padding);
  yAxis.setAttribute("y1", padding);
  yAxis.setAttribute("x2", padding);
  yAxis.setAttribute("y2", height - padding);
  yAxis.setAttribute("stroke", "#ccc");
  svg.appendChild(yAxis);

  const tooltip = document.createElementNS("http://www.w3.org/2000/svg", "text");
  tooltip.setAttribute("id", "tooltip");
  tooltip.setAttribute("visibility", "hidden");
  tooltip.setAttribute("font-size", "12");
  tooltip.setAttribute("font-family", "Arial, sans-serif");
  tooltip.setAttribute("fill", "black");
  svg.appendChild(tooltip);

  skills.forEach((t, i) => {
    const barHeight = (t.amount / maxAmount) * (height - 2 * padding);
    const x = padding + i * barWidth;
    const y = height - padding - barHeight;

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", barWidth * 0.8);
    rect.setAttribute("height", barHeight);
    rect.setAttribute("fill", "#3b82f6");


    rect.addEventListener("mouseover", () => {
      tooltip.setAttribute("x", x + 5);
      tooltip.setAttribute("y", y - 10);
      tooltip.textContent = `${t.type} - ${t.amount}`;
      tooltip.setAttribute("visibility", "visible");
    });

    rect.addEventListener("mouseout", () => {
      tooltip.setAttribute("visibility", "hidden");
    });

    svg.appendChild(rect);
  });
}
