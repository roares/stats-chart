function dynamicbar(dom, data){
    let myChart = echarts.init(dom);
    const updateFrequency = 5000;
    const years = Object.keys(data);
    const startYear = years[0]
    const lastYear = 2022
    const yAxisMax = 20
    let year = years[0]
    const option = {
        title:{
            text:'Dynamic sorting at committee scale',
            left:40,
            top:20,
        },
        grid: {
            left: 40,
            top:'10%',
            bottom: '5%',
            right: '5%',
            containLabel: true
        },
        xAxis: {
            axisLabel: {
                formatter: function (n) {
                    return Math.round(n) + '';
                }
            },
        },
        yAxis: {
            type: 'category',
            inverse: true,
            data:data[year].yAxis,
            animationDuration: 300,
            animationDurationUpdate: 300
        },
        series: [{
            realtimeSort: true,
            seriesLayoutBy: 'column',
            type: 'bar',
            encode: {
                x: 3,
                y: 2
            },
            label: {
                show: true,
                precision: 1,
                position: 'right',
                valueAnimation: true,
                fontFamily: 'monospace',
                formatter: function (n) {
                    return Math.round(n.value);
                }
            },
            data:data[year].value
        }],
        animationDuration: 0,
        animationDurationUpdate: updateFrequency,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        graphic: {
            elements: [{
                type: 'text',
                right: 160,
                bottom: 60,
                style: {
                    text: year,
                    font: 'bolder 80px monospace',
                    fill: 'rgba(100, 100, 100, 0.25)'
                },
                z: 100
            }]
        }
    };
    myChart.run = function run() {
        option.yAxis.data = data[year].yAxis
        option.yAxis.max = data[year].yAxis.length > yAxisMax? yAxisMax:data[year].yAxis.length
        option.series[0].data = data[year].value;
        option.graphic.elements[0].style.text = year;
        if(year == startYear){
            myChart.clear()
            myChart= echarts.init(dom);
        }
        myChart.setOption(option);
        year = year == lastYear ? startYear :(year - 0 )+ 1 
    }


    return myChart
}