const astronomyAuthString = btoa(`${"32d837ef-625e-4b2d-8c13-596f6eb6bde7"}:${"acaf3f84f656033f32b1704c9520ef426455c6f8253ebfc6a5faf58da5c0284ef74af676df0d420af538a1f1e816b0327145896c2f4c1f3baf87a25bc3dd5b608914c9c954a80a26d719b1a59f67fb0360cf804733c8911619be7198b1e6784e967bc084a2699dd837c268406ec08d28"}`);
//var latitude=latitude
//var longitude=longitude
//var date=date
//var starImage=returned star image




//TASK TO DO FIRST SUBMIT
//have variable that contains current date
//var date=date
//event listener to listen for submit
//---when submit insert loading bar 
//take submit info turn into variable


//TASK 2 saving and rendering info
//save submit info into local storage and render them underneath submit bar
//make sure it saves to page when page is refreshed 

//TASK 3 fetch request through mapquest with said variables 
//take variable run through mapquest fetch 
// fetch first time through mapquest 
//put in location/city and get out lat and long
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
        date:"2023-07-25",
        latitude: 33.775867,
        longitude: -84.39733
    },
    style: "navy",
    view: {
        type: "constellation",
        parameters: {
            constellation: "ori"
        }
    }
}

const repDataArea = {
    observer: {
        date:"2023-07-25",
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
    
})
//TASK 5 
//get rid of "hidden" on image class to show image
//put image into page in specific spot 


//--when this fetch comes back turn off loading bar and replace with image 

//---once this is done take variables from above and put them into storage and render them underneath submit bar

//---fetch 3, 4 , 5 places and put underneath the large image
//---also render information in 3 other places in columns 