let wrapper = document.querySelector(".wrapper");
let searchInput = wrapper.querySelector("input");
let synonyms = wrapper.querySelector(".synonyms .list");
let infoText = wrapper.querySelector(".info-text");
let VolumeIcon = wrapper.querySelector(".word i");
let removeIcon = wrapper.querySelector(".search span");


//data function
function data(result, word){
    if(result.title){
        infoText.style.color = "#000000";
        infoText.innerHTML = `Sorry pal, Can't find the meaning of  <span style="font-weight: 500; color:red;">"${word}"</span>. You can try the searching a valid word.`;
    }else{
        console.log(result);
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0];
        let vick = result[0].meanings[0].synonyms;
        phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0]?.text || ''} /`;

        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics || "";
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example || "";
        
       
       
        synonyms.innerHTML = "";

        for (let i = 0; i < 5; i++) {
            let tag = `<span>${vick[i] || ""}</span>`;
            synonyms.insertAdjacentHTML("beforeend", tag);
        }
    
    }
    

}

function search(word){
    searchInput.value = word;
    fetchApi(word);
}
    
// fectch api fuction
function fetchApi(word) {
    infoText.innerHTML = `Searching the meaning of <span style="font-weight: 500; color:#0769c5;">"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url)
        .then(res => res.json())
        .then(result => {
            data(result, word);
            initializeAudio(result);
        });
}

function initializeAudio(result) {
    let audio = new Audio();

    if (result[0]?.phonetics[0]?.audio) {
        audio.src = "https:" + result[0].phonetics[0].audio;

        VolumeIcon.addEventListener("click", () => {
            audio.play().catch(error => {
                console.error("Error playing audio:", error.message);
            });
        });
    } else {
        console.error("Audio URL is missing or invalid.");
    }
}

searchInput.addEventListener("keyup", e=>{
    if(e.key === "Enter" && e.target.value){
        fetchApi(e.target.value);
    }
    

});

// let audio = new Audio();

// if (result[0]?.phonetics[0]?.audio) {
//     audio.src = "https:" + result[0].phonetics[0].audio;

//     VolumeIcon.addEventListener("click", () => {
//         audio.play().catch(error => {
//             console.error("Error playing audio:", error.message);
//         });
//     });
// } else {
//     console.error("Audio URL is missing or invalid.");
// }


removeIcon.addEventListener ("click", () =>{
    searchInput.value = "";
    searchInput.focus();
});