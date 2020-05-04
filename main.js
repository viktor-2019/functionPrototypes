'use strict';

// the base class Being ('істота');
function Being(name,  age) {
  this.name = name;
  this. age = age;  
}

// it's additional class for gender
function Sex(gender) {
  this.gender = gender; 
}

// class NaVi extends Being and Sex
function NaVi(name, skin, age, language, gender) {
  Being.call(this, name, age);
  Sex.call(this, gender);
  this.skin = skin;
  this.tail = true;
  this.language = language;
  this.image = `./img/${this.name}.jpeg`;  
}


// class Human also extends Being and Sex
function Human(name, lastName, age, language, gender) {
  Being.call(this, name, age);
  Sex.call(this, gender);
  this.lastName = lastName;
  this.language = language;
  this.image = `./img/${this.name}.jpeg`; 
}

// class HumanNavi extends NaVi and Human
function HumanNaVi(name, lastName, age, language, skin, gender) {
  NaVi.apply(this, [, skin]);
  Human.call(this, name, lastName, age, language, gender); 
}


// Using: 
// make some list of heroes
let mihel = new Human('Trudy', 'Chackon', 25, 'english', 'female');
let zosya = new NaVi('Neitiry', 'blue', 18, "na'vi", 'female');
let pupkin = new HumanNaVi('Vasya', 'Pupkin', 25, ['english', "na'vi"], 'lightblue', 'male');
let siguri = new HumanNaVi('Grase', 'Ogustin', 34, ['english', "na'vi"], 'blue','female');
let persons = [mihel, zosya, siguri, pupkin];

// array of their features
let order = ['name', 'lastName', 'age', 'gender', 'language', 'skin', 'tail'];

function handleShow(event) {
  let btn = event.target.closest('button');  
  let btnWidth = btn.clientWidth ;
  let sh = document.createElement('div');
  sh.style.width = btnWidth + 'px';
  let ul = document.createElement('ul');
  let pers, img;
  for (let person of persons ) {
    if (person.name === btn.id) {  
      img = btn.previousSibling;
      pers = person.constructor.name;  
        for (let key of order) {
          if(!Object.keys(person).includes(key)) continue;
          let camelKey = key.charAt(0).toUpperCase() + key.slice(1);
          let li = document.createElement('li');
          li.innerHTML=`${camelKey}: ${person[key]}`;
          li.classList.add('li');
          ul.append(li);
        }   
    let kind = document.createElement('li');
    kind.innerHTML=`${pers}`;
    kind.classList.add('title');
    ul.prepend(kind);
    sh.append(ul);
    sh.classList.add('div-btn');
    btn.classList.add('none');
    img.after(sh); 
    sh.addEventListener('click', (event) => {
      btn.classList.remove('none');
      sh.classList.add('none');
    }) 
    }
  }
}

let container = document.querySelector('.root');

for (let person of persons) {
  let row = document.createElement('div');
  row.classList.add('row');
  let img = document.createElement('img');
  img.classList.add('img');
  img.setAttribute('src', person.image);
  let btn = document.createElement('button');
  btn.classList.add('button');
  btn.setAttribute('type', 'button');
  btn.setAttribute('id', person.name);
  btn.innerHTML = '<b> SHOW </b>';
  container.append(row);
  row.append(img, btn);
  btn.addEventListener('click', handleShow);
}