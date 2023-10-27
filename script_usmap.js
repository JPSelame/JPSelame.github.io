const svg = d3.select("svg");
const path = d3.geoPath();

d3.json("https://d3js.org/us-10m.v1.json").then(us => {

    // Draw counties
    d3.select("#counties")
        .attr("d", path(topojson.mesh(us, us.objects.counties, (a, b) => a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0))));

    // Draw nation
    d3.select("#nation")
        .attr("d", path(topojson.feature(us, us.objects.nation)));

    // Draw states individually
    d3.select("#statePaths")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .join("path")
        .attr("d", path)
        .style("fill", d => d.id == 13 ? "orange" : "none");  // Highlight Georgia with an orange fill

    // Draw state borders (over the individual state paths)
    d3.select("#states")
        .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));
});
