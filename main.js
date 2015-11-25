$(function() {

var categories = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

var data = [{"time":1447142400000,"speed":5,"dir":37},{"time":1447143000000,"speed":4,"dir":34},{"time":1447143600000,"speed":4,"dir":30},{"time":1447144200000,"speed":3,"dir":35},{"time":1447144800000,"speed":3,"dir":357},{"time":1447145400000,"speed":3,"dir":359},{"time":1447146000000,"speed":3,"dir":25},{"time":1447146600000,"speed":3,"dir":42},{"time":1447147200000,"speed":3,"dir":37},{"time":1447147800000,"speed":2,"dir":37},{"time":1447148400000,"speed":3,"dir":225},{"time":1447149000000,"speed":4,"dir":62},{"time":1447149600000,"speed":1,"dir":280},{"time":1447150200000,"speed":4,"dir":240},{"time":1447150800000,"speed":1,"dir":239},{"time":1447151400000,"speed":3,"dir":309},{"time":1447152000000,"speed":3,"dir":273},{"time":1447152600000,"speed":1,"dir":110},{"time":1447153200000,"speed":4,"dir":359},{"time":1447153800000,"speed":4,"dir":23},{"time":1447154400000,"speed":2,"dir":336},{"time":1447155000000,"speed":2,"dir":30},{"time":1447155600000,"speed":1,"dir":264},{"time":1447156200000,"speed":2,"dir":243},{"time":1447156800000,"speed":2,"dir":0},{"time":1447157400000,"speed":0,"dir":0},{"time":1447158000000,"speed":2,"dir":79},{"time":1447158600000,"speed":0,"dir":318},{"time":1447159200000,"speed":0,"dir":318},{"time":1447159800000,"speed":1,"dir":319},{"time":1447160400000,"speed":3,"dir":27},{"time":1447161000000,"speed":1,"dir":322},{"time":1447161600000,"speed":0,"dir":56},{"time":1447162200000,"speed":0,"dir":56},{"time":1447162800000,"speed":2,"dir":56},{"time":1447163400000,"speed":3,"dir":37},{"time":1447164000000,"speed":1,"dir":27},{"time":1447164600000,"speed":4,"dir":32},{"time":1447165200000,"speed":3,"dir":338},{"time":1447165800000,"speed":2,"dir":321},{"time":1447166400000,"speed":0,"dir":321},{"time":1447167000000,"speed":1,"dir":352},{"time":1447167600000,"speed":2,"dir":352},{"time":1447168200000,"speed":2,"dir":329},{"time":1447168800000,"speed":2,"dir":311},{"time":1447169400000,"speed":5,"dir":346},{"time":1447170000000,"speed":1,"dir":20},{"time":1447170600000,"speed":0,"dir":20},{"time":1447171200000,"speed":1,"dir":20},{"time":1447171800000,"speed":2,"dir":311},{"time":1447172400000,"speed":1,"dir":269},{"time":1447173000000,"speed":0,"dir":269},{"time":1447173600000,"speed":2,"dir":245},{"time":1447174200000,"speed":2,"dir":195},{"time":1447174800000,"speed":0,"dir":183},{"time":1447175400000,"speed":0,"dir":183},{"time":1447176000000,"speed":1,"dir":181},{"time":1447176600000,"speed":2,"dir":179},{"time":1447177200000,"speed":0,"dir":179},{"time":1447177800000,"speed":0,"dir":177},{"time":1447178400000,"speed":3,"dir":180},{"time":1447179000000,"speed":2,"dir":208},{"time":1447179600000,"speed":1,"dir":217},{"time":1447180200000,"speed":0,"dir":210},{"time":1447180800000,"speed":2,"dir":224},{"time":1447181400000,"speed":2,"dir":207},{"time":1447182000000,"speed":2,"dir":222},{"time":1447182600000,"speed":4,"dir":214},{"time":1447183200000,"speed":4,"dir":233}];

/* YOUR JOB IS TO FLUSH OUT THIS FUNCTION */
var windRoseSeries = function(data){
    
    var series = [
                    { name: "1-3 mph", data: []},
                    { name: "4-6 mph", data: []}
                 ];

    // Filter out 0 speeds
    var myData = _.filter(data, function(num){ return num.speed !== 0; });

    // Sort the speeds for slowest first
    var myData = _.sortBy(myData, function(num){ return num.speed });

    // group into groups less than four and above 4  
    var myData = _.groupBy(myData, function(num){ return num.speed < 4 });

    // group the two results
    for(var x in myData){
        //  360/16 = 22.5 , add 0.5 for correct values , mod 16 for grouping
        myData[x] = _.groupBy(myData[x], function(num){ return (Math.floor((num.dir / 22.5)+0.5)) % 16 });
    }

    //convert to Array
    myData = _.toArray(myData);

    //  place into Cardinal Directions
    //  x = Cardinal Direction 
    for(var x = 0; x < 16; x++){
        for(var i = 0; i < myData.length; i++){
            console.log(myData[i][x])
            if(!myData[i][x] || typeof myData[i][x] === undefined){
                series[i].data[x] = 0;
            }
            else{
                series[i].data[x] = Object.keys(myData[i][x]).length;
            }
        }
    }

    return series;
}

/*No need to touch anything below here*/

$('#container').highcharts({
        series: windRoseSeries(data),
        chart: {
            polar: true,
            type: 'column'
        },
        title: {
            text: "Wind Rose"
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 100,
            layout: 'vertical'
        },
        xAxis: {
            tickmarkPlacement: 'on',
            categories: categories
        },
        yAxis: {
            min: 0,
            endOnTick: false,
            showLastLabel: true,
            title: { text: 'Frequency (%)' },
            reversedStacks: false
        },
        tooltip: { valueSuffix: '%' },
        plotOptions: {
            series: {
                stacking: 'normal',
                shadow: false,
                groupPadding: 0,
                pointPlacement: 'on'
            }
        }
    });
});
