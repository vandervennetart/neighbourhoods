import * as ol from 'ol'
import 'ol/ol.css';
import TileLayer from "ol/layer/Tile.js";
import {OSM} from "ol/source.js";
import {fromLonLat} from "ol/proj.js";
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Point from 'ol/geom/Point.js';
import {Icon, Style} from "ol/style.js";
import {Feature} from "ol";
import {getLocation} from "../services/mapService.js";



export const makeMap = async (data) => {

    const {plaats} = data

    const {lng, lat} = await getLocation(plaats);

    //initMap
    const map = new ol.Map({
        layers: [
            new TileLayer({
                source: new OSM()
            })
        ],
        target: 'map',
        view: new ol.View({
            center: fromLonLat([lng, lat]),
            maxZoom: 25,
            zoom: 16
        })
    });

    const iconStyle = new Style({
        image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.icon-icons.com%2Ficons2%2F472%2FPNG%2F48%2Fmarker-48_45185.png&f=1&nofb=1&ipt=7fc302561cc4dd1a07bb6272866d68768c57fb5e6e609964a81dc204446b01c0&ipo=images',
        }),
    });

    const vectorSource = new VectorSource({
        features: []
    })

    const vectorLayer = new VectorLayer({
        source: vectorSource
    })

    map.addLayer(vectorLayer);


//addOverlay
    const container = document.querySelector('.ol-popup');
    const content = document.querySelector('.popup-content');
    const closer = document.querySelector('.ol-popup-closer');


    const overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });

    map.addOverlay(overlay);


// addMarker

    const feature = new Feature({
        geometry: new Point(fromLonLat([lng, lat])),
        name: "aadasd"
    })

    feature.setStyle(iconStyle)


    vectorSource.addFeature(feature)




}




