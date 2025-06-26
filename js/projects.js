import { capitalize } from "../utils/capitalize.js";
import { convertXPToReadable } from "../utils/convert.js";

const SVG = "http://www.w3.org/2000/svg"

export function displayProjectsProgress(projects) {
    if (projects.length === 0) {
        let projects = document.querySelector('.projects')
        projects.innerHTML = /*html*/`
             <div class="title">
                    <h2>Project Progress</h2>
             </div>
             <p class="noData">No data</p>
        `
        return 
    }

    const svg = document.getElementById("chart");
    let detailsElement = document.querySelector('.details')

    let data = projects.map(value => {
        return {
            date: new Date(value.createdAt),
            amount: value.amount,
            projectName: value.object.name,
            invalidatedAt: value.invalidatedAt,
            invalidationReason: value.invalidationReason
        }
    })

    let maxValue = 0
    let totalXP = 0
    let accum = []
    data.forEach(value => {
        accum.push(value.amount)
        maxValue = accum.reduce((accumulator, currentValue) => accumulator + currentValue)
        if (maxValue > totalXP) {
            totalXP = maxValue
        }
    })

    const width = 800;
    const height = 400;
    const padding = 50;

    const minDate = Math.min(...data.map(t => t.date));
    const maxDate = Math.max(...data.map(t => t.date));

    const getX = date => {
        if (minDate === maxDate) return width / 2;
        return padding + ((date - minDate) / (maxDate - minDate)) * (width - 2 * padding);
    };

    const getY = amount => {
        if (totalXP === 0) return height - padding;
        return height - padding - (amount / totalXP) * (height - 2 * padding);
    };

    const yAxis = document.createElementNS(SVG, "line");
    yAxis.setAttribute("x1", padding);
    yAxis.setAttribute("y1", padding);
    yAxis.setAttribute("x2", padding);
    yAxis.setAttribute("y2", height - padding);
    yAxis.setAttribute("stroke", "#ccc");
    yAxis.setAttribute("stroke-width", 2);
    svg.appendChild(yAxis);

    const xAxis = document.createElementNS(SVG, "line");
    xAxis.setAttribute("x1", padding);
    xAxis.setAttribute("y1", height - padding);
    xAxis.setAttribute("x2", width - padding);
    xAxis.setAttribute("y2", height - padding);
    xAxis.setAttribute("stroke", "#ccc");
    xAxis.setAttribute("stroke-width", 2);
    svg.appendChild(xAxis);

    const numTicks = 10;
    for (let i = 0; i <= numTicks; i++) {
        const value = (totalXP / numTicks) * i;
        const y = getY(value);

        const label = document.createElementNS(SVG, "text");
        label.setAttribute("x", padding - 10);
        label.setAttribute("y", y + 4);
        label.setAttribute("text-anchor", "end");
        label.setAttribute("font-size", "10");
        label.textContent = convertXPToReadable(value);
        svg.appendChild(label);
    }

    const labelInterval = Math.ceil(data.length / 8);

    accum = []
    data.forEach((t, i) => {
        accum.push(t.amount);
        t.cy = getY(accum.reduce((accumulator, currentValue) => accumulator + currentValue))
    });

    const points = data.map(t => `${getX(t.date)},${t.cy}`).join(" ");
    const polyline = document.createElementNS(SVG, "polyline");
    polyline.setAttribute("points", points);
    polyline.setAttribute("fill", "none");
    polyline.setAttribute("stroke-width", 2);
    svg.appendChild(polyline);

    data.forEach((t, i) => {
        const cx = getX(t.date);

        const circle = document.createElementNS(SVG, "circle");
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", t.cy);
        circle.setAttribute("r", 2);
        svg.appendChild(circle);

        circle.addEventListener("mouseover", e => {
            detailsElement.style.display = 'block'
            let status = /*html*/`
        <p class="succeeded"><i class="fa-solid fa-circle-check"></i> succeeded</p>
        `
            if (t.amount < 0) {
                status = /*html*/`
          <p class="invalidated"><i class="fa-solid fa-circle-xmark"></i> INVALIDATED</p>
          `
            }

            detailsElement.innerHTML = /*html*/`
         <h3>${capitalize(t.projectName)}</h3>
         <p class="date">${t.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: "numeric" })}</p>
         ${status}
         `
            detailsElement.style.top = e.pageY - 10 - detailsElement.getBoundingClientRect().height + 'px'
            detailsElement.style.left = e.pageX - 10 - detailsElement.getBoundingClientRect().width + 'px'
            circle.setAttribute("r", 5)
        });

        circle.addEventListener("mouseout", () => {
            detailsElement.style.display = 'none'
            circle.setAttribute("r", 2)
        });


        if (i % labelInterval === 0) {
            const text = document.createElementNS(SVG, "text")
            text.setAttribute("x", cx)
            text.setAttribute("y", height - padding + 25)
            text.setAttribute("text-anchor", "end")
            text.setAttribute("font-size", "10")
            text.setAttribute("transform", `rotate(-45, ${cx}, ${height - padding + 25})`)
            text.textContent = t.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            svg.appendChild(text);
        }
    });
}