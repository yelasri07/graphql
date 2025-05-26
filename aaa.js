export function DisplayProgress(Progress) {
    const container = document.createElement("div");
    container.id = "chart-container";

    container.innerHTML = `<svg id="chart" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet" style="width:100%;height:auto;"></svg>`;
    document.body.appendChild(container);

    const svg = document.getElementById("chart");

    const width = 800;
    const height = 400;
    const padding = 50;

    const parsedData = Progress.map(t => ({
        date: new Date(t.createdAt),
        amount: t.amount
    }));

    if (parsedData.length === 0) return;

    const minDate = Math.min(...parsedData.map(t => t.date));
    const maxDate = Math.max(...parsedData.map(t => t.date));
    const maxAmount = Math.max(...parsedData.map(t => t.amount));

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

        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", padding - 10);
        label.setAttribute("y", y + 4);
        label.setAttribute("text-anchor", "end");
        label.setAttribute("font-size", "10");
        label.setAttribute("font-family", "Arial, sans-serif");
        label.textContent = Math.round(value);
        svg.appendChild(label);

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", padding);
        line.setAttribute("y1", y);
        line.setAttribute("x2", width - padding);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "#eee");
        line.setAttribute("stroke-dasharray", "2,2");
        svg.appendChild(line);
    }

    const labelInterval = Math.ceil(parsedData.length / 8);

    parsedData.forEach((t, i) => {
        const cx = getX(t.date);
        const cy = getY(t.amount);

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", 4);
        circle.setAttribute("fill", "#dc2626");
        svg.appendChild(circle);

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

    const points = parsedData.map(t => `${getX(t.date)},${getY(t.amount)}`).join(" ");
    const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polyline.setAttribute("points", points);
    polyline.setAttribute("fill", "none");
    polyline.setAttribute("stroke", "#3b82f6");
    polyline.setAttribute("stroke-width", 2);
    svg.appendChild(polyline);
}