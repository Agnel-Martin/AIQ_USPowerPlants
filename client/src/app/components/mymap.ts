import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5geodata_usaLow from '@amcharts/amcharts5-geodata/usaLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import { Plant } from '../interface/IPlants';

function buildMap () {
  /* Chart code */
  // Create root element
  let root = am5.Root.new("chartdiv");
  
  // Set themes
  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  // Create the map chart
  let chart = root.container.children.push(am5map.MapChart.new(root, {
    panX: "translateX",
    panY: "translateY",
    projection: am5map.geoMercator()
  }));

  // Create main polygon series for countries
  let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"]
  }));

  polygonSeries.mapPolygons.template.setAll({
    tooltipText: "{name}",
    toggleKey: "active",
    interactive: true
  });

  polygonSeries.mapPolygons.template.states.create("hover", {
    fill: root.interfaceColors.get("primaryButtonHover")
  });

  polygonSeries.mapPolygons.template.states.create("active", {
    fill: root.interfaceColors.get("primaryButtonHover")
  });

  // US Series
  // Create main polygon series for countries
  let polygonSeriesUS = chart.series.push(am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_usaLow
  }));

  polygonSeriesUS.mapPolygons.template.setAll({
    tooltipText: "{name}",
    toggleKey: "active",
    interactive: true
  });

  let colors = am5.ColorSet.new(root, {});
  polygonSeriesUS.mapPolygons.template.set("fill", colors.getIndex(3));
  polygonSeriesUS.mapPolygons.template.states.create("hover", {
    fill: root.interfaceColors.get("primaryButtonHover")
  });
  polygonSeriesUS.mapPolygons.template.states.create("active", {
    fill: root.interfaceColors.get("primaryButtonHover")
  });

  // Add zoom control
  chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

  // Make the Map animate on page load
  chart.appear(1000, 100);

  //-----------To Set Markers on the Map---------------------------------
  let pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
  let colorset = am5.ColorSet.new(root, {});

  pointSeries.bullets.push(function () {
    let container = am5.Container.new(root, {});

    let circle = container.children.push(
      am5.Circle.new(root, {
        radius: 4,
        tooltipY: 0,
        fill: colorset.next(),
        strokeOpacity: 0,
        //tooltipText: "{title}"
      })
    );
    circle.animate({
      key: "scale",
      from: 1,
      to: 5,
      duration: 600,
      easing: am5.ease.out(am5.ease.cubic),
      loops: Infinity
    });
    circle.animate({
      key: "opacity",
      from: 1,
      to: 0,
      duration: 600,
      easing: am5.ease.out(am5.ease.cubic),
      loops: Infinity
    });

    let circle2 = container.children.push(
      am5.Circle.new(root, {
        radius: 4,
        tooltipY: 0,
        //fill: colorset.next(),
        fill: am5.color(0xb30000),
        strokeOpacity: 0,
        tooltipText: "{title}"
      })
    );

    return am5.Bullet.new(root, {
      sprite: container
    });
  });

  function addMarkers(addPlants: Plant[]){
    pointSeries.data.clear();
    for (var i = 0; i < addPlants.length; i++) {
      let plant = addPlants[i];
      pointSeries.data.push({
        geometry: { 
          type: "Point", 
          coordinates: [plant.LON, plant.LAT] 
        },
        title: plant.PNAME+", Net Generation: "+plant.PLNGENAN+" MWh",
      });
    }
  }
  return addMarkers;
}

export {buildMap};

