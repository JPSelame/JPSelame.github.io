const svgGeorgia = d3.select("#georgiaMap");

const countiesToHighlight = [
    "Appling",
    "Atkinson",
    "Bacon",
    "Baker",
    "Baldwin",
    "Banks",
    "Barrow",
    "Bartow",
    "Ben Hill",
    "Berrien",
    "Bibb",
    "Bleckley",
    "Brantley",
    "Brooks",
    "Bryan",
    "Bulloch",
    "Burke",
    "Butts",
    "Calhoun",
    "Camden",
    "Candler",
    "Carroll",
    "Catoosa",
    "Charlton",
    "Chatham",
    "Chattahoochee",
    "Chattooga",
    "Cherokee",
    "Clarke",
    "Clay",
    "Clayton",
    "Clinch",
    "Cobb",
    "Coffee",
    "Colquitt",
    "Columbia",
    "Cook",
    "Coweta",
    "Crawford",
    "Crisp",
    "Dade",
    "Dawson",
    "Decatur",
    "DeKalb",
    "Dodge",
    "Dooly",
    "Dougherty",
    "Douglas",
    "Early",
    "Echols",
    "Effingham",
    "Elbert",
    "Emanuel",
    "Evans",
    "Fannin",
    "Fayette",
    "Floyd",
    "Forsyth",
    "Franklin",
    "Fulton",
    "Gilmer",
    "Glascock",
    "Glynn",
    "Gordon",
    "Grady",
    "Greene",
    "Gwinnett",
    "Habersham",
    "Hall",
    "Hancock",
    "Haralson",
    "Harris",
    "Hart",
    "Heard",
    "Henry",
    "Houston",
    "Irwin",
    "Jackson",
    "Jasper",
    "Jeff Davis",
    "Jefferson",
    "Jenkins",
    "Johnson",
    "Jones",
    "Lamar",
    "Lanier",
    "Laurens",
    "Lee",
    "Liberty",
    "Lincoln",
    "Long",
    "Lowndes",
    "Lumpkin",
    "McDuffie",
    "McIntosh",
    "Macon",
    "Madison",
    "Marion",
    "Meriwether",
    "Miller",
    "Mitchell",
    "Monroe",
    "Montgomery",
    "Morgan",
    "Murray",
    "Muscogee",
    "Newton",
    "Oconee",
    "Oglethorpe",
    "Paulding",
    "Peach",
    "Pickens",
    "Pierce",
    "Pike",
    "Polk",
    "Pulaski",
    "Putnam",
    "Quitman",
    "Rabun",
    "Randolph",
    "Richmond",
    "Rockdale",
    "Schley",
    "Screven",
    "Seminole",
    "Spalding",
    "Stephens",
    "Stewart",
    "Sumter",
    "Talbot",
    "Taliaferro",
    "Tattnall",
    "Taylor",
    "Telfair",
    "Terrell",
    "Thomas",
    "Tift",
    "Toombs",
    "Towns",
    "Treutlen",
    "Troup",
    "Turner",
    "Twiggs",
    "Union",
    "Upson",
    "Walker",
    "Walton",
];

d3.json("states-10m.json").then(statesData => {
    const geoGeorgiaState = topojson.feature(statesData, statesData.objects.states).features.find(d => d.id === "13"); // 13 is the id for Georgia
    
    const projectionGeorgia = d3.geoAlbersUsa().fitSize([975, 610], geoGeorgiaState); 
    const pathGeorgia = d3.geoPath().projection(projectionGeorgia);

    svgGeorgia.append("path")
        .datum(geoGeorgiaState)
        .attr("d", pathGeorgia)
        .attr("fill", "#e0e0e0")
        .attr("stroke", "black");

    d3.json("counties-10m.json").then(countiesData => {
        const geoGeorgiaCounties = topojson.feature(countiesData, countiesData.objects.counties).features.filter(d => String(d.id).startsWith("13"));
        
        console.log(geoGeorgiaCounties.map(d => d.properties.name));

        svgGeorgia.selectAll("path.county")
            .data(geoGeorgiaCounties)
            .enter().append("path")
            .attr("class", "county")
            .attr("stroke", "black")
            .attr("d", pathGeorgia)
            .attr("fill", function(d) {
                if (countiesToHighlight.includes(d.properties.name)) {
                    return "orange";  
                } else {
                    return "#ccc"; 
                }
            });
    });
});
