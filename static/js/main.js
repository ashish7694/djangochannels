// 1st ws url
const groupname = JSON.parse(document.getElementById('gn').textContent)
console.log(groupname);

document.getElementById("10d").onchange = function() {myFunction()};
function myFunction() {
    var x = document.getElementById("10d").value;
    document.getElementById("onchan").innerHTML = "You selected: " + x;
    console.log(a);
}
// var socket = new WebSocket('ws://localhost:8000/ws/graph/');
var socket = new WebSocket('ws://' + window.location.host + '/ws/graph/' + groupname + '/');

socket.onopen = function(){
    console.log('onopen in graph');
    socket.send(1234);
}

// setInterval(function() {
//     if (barsocket.readyState === 1) {
//         console.log('re send data graph');
//         barsocket.send(123456788)
//     }
// }, 5000);

socket.onmessage = function(event){
    var a = JSON.parse(event.data)
    const datapoint = a['gra']
    const name = datapoint.map(
                    function(index){
                        return index.Country;
                    }
                    );
    const age = datapoint.map(
                    function(index){
                        return index.Lon;
                    }
                    );
    graphdata.data.labels = name;
    graphdata.data.datasets[0].data = age;
    myChart.update();
    document.getElementById('graph').innerText = name;
}

socket.onerror= function(){
    console.log('connection js graphonerror');
}

socket.onclose = function(){
    console.log('connection js graphonclose');
}



// 2nd ws url
// var socket = new WebSocket('ws://localhost:8000/ws/graph/');
const vboxgroupname = "manish"
var vboxsocket = new WebSocket('ws://' + window.location.host + '/ws/vbox/' + vboxgroupname + '/');

vboxsocket.onopen = function(){
    console.log('connection open vbox');
    vboxsocket.send(12345678);
}

vboxsocket.onmessage = function(event){
    console.log('vbox on message',event.data);
    document.querySelector('#app').innerText = event.data;
}

vboxsocket.onerror= function(){
    console.log('connection js vboxonerror');
}

vboxsocket.onclose = function(){
    console.log('connection js vboxonclose');
}


// 3nd ws url
var barsocket = new WebSocket('ws://localhost:8000/ws/barbox/');
// const vboxgroupname = "ashish"
// var vboxsocket = new WebSocket('ws://' + window.location.host + '/ws/vbox/' + vboxgroupname + '/');

barsocket.onopen = function(){
    console.log('connection open barbox');
    // setInterval(function() {
    //     if (barsocket.readyState === 3) {
    //         console.log('reconnecting');
    //         var barsocket = new WebSocket('ws://localhost:8000/ws/barbox/');
    //     }
    // }, 1000);
    barsocket.send(123456788)
};
setInterval(function() {
        if (barsocket.readyState === 1) {
            // console.log('re send data barbox');
            barsocket.send(123456788)
        }
    }, 5000);

barsocket.onmessage = function(event){
    document.querySelector('#mobile').innerText = event.data;
};

barsocket.onerror= function(){
    console.log('connection js baronerror');
};

barsocket.onclose = function(){
    console.log('connection js baronclose');
};


// async function fetchapi(){
//     const url = 'https://api.covid19api.com/countries';
//     fetch(url).then((response) =>{
//         console.log('fetch data response json',response)
//         return response.json();
//     }).then((data) =>{
//         console.log('fetch data',data)
//         return data;
//     })
// }




// data fetch from api show labels and value
// function updateChart(){
//     async function fetchdata(){
//         const tdata = {
//             "labels":[{"firstName":"John","age":23},
//             {"firstName":"Anna","age":43},
//             {"firstName":"ram","age":73},
//             {"firstName":"shyam","age":93},
//             {"firstName":"mohan","age":23},
//             {"firstName":"Peter","age":56}
//                 ]
//             }
//         const datapoint = tdata;
//         console.log('fetchdata.....',datapoint);
//         return datapoint;
//     };

//     fetchdata().then(datapoint => {
//         const name = datapoint.labels.map(
//             function(index){
//                 return index.firstName;
//             }
//             );
//         const age = datapoint.labels.map(
//             function(index){
//                 return index.age;
//             }
//             );
//             console.log('month.........',name);
//             console.log('month.........',age);
//             graphdata.data.labels = name;
//             graphdata.data.datasets[0].data = age;
//             myChart.update();
//     });
// }


