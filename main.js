    
let taksCreateElement= document.querySelector('.right')

let notesListRootElement= document.querySelector('.notesList')
let rootContentElement=document.querySelector('.contents')

let editExistingElement=document.querySelector('.editTheContent')

 
let notes = []
function renderElementsToScreen(){
  


if (localStorage.getItem('notes')) {
  
  notes = JSON.parse(localStorage.getItem('notes'));

  // Ensure that notes is an array before using forEach
  if (Array.isArray(notes)) {
      notes.forEach(note => {
        renderSaveElements(note, note.uniquID);
      });
  } 
}
} 

let newTaskButton = document.querySelector('#note')
newTaskButton.addEventListener('click',()=>{
  renderNoteElement();
  if(document.querySelector('.img').style.display === 'block'){
    document.querySelector('.img').style.display = 'block'
    document.querySelector('.createNotes').style.display = 'none'
     editExistingElement.style.display='none'
  }else{
    document.querySelector('.img').style.display = 'none'
    document.querySelector('.createNotes').style.display = 'none'
    // renderNoteElement()
  }
})

function renderNoteElement(){
  let mainDiv= document.createElement('div')
  mainDiv.className='createNote'
  let input=document.createElement('input')
  input.id = 'createNoteTitle'
  input.placeholder= 'Note Title'    
  let textArea=document.createElement('textarea')
  textArea.placeholder ='Note Description'
  textArea.rows =10;
  textArea.cols = 20;
  textArea.id ='createNoteContent'

  let divButton =document.createElement('button')
  divButton.className ='buttoncreate'
  divButton.innerText ='Create Note'

  divButton.addEventListener('click', ()=>{
    let uniquID ='note' + Math.floor(Math.random()*1000)
let note ={
  title: input.value,
  content: textArea.value
  
  
}

mainDiv.style.display = 'none';
divButton.style.display = 'none';
   addNoteToLocalStorage(note, uniquID)
   renderSaveElements(note, uniquID);
   
  })
 

  mainDiv.appendChild(input)
  mainDiv.appendChild(textArea)
  taksCreateElement.append(mainDiv)
  taksCreateElement.append(divButton)
  
}

function renderSaveElements(note, uniquID){

  let noteDiv=document.createElement('div')
  noteDiv.className ='content' 
  noteDiv.classList.add('note', uniquID)
  noteDiv.style.cursor='Pointer'
  let noteTitle=document.createElement('h4')
  let noteContent=document.createElement('p')
  noteTitle.innerText = note.title;
  noteContent.innerText = note.content;
  

  noteDiv.appendChild(noteTitle)
  noteDiv.appendChild(noteContent)
  rootContentElement.append(noteDiv)


  noteDiv.addEventListener('click',()=>{
    let editTitle=document.querySelector('#editstitle')
  let editContent=document.querySelector('#editscontent')
  editExistingElement.style.display='block'
  document.querySelector('.img').style.display = 'none'
  document.querySelector('.createNotes').style.display = 'none'
  
  editTitle.innerText=note.title
  editContent.innerText =note.content
    
  })
}
function addNoteToLocalStorage(note, uniquID){
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  let newNote = {
    title: note.title,
    content: note.content,
    uniquID: uniquID
  };


  notes.push(newNote)
  localStorage.setItem('notes', JSON.stringify(notes));
}

renderElementsToScreen()

let editTaskButton=document.querySelector('.editButton')

editTaskButton.addEventListener('click', ()=>{
  console.log('c')

let overlaydiv=document.createElement('div')
overlaydiv.id='overlay'
let popmainDiv=document.createElement('div')
popmainDiv.id='popup'
let popinnertext =document.createElement('input')
popinnertext.placeholder='Task Name'
popinnertext.className='poptext'
let popButton=document.createElement('button')
popButton.id='popbutton'
popButton.innerText='Create Task'

popmainDiv.appendChild(popinnertext)
popmainDiv.appendChild(popButton)
overlaydiv.appendChild(popmainDiv)
document.body.append(overlaydiv)

popButton.addEventListener('click', ()=>{
  

popButton.addEventListener('click', () => {
  popmainDiv.remove();
  overlaydiv.remove();
  editExistingElement.style.display = 'block';

  let existingContentDiv = document.querySelector('.content.note');
  let editTitle = document.querySelector('#editstitle');
  let editContent = document.querySelector('#editscontent');
  editTitle.innerText = existingContentDiv.querySelector('h4').innerText; 
  editContent.innerText = existingContentDiv.querySelector('p').innerText; 

  document.querySelector('#formintro').style.display='block'
  


  editContent.append(taskheading);
  
});


})

})

let deleteButton =document.querySelector('.deleteButton')

deleteButton.addEventListener('click', ()=>{
  console.log('a')
  document.querySelector('.contents').remove()
  
  notes = JSON.parse(localStorage.getItem('notes'))

  let index = notes.findIndex(note=> note.uniquId == note)

  notes.splice(index, 1)
  
  localStorage.setItem('notes', JSON.stringify(notes));
  // renderNoteElement()
})
