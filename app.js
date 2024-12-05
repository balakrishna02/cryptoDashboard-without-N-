// url for cyptodata https://api.coingecko.com/api/v3/coins/bitcoin
// url for charts https://api.coingecko.com/api/v3/coins/polkadot/market_chart?vs_currency=inr&days=180


const cryptName = document.querySelectorAll(".currency-name select");
const displayName = document.querySelector(".displayName");

const price = document.querySelector(".price");

const Market_Cap_24Hrs = document.querySelector(".marketCap p");
const ath = document.querySelector(".ath p");
const atl = document.querySelector(".atl p");
const Positive_Sentiments = document.querySelector(".Positive-Sentiments p");
const high_24h = document.querySelector(".high-24 p");
const low_24 = document.querySelector(".low-24 p");

const market_cap = document.querySelector(".market-cap p");
const change_24 = document.querySelector(".change-24 p");
const total_volume = document.querySelector(".total-volume p");
const Circulating_Supply = document.querySelector(".Circulating-Supply p");
const Twitter = document.querySelector(".Twitter-Followers p")

const URL = "https://api.coingecko.com/api/v3/coins/";


for(let select of cryptName){
    select.addEventListener("change", ()=> {
        // console.log(select.value);
        var coinName = select.options[select.selectedIndex].value;
        var text = select.options[select.selectedIndex].text;
        // console.log(value)
        updateChange(coinName)
    })
}


const updateChange = async (coinName) => {
    // console.log(value)

    let BaseURL = `${URL}${coinName}`;
    let response = await fetch(BaseURL);
    let data = await response.json();
    // console.log(data.symbol)
    changeValues(data);

    if(data){

        const chartURL = `https://api.coingecko.com/api/v3/coins/${coinName}/market_chart?vs_currency=inr&days=180`;
        let chartResponse = await fetch(chartURL);
        if (!chartResponse.ok) {
            throw new Error(`HTTP error! status: ${chartResponse.status}`);
        }
        let chartData = await chartResponse.json();
        handleChartData(chartData);
    }
}

const changeValues = (data) => {
    displayName.innerHTML = data.id;
    
    price.innerHTML = "$" + data.market_data.current_price["usd"]; 

    Market_Cap_24Hrs.innerHTML = data.market_data.market_cap_change_percentage_24h + "%";
    ath.innerHTML = data.market_data.ath["usd"];
    atl.innerHTML = data. market_data.atl["usd"];
    Positive_Sentiments.innerHTML = data.market_data.atl["usd"];
    high_24h.innerHTML = data.market_data.high_24h["usd"];
    low_24.innerHTML = data.market_data.low_24h["usd"];
    // console.log(data.market_data.market_cap_change_percentage_24h)

    market_cap.innerHTML = data.market_data.market_cap["usd"];
    change_24.innerHTML = data.market_data.price_change_24h_in_currency["usd"];
    total_volume.innerHTML = data.market_data.total_volume["usd"]; 
    Circulating_Supply.innerHTML = data.market_data["circulating_supply"];
    Twitter.innerHTML = data.community_data.twitter_followers 
}


const handleChartData = (chartData) => {

    
            
    //price
    let mpriData = chartData.prices;

    var options = {
        chart: {
            height: 400,
            width: 600,
            type: 'area'
        },
        grid: {
        show: false
        },
        

        title: {
        text: "Market Price (USD)",
        style: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#00ffea'
            }
        },
        
        stroke: {
            curve: 'smooth',
        },

        series: [{
        name: 'Market price',
        data: mpriData,
        
        }],

        xaxis: {
        type: "datetime"
        }, 

        dataLabels: {
        enabled: false
        },

        yaxis: [{
            show: false,
        }],

    colors: ["#00ffea"],

    tooltip: {
        y: {
            formatter: (value) => { 
            return value.toFixed(2) 
            }
        },
        theme: "dark"
    }
    }
    
    var chart = new ApexCharts(document.querySelector("#chart1"), options);

    chart.render();



    //market cap
    let mCapData = chartData.market_caps
    
        var options = {
            chart: {
                height: 200,
                width: 300,
                type: 'line'
            },
            grid: {
              show: false
            },
            

            title: {
              text: "Market Cap (USD)",
              style: {
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#ff69f5'
                }
            },
            
            stroke: {
                curve: 'smooth',
            },

            series: [{
              name: 'Market Cap',
              data: mCapData,
              
            }],

            xaxis: {
              type: "datetime"
            }, 

            dataLabels: {
              enabled: false
            },

            yaxis: [{
                show: false,
            }],

          colors: ["#ff69f5"],

          tooltip: {
            y: {
                formatter: (value) => { 
                  return value.toFixed(2) 
                }
            },
            theme: "dark"
          }
        }
          
        var chart = new ApexCharts(document.querySelector("#chart2"), options);
          
        chart.render();



    //total_volumes
    let volData = chartData.total_volumes
        var options = {
            chart: {
                height: 200,
                width: 300,
                type: 'line'
            },
            grid: {
                show: false
            },

            title: {
                text: "Market Volume",
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#ffff00'
                }
            },
            
            stroke: {
                curve: 'smooth',
            },

            series: [{
                name: 'Market volume',
                data: volData,
                
            }],

            xaxis: {
                type: "datetime"
            }, 

            dataLabels: {
                enabled: false
            },

            yaxis: [{
                show: false,
            }],

            colors: ["#ffff00"],

            tooltip: {
            y: {
                formatter: (value) => { 
                    return value 
                }
            },
            theme: "dark"
            }
        }
            
        var chart = new ApexCharts(document.querySelector("#chart3"), options);
            
        chart.render();
}