
console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = "https://dog.ceo/api/breeds/list/all"
const breedArray = []
document.addEventListener("DOMContentLoaded", main)
function main(){
    const ul = document.getElementById("dog-breeds")
    document.getElementById("breed-dropdown").addEventListener("change",function(){
        console.log("anything")
        selectByFirstLetter()
    })


    function getDogImages(url) {
        fetch(url) .then(resp => resp.json())
        .then(function(json) { console.log(json)
        let div = document.getElementById("dog-image-container")
        let images = json.message
        images.forEach(function(image) {
            let img = document.createElement("img");
            img.setAttribute("src",image);
            div.appendChild(img);
        })
    })
    }

    function getDogBreeds(url) {
        fetch(url)
        .then(resp => resp.json())
        .then(function(json) { console.log(json)
            let links = json.message;
            for(const key in links) {
                if (links[key].length === 0){
                    breedArray.push(`${key}`)
                    } else {
                    links[key].forEach(function(prefix){
                        breedArray.push(`${prefix} ${key}`);
                })}

            }
            selectByFirstLetter()
        })
    }

    function selectByFirstLetter() {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        drop_index = document.getElementById("breed-dropdown").value
        console.log(drop_index)
        let filteredArray = breedArray
        if (drop_index != "none") {
            filteredArray = breedArray.filter(function(word){
            return word.split('')[0] === drop_index
            })
        }
        console.log(filteredArray)
        filteredArray.forEach(function(breed){
            let li = document.createElement('li')
            li.innerText = breed
            li.addEventListener("click", function(e){
                console.log("The click is working")
                li.style.color = "#" + randomColor() 
            })
            ul.appendChild(li)
            
        })    
    }
    function randomColor() {
        return Math.floor(Math.random()*16777215).toString(16);
    }

    getDogImages(imgUrl)
    getDogBreeds(breedUrl)
}
