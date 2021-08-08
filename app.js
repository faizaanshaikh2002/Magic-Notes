console.log("Hello");
showNotes();


let addBtn = document.getElementById("add").addEventListener('click', addNote);
let deleteAll = document.getElementById("deleteAll").addEventListener('click', DeleteAll);
let search = document.getElementById("searchTxt");
search.addEventListener('input', searchNotess);
// console.log(search);

function addNote(e){
    let addTxt = document.getElementById('text');
    let addTitle = document.getElementById('title');
    if(addTitle.value.trim() == "" ) {
        alert(`You cant add note without 'Title'`)
    }
    else if(addTxt.value.trim() == "" ){
        alert("Description field should not be empty")
    }
    else{     
        let notes = localStorage.getItem('Notes')
        if(notes == null){
            notesObj = [];
        }else{
            notesObj = JSON.parse(notes);
        }
        notesObj.push([addTitle.value, addTxt.value])
        console.log(notesObj)
        localStorage.setItem('Notes',JSON.stringify(notesObj));
        addTitle.value = '';
        addTxt.value = '';
        showNotes();
    }
}

function showNotes(e){
    let notes = localStorage.getItem("Notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
                 <div class="notes">
                    <h2>${notesObj[index][0]}</h2>
                    <p>${notesObj[index][1]}</p>
                    <button id=${index} onclick = deleteNote(this.id) class="deleteNoteBtn">Delete Note</button>
                </div>`;
    });
    let notesElm = document.getElementById("notesContainer");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = ""
    }
}

function deleteNote(index){
    let notes =localStorage.getItem("Notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    console.log(notesObj)
    localStorage.setItem('Notes', JSON.stringify(notesObj));
    showNotes()
}

function DeleteAll(){
   let confirmation = confirm("Are you sure! you want to delete all the notes?");
   if(confirmation == true){
       localStorage.clear();
       notesElm = document.getElementById("notesContainer");
       showNotes();
   }
}

function searchNotess(){
    let inputVal = search.value.toUpperCase();
    console.log("Event fired",inputVal)
    let noteCards = document.getElementsByClassName('notes');   
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let cardTxtcaps = cardTxt.toUpperCase();
        let cardTitle = element.getElementsByTagName("h2")[0].innerText;
        let cardTitlecaps = cardTitle.toUpperCase();

        if(cardTitlecaps.includes(inputVal) || cardTxtcaps.includes(inputVal)){
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
}