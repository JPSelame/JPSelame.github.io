const margin = { top: 20, right: 30, bottom: 40, left: 40 },
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

const data = [
    { county: "Cobb", value: 19260 },
    { county: "Dekalb", value: 29010 },
    { county: "Fulton", value: 34300 },
    { county: "Gwinett", value: 26980 }
];

const xScale = d3.scaleBand()
    .domain(data.map(d => d.county))
    .range([0, width])
    .padding(0.1);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([height, 0]);

const svgContainer = d3.select("body").append("div")
    .attr("class", "bar-graph-container");

const svgBarGraph = svgContainer.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svgBarGraph.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", d => xScale(d.county))
    .attr("y", d => yScale(d.value))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d.value))
    .attr("fill", "#69b3a2");

svgBarGraph.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

svgBarGraph.append("g")
    .call(d3.axisLeft(yScale));

svgBarGraph.selectAll("text.bar-label")
    .data(data)
    .enter().append("text")
    .attr("class", "bar-label")
    .attr("x", d => xScale(d.county) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.value) - 5)
    .attr("text-anchor", "middle")
    .text(d => d.county);
