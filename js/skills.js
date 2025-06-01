import { capitalize } from "../utils/capitalize.js"

const SVG = "http://www.w3.org/2000/svg"

export function displaySkills(skills) {
    if (skills.length === 0) {
        let skills = document.querySelector('.skills')
        skills.innerHTML = /*html*/`
             <div class="title">
                    <h2>Skills</h2>
             </div>
             <p class="noData">No data</p>
        `
        return
    }

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
    maxSkill.setAttribute("font-size", "10");
    maxSkill.textContent = skills[0].amount + " %"
    maxSkill.setAttribute("x", padding);
    maxSkill.setAttribute("y", height - padding + 15);
    svg.appendChild(maxSkill);

    const minSkill = document.createElementNS(SVG, "text")
    minSkill.setAttribute("font-size", "10");
    minSkill.textContent = skills[skills.length - 1].amount + " %"
    minSkill.setAttribute("text-anchor", "end")
    minSkill.setAttribute("x", width - padding);
    minSkill.setAttribute("y", height - padding + 15);
    svg.appendChild(minSkill);

    skills.forEach((t, i) => {
        const barHeight = (t.amount / totalXP) * (height - 2 * padding);
        const x = padding + i * barWidth;
        const y = height - padding - barHeight;

        const rect = document.createElementNS(SVG, "rect");
        rect.setAttribute("x", x + 1);
        rect.setAttribute("y", y - 1);
        rect.setAttribute("width", barWidth * 0.8);
        rect.setAttribute("height", barHeight);

        rect.addEventListener("mouseover", () => {
            tooltip.setAttribute("x", width / 2);
            tooltip.setAttribute("y", height - padding + 15);
            tooltip.setAttribute("font-size", "10");
            tooltip.setAttribute("text-anchor", "middle")
            tooltip.textContent = `${capitalize(t.type)} - ${t.amount} %`;
            tooltip.setAttribute("visibility", "visible");
        });

        rect.addEventListener("mouseout", () => {
            tooltip.setAttribute("visibility", "hidden");
        });

        svg.appendChild(rect);
    });
}
