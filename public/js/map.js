console.log("✅ map.js is loaded!");

// Check if coordinates are available
if (typeof coordinates === "undefined" || !Array.isArray(coordinates) || coordinates.length < 2) {
    console.error("❌ Error: Coordinates are not defined or invalid!", coordinates);
} else {
    console.log("✅ Coordinates in map.js:", coordinates);
}

// LocationIQ API Key
locationiq.key = mapToken;

// Define the map and configure the map's theme
var map = new maplibregl.Map({
    container: 'map',
    style: locationiq.getLayer("Streets"),
    zoom: 12,
    center: coordinates // Centering map on provided coordinates
});

// Define layers you want to add to the layer controls; the first element will be the default layer
var layerStyles = {
    "Streets": "streets/vector",
    "Dark": "dark/vector",
    "Light": "light/vector"
};

map.addControl(new locationiqLayerControl({
    key: locationiq.key,
    layerStyles: layerStyles
}), 'top-left');

// Add a marker for the location
if (coordinates.length >= 2) {
    new maplibregl.Marker()
        .setLngLat(coordinates)
        .addTo(map);
} else {
    console.warn("⚠️ Warning: No valid coordinates to place a marker.");
}
