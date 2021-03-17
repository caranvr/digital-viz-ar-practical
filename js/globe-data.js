AFRAME.registerComponent('globe-data', {
    //The function run when the scene is ready
    init: function () {

        const globeEntity = document.getElementById('globeID');
        const globeEntityB = document.getElementById('globeID2');

        d3.json("https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_airports.geojson")
        .then(function (data) {
        globeEntityB.setAttribute('globe', {
            labelsData: data.features,
            labelLat: d => d.geometry.coordinates[1],
            labelLng: d => d.geometry.coordinates[0],
            labelText: d => d.properties.name,
            labelDotOrientation: () => 'bottom',
            labelColor: () => 'rgba(255,255,255,1)',
            labelSize: 0.2,
            labelResolution: 1,
            labelIncludeDot: true,
        });

        globeEntity.setAttribute('globe', {
            //data.features represent the Array of the parsed GeoJson
            arcsData: data.features,
            //Lat and Lng of London
            arcStartLat: 51.509865,
            arcStartLng: -0.118092,
            //Lat and Lng of all the other Airports, d is the reference of data.features
            arcEndLat: d => d.geometry.coordinates[1],
            arcEndLng: d => d.geometry.coordinates[0],
            //Parameters of the arc visualisation
            arcDashLength: 0.25,
            arcDashGap: 1,
            arcDashInitialGap: () => Math.random(),
            arcDashAnimateTime: 4000,
            arcColor: () => [`rgba(0, 255, 0, 0.5)`, `rgba(255, 0, 0, 0.5)`],
            arcsTransitionDuration: 0,});

        });

    }});