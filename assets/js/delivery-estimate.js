//get the user's location with some new API
var botNameEl = document.getElementById('botName')
var botPriceEl = document.getElementById('botPrice')
var totalCostEl = document.getElementById('totalCost')
var loadingEl = document.getElementById('loading')

var params = new URLSearchParams(window.location.search)
var botName = params.get('botName')
var botPrice = params.get('botPrice')
console.log(botName, botPrice)

//shipping fee
var shippingFee = 0.5

//Boston Coords
var factoryCoordinates = {
    lat: 42.358990,
    lon: -71.058632,
}

function getDistanceFromFactory(position){
    var userLat = position.coords.latitude
    var userLon = position.coords.longitude
    
    // // dJzOtS3hQyYkUf7qXVAPqP7OumDwI
    // FfjlQNSycwguu8hTigfcqloxlIRYU
    fetch('https://api.distancematrix.ai/maps/api/distancematrix/json?origins=' +factoryCoordinates.lat + ',' + factoryCoordinates.lon + '&destinations=' + userLat + ','+ userLon +'&key=FfjlQNSycwguu8hTigfcqloxlIRYU&units=imperial').then(function(response){
        console.log(response)
        return response.json()
    }).then(function(data){
        console.log(data)
        //var distance = parseFloat(data.rows[0].elements[0].distance.text.split(' ')[0])
        //var total = calculateShipping(distance)
        //console.log(total)
        //displayTotals(total)

        
    }).catch(function(error){
        console.log(error)
    }).finally(function(){
        loadingEl.classList.remove('d-flex')
        loadingEl.classList.add('d-none')
    })
}

function calculateShipping(distance){
    //console.log(distance * shippingFee)
    return (distance * shippingFee) + JSON.parse(botPrice)
}

function displayTotals(total){
    botNameEl.innerText = botName
    botPriceEl.innerText = "Base Price $" + botPrice
    totalCostEl.innerText = "$" + Math.ceil(total)

}
//check if supported
if(navigator.geolocation){

    function success(position){
        getDistanceFromFactory(position)

    }

    navigator.geolocation.getCurrentPosition(success, function(){
        console.log('Error with goelocation')
    })
} else {
    console.log("sorry, no geolocation")
}

//get the distance