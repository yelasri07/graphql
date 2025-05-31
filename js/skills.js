const SVG = "http://www.w3.org/2000/svg"

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

    const totalXP = 100;
    const barWidth = (width - 2 * padding) / skills.length;

    const xAxis = document.createElementNS(SVG, "line");
    xAxis.setAttribute("x1", padding);
    xAxis.setAttribute("y1", height - padding);
    xAxis.setAttribute("x2", width - padding);
    xAxis.setAttribute("y2", height - padding);
    xAxis.setAttribute("stroke", "#ccc");
    svg.appendChild(xAxis);

    const yAxis = document.createElementNS(SVG, "line");
    yAxis.setAttribute("x1", padding);
    yAxis.setAttribute("y1", padding);
    yAxis.setAttribute("x2", padding);
    yAxis.setAttribute("y2", height - padding);
    yAxis.setAttribute("stroke", "#ccc");
    svg.appendChild(yAxis);

    const tooltip = document.createElementNS(SVG, "text");
    tooltip.setAttribute("visibility", "hidden");
    tooltip.setAttribute("font-size", "12");
    svg.appendChild(tooltip);

    const maxSkill = document.createElementNS(SVG, "text")
    maxSkill.setAttribute("font-size", "12");
    maxSkill.textContent = "qqsd"
    maxSkill.setAttribute("x", 20);
    maxSkill.setAttribute("y", 20);
    svg.appendChild(maxSkill);


    skills.forEach((t, i) => {
        const barHeight = (t.amount / totalXP) * (height - 2 * padding);
        const x = padding + i * barWidth;
        const y = height - padding - barHeight;
        
        const rect = document.createElementNS(SVG, "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", barWidth * 0.98);
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
