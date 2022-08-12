function boxplot(dom, _rawData){
    const myChart = echarts.init(dom)
    const option = {
        dataset: [
        {
            id: 'raw',
            source: _rawData
        },
        {
            id: 'size_aggregate',
            fromDatasetId: 'raw',
            transform: [
            {
                type: 'ecSimpleTransform:aggregate',
                config: {
                    resultDimensions: [
                        { name: 'min', from: 'total', method: 'min' },
                        { name: 'Q1', from: 'total', method: 'Q1' },
                        { name: 'median', from: 'total', method: 'median' },
                        { name: 'Q3', from: 'total', method: 'Q3' },
                        { name: 'max', from: 'total', method: 'max' },
                        { name: 'year', from: 'year' }
                    ],
                    groupBy: 'year'
                }
            },
            {
                type: 'sort',
                config: {
                    dimension: 'year',
                    order: 'desc'
                }
            }]
        }
        ],
        title: {
            text: "Distribution of the number of the PMC members",
            left:40,
            top:20,
        },
        tooltip: {
            trigger: 'axis',
            confine: true
        },
        xAxis: {
            name: 'Size',
            nameLocation: 'middle',
            nameGap: 30,
            scale: true
        },
        yAxis: {
            type: 'category'
        },
        grid: {
            left: 40,
            top:'10%',
            bottom: '5%',
            right: '10%',
            containLabel: true
        },
        legend: {
            selected: { detail: false }
        },
        series: [
        {
            name: 'boxplot',
            type: 'boxplot',
            datasetId: 'size_aggregate',
            itemStyle: {
                color: '#b8c5f2'
            },
            encode: {
                x: ['min', 'Q1', 'median', 'Q3', 'max'],
                y: 'year',
                itemName: ['year'],
                tooltip: ['min', 'Q1', 'median', 'Q3', 'max']
            }
        },
        {
            name: 'detail',
            type: 'scatter',
            datasetId: 'raw',
            symbolSize: 6,
            tooltip: {
                trigger: 'item'
            },
            label: {
                show: true,
                position: 'top',
                align: 'left',
                verticalAlign: 'middle',
                rotate: 90,
                fontSize: 12
            },
            itemStyle: {
                color: '#d00000'
            },
            encode: {
                x: 'total',
                y: 'year',
                label: 'committee',
                itemName: 'Committee',
                tooltip: ['year', 'committee', 'size']
            }
        }]
    };
    myChart.run = function(){
        option && myChart.setOption(option);
    }
    return myChart
}