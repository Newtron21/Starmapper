const astronomyAuthString = btoa(`${"32d837ef-625e-4b2d-8c13-596f6eb6bde7"}:${"acaf3f84f656033f32b1704c9520ef426455c6f8253ebfc6a5faf58da5c0284ef74af676df0d420af538a1f1e816b0327145896c2f4c1f3baf87a25bc3dd5b608914c9c954a80a26d719b1a59f67fb0360cf804733c8911619be7198b1e6784e967bc084a2699dd837c268406ec08d28"}`);
var latitude=latitude
var longitude=longitude
var date=date
var starImage=document.querySelector('#starImage');
//have variable that contains current date
var currentDay = dayjs().format('YYYY-MM-DD');
$('#currentDay').text(currentDay);
//Jeremy to change the time/day format
console.log(currentDay);
var starImageLocation = $('#starImage');
var submitBtn =$('#submitButton'); 
var userInput =$('.userInput');
var savedSearches = $('.savedSearches');
var pictureArea = $('.pictureArea');
var pictureHolder= document.querySelector(".pictureHolder");
var loading= document.querySelector(".loading");
var starAPI = "https://api.astronomyapi.com/api/v2/studio/star-chart";
var mapAPI = 'https://www.mapquestapi.com/geocoding/v1/address?key=49BbAeOOhO1SiFEnupI0fPbbOYGHec2k';
var storageSave=[];
var starArray = ["and", "ant", "aps", "aqr", "aql", "ara", "ari", "aur", "boo", "cae", "cam", "cnc", "cvn", "cma", "cmi", "cap", "cas", "cen", "cep", "cet", "cha", "cir", "col", "com", "cra", "crt", "cru", "cyg", "del", "dor", "dra", "equ", "eri", "for", "gem", "gru", "her", "hor", "hya", "lac", "leo", "lib", "lup", "lyn", "lyr", "men", "mic", "mon", "mus", "nor", "oct", "oph", "ori", "pav", "peg", "per", "phe", "pis", "pic", "psc", "psa", "pup", "pyx", "ret", "sge", "sgr", "sco", "sct", "sex", "tau", "tel", "tra", "tri", "tuc", "uma", "umi", "vel", "vir", "vol", "Vul"];
var starRandom=[];
var inputLocation=document.querySelector(".inputLocation")

function getSearches() {
     //check if our storage array exists first
     if (!localStorage.getItem("savedStorage")) {
        localStorage.setItem("savedStorage", JSON.stringify(storageSave));
    } else {
        //adding something to end of array
        storageSave=JSON.parse(localStorage.getItem("savedStorage"));
    }
    var displaySearches = "";
    for (let i=0; i<storageSave.length; i++) {
        displaySearches +="<li>" + storageSave[i] + "</li>";
    }
    console.log(displaySearches);
    savedSearches.append(displaySearches);
    $("li").attr("class", "listItems");
}

getSearches();
//TASK TO DO FIRST SUBMIT

//event listener to listen for submit
submitBtn.on("click", function(event){
    event.preventDefault();
    var userInfo=userInput.val();
    //TASK 2 saving and rendering info
    //save submit info into local storage and render them underneath submit bar
    //make sure it saves to page when page is refreshed
    storageSave[0]=userInfo;
    //check if our storage array exists first
    if (!localStorage.getItem("savedStorage")) {
        localStorage.setItem("savedStorage", JSON.stringify(storageSave));
    } else {
        //adding something to end of array
        storageSave=JSON.parse(localStorage.getItem("savedStorage"));
        storageSave.push(userInfo);
        localStorage.setItem("savedStorage", JSON.stringify(storageSave));
    }
    var displaySearches = "";
    for (let i=0; i<storageSave.length; i++) {
        displaySearches +="<li>" + storageSave[i] + "</li>";
    }
    console.log(displaySearches);
    $(".listItems").remove();
    savedSearches.append(displaySearches);
    $("li").attr("class", "listItems");
    pictureHolder.setAttribute("style", "display:block");

    starImage.setAttribute("src", "./Assets/Image/loading-orange.gif");

       
    function randomNumber(){
        var randomNumber=Math.floor(Math.random()*starArray.length);
        starRandom=starArray[randomNumber]
    }
    randomNumber()



    
    //TASK 3 fetch request through mapquest with said variables 
    //take variable run through mapquest fetch 
    // fetch first time through mapquest
    //put in location/city and get out lat and long
    function getAPI() {
        var APIUrl = 'https://www.mapquestapi.com/geocoding/v1/address?key=49BbAeOOhO1SiFEnupI0fPbbOYGHec2k&location=' + userInfo;

        fetch(APIUrl)
            .then(function (response) {
            console.log(response.status)
            return response.json();
            })
            .then(function (data) {
                console.log(data)
                var latitude = data.results[0].locations[0].displayLatLng.lat
                var longitude = data.results[0].locations[0].displayLatLng.lng
                console.log(latitude, longitude)
                inputLocation.textContent="coordinates: "+latitude+", "+longitude
                //next fetch
                repData.observer.latitude = latitude;
                repData.observer.longitude = longitude;
                
                repData.view.parameters.constellation = starRandom;
                //this works!!!!!
fetch("https://api.astronomyapi.com/api/v2/studio/star-chart", {
    method: "POST",
    body: JSON.stringify(repData),
    headers: {
        Authorization: `Basic ${astronomyAuthString}` 
}})
.then(function (response) {
    console.log(response.status)
    return response.json();
})
.then(function (data) {
    let pictureLink;
    console.log(data);
    pictureLink = data;
    pictureLink = pictureLink.data.imageUrl;
    console.log(pictureLink);

    starImage.setAttribute("src", pictureLink);
    
    loading.setAttribute("style", "display:none");
})

            }
                )

            }
    
        
       getAPI();
    })
//---when submit insert loading bar 
//take submit info turn into variable

 


 
//creates new variable that contains latitude and longitude
//var latitude=latitude
//var longitude=longitude
//---we might have to change lat and long into string so the variable pulls correctly from next fetch

//task 4 
//take variables and put it in next fetch
//fetch for second 
//that gives information which we load on page
//creates variable 
//var starImage=returned star image
const repData = {
    observer: {
        date: currentDay,
        latitude: 33.775867,
        longitude: -84.39733
    },
    style: "navy",
    view: {
        type: "constellation",
        parameters: {
            constellation: "ori"
            //put an array of all constellations 
            //randomize them 
        }
    }
}

const repDataArea = {
    observer: {
        date: currentDay,
        latitude: 40.665907,
        longitude: -111.912589
    },
    //is this needed?
    //style: "navy",
    view: {
        type: "area",
        parameters: {
            position: {
                equatorial: {
                    rightAscension: 21.33,
                    declination: 40.665907
                }
            },
            //optional, gives the zoom level of the image
            zoom: 5
        }
    }
}



//TASK 5 
//get rid of "hidden" on image class to show image
//put image into page in specific spot 


//--when this fetch comes back turn off loading bar and replace with image 

//---once this is done take variables from above and put them into storage and render them underneath submit bar

//---fetch 3, 4 , 5 places and put underneath the large image
//---also render information in 3 other places in columns 