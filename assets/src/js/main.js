class MakeUser{
  constructor(name,service,date){
  this.name = name
  this.date = date
  this.service = service
  this.id = Date.now();
}}
const clientName = document.querySelector('#clientName');
const serviceType = document.querySelector('#serviceType');
const bookingDate = document.querySelector('#bookingDate');
const addBookingBtn = document.querySelector('#addBookingBtn');
const bookingList = document.querySelector('#bookingList');

let userArray = getUser() || [];
userArray = userArray.sort((a,b) => new Date(a.date) - new Date(b.date));
userArray.forEach(element => {
  displayBooking(element);
});

addBookingBtn.addEventListener('click', e => {
  e.preventDefault();
  const nameValue = clientName.value.trim();
  const serviceValue = serviceType.value.trim();
  const dateValue = bookingDate.value.trim();

  
  if(nameValue && serviceValue && dateValue){
    let user = new MakeUser(nameValue,serviceValue,dateValue);
    displayBooking(user);
    userArray.push(user);

    userArray = userArray.sort((a,b) => new Date(a.date) - new Date(b.date)); //sort the array by earlier dates

    saveUser(userArray);
  }else{
    alert('Please fill all fields')
  }
  clientName.value = "";
  serviceType.value = "Select Service";
  bookingDate.value= "";

})

function displayBooking (x){
  const list = document.createElement('li');
  const delBtn = document.createElement('button');

  delBtn.textContent = "Delete";

  delBtn.addEventListener('click', () => {
    delBooking(list);

    userArray = userArray.filter(item => item.id !== x.id); //Remove the deleted list from the array

    userArray = userArray.sort((a,b) => new Date(a.date) - new Date(b.date)); //sort the array by earlier dates

    saveUser(userArray);
  })

  list.textContent = `${x.name} booked ${x.service} on ${x.date}`;

  list.append(delBtn);

  bookingList.append(list);
}

const delBooking = x => {
  x.remove();
}

const saveUser = x => {
  localStorage.setItem('User', JSON.stringify(x));
}

function getUser(){
  return JSON.parse(localStorage.getItem('User'))
}