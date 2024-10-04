     var series = [
    ["CO.AM", 75], ["CO.AN", 43], ["CO.AT", 88], ["CO.BL", 21], ["CO.BY", 43], ["CO.VP", 71],
    ["CO.MA", 0], ["CO.CA", 19], ["CO.CS", 60], ["CO.CU", 4], ["CO.RI", 44], ["CO.CL", 38],
    ["CO.CH", 67], ["CO.QD", 2], ["CO.TO", 95], ["CO.CO", 60], ["CO.VC", 57], ["CO.ST", 53],
    ["CO.NS", 59], /* ["CO.LG", 24], ["CO.CE", 4], ["CO.SU", 21], ["CO.AR", 42], ["CO.VD", 65],
    ["CO.SA", 14], ["CO.NA", 47], ["CO.HU", 15], ["CO.PU", 19], ["CO.CQ", 63], ["CO.ME", 56],
    ["CO.GV", 57], ["CO.GN", 93] */
    ];

    var dataset = { };

    var onlyValues = series.map(function (obj) { return obj[1]; });
    var minValue = Math.min.apply(null, onlyValues),
    maxValue = Math.max.apply(null, onlyValues);

    var paletteScale = d3.scale.linear()
    .domain([minValue, maxValue])
    .range(["#77d05e", "#275d26"]); // color mas oscuro - mas claro

    series.forEach(function (item) { //
        var iso = item[0],
    value = item[1];
    dataset[iso] = {numberOfThings: value, fillColor: paletteScale(value) };
    });

    var map = new Datamap({
        element: document.getElementById('container2'),
    scope: 'col',
    setProjection: function (element) {
            var projection = d3.geo.mercator()
    .center([-68, 4]) // [Longitud, Latitud]
    .scale(1400);
    var path = d3.geo.path().projection(projection);
    return {path: path, projection: projection };
        },
    data: dataset,
    geographyConfig: {
        borderColor: '#DEDEDE',
    highlightBorderWidth: 2,
    highlightFillColor: function (geo) {
                return geo['fillColor'] || '#F5F5F5';
            },
    highlightBorderColor: '#B7B7B7',
    popupTemplate: function (geo, data) {
                if (!data) { return; }
    return ['<div class="hoverinfo">',
        '<strong>', geo.properties.name, '</strong>',
        '<br>Colaboradores: <strong>', data.numberOfThings, '</strong>',
            '</div>'].join('');
            }
        }
    });
/* Mustra los nombres de los departamentos */
/*  map.labels(); */
