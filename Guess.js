// array of selection 
const form = document.getElementById("query-form");

// gallery
const list = document.getElementById("gallery-data");

// array of countries
const countryArray = ["Malaysia","Thailand","Singapore","Vietnam","Hong Kong","Japan","Korea","Taiwan"];

// getting random countries
const chosen = countryArray[Math.floor(Math.random()*countryArray.length)];


// append the content with random countries for 4 times


let optionsGiven = [chosen];

for (let i = 0;  optionsGiven.length <4; i++){
   
    let tagToAdd = chosen;

    while (optionsGiven.includes(tagToAdd))
    {
        tagToAdd = countryArray[Math.floor(Math.random()*countryArray.length)]
    }
    optionsGiven.push(tagToAdd);    

}





 function displayElement(){
    optionsGiven.sort(function() {
        return 0.5 - Math.random(); 
     });

    for (let i=0; i<optionsGiven.length; i++){
        const countryList = document.createElement("p");
        countryList.innerHTML = optionsGiven[i];
        form.appendChild(countryList);
    }

 }


// getTaggedPhotos based on the random country given

getTaggedPhotos (chosen)

displayElement()

const country = document.getElementsByTagName("p");

// trigger answer depending on the country used for gallery data
form.onclick = function(event){

    if (event.target.innerHTML == chosen){
        window.alert("you are right!");
    }
    else window.alert("the answer is wrong!");

    window.location.reload(true);
}




// fetch is similar to visiting the page on your browse, the difference is that it is done via JavaScript code.

function getTaggedPhotos(tagName){

fetch('https://api.tumblr.com/v2/tagged?tag=' +tagName+ '&api_key=Dr2Kc4YrzPhra4TWoqiI0uilSpU5O5NqT7jqs3EAizAbdmrh27')
  .then(function(response){

    // to check if there is any error
    console.log(response);

    if(!response.ok){
        window.alert('something went wrong. Please contact helpdesk at xx@gmail.com')

        return; 
    }

     return response.json(); // convert the raw response into a JSON
    

  })
  .then(function(result){
      if (!result){

        return;
      }
    // console.log(result);  // console log the JSON so we can view it
    
    // clear list
    list.innerHTML ='';
    const items = result.response;

    for(let i =0; i<items.length; i++){
    const item = items[i];
    console.log(items[i]);

    if(item.photos != undefined){
 
    const altSizes = item.photos[0].alt_sizes;

    const imgSrc = altSizes[altSizes.length-2].url;
  
    const img = document.createElement("img");
    img.src = imgSrc;


    const li = document.createElement("li");
    li.appendChild(img);
    // li.innerHTML = imgSrc;
    list.appendChild(li);
    // }
    }
    }
  
    })
    .catch(function(err){
    window.alert('tumblr API is down. Try again later.')
    console.log('message: ', err);
    })
}
