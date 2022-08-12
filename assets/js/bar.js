function bar(dom, data){
    const myChart = echarts.init(dom);
    const xAxisData = data['yearList']
    const current = data['new']
    const graduated = data['graduated']
    const retired = data['retired']
    const status = data['status']
    const option = {
        title: {
            text: 'podlings - status'
        },
        legend: {
        },
        grid:{
            top:'10%',
            left:'10%',
            right:'15%',
            bottom:'10%'

        },
        tooltip:{
            trigger: 'item',
            position:['86%','10%'],
            formatter:(params)=>{
                const year = params.name
                const title = params.seriesName
                const list = status[year][title]
                let str = title + '<br/>'
                list.forEach(el => {
                    str += params.marker + el + '<br>'
                })
                return str
            }
        },
        xAxis: {
            data: xAxisData,
                splitLine: {
                show: false
            }
        },
        yAxis: {},
        series: [
            {
                name: 'new',
                type: 'bar',
                stack:'total',
                data: current,
                emphasis: {
                    focus: 'self'
                },
                animationDelay: function (idx) {
                    return idx * 10;
                }
            },
            {
                name: 'graduated',
                type: 'bar',
                data: graduated,
                stack:'total',
                emphasis: {
                    focus: 'self'
                },
                animationDelay: function (idx) {
                    return idx * 10;
                }
            },
            {
                name: 'retired',
                type: 'bar',
                data: retired,
                stack:'total',
                emphasis: {
                    focus: 'self'
                },
                animationDelay: function (idx) {
                    return idx * 10;
                }
            }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
    };
    myChart.run = function(){
        option && myChart.setOption(option);
    }

    window.onresize = () => {
        myChart.resize()
    }
    
    return myChart
}