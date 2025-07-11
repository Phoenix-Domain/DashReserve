class MakeUser{
  constructor(name,service,date){
  this.name = name
  this.date = date
  this.service = service
}}
const clientName = document.querySelector('#clientName');
const serviceType = document.querySelector('#serviceType');
const bookingDate = document.querySelector('#bookingDate');
const addBookingBtn = document.querySelector('#addBookingBtn');
const bookingList = document.querySelector('#bookingList');
let userArray = [];

addBookingBtn.addEventListener('click', e => {
  e.preventDefault();
  const nameValue = clientName.value.trim();
  const serviceValue = serviceType.value.trim();
  const dateValue = bookingDate.value.trim();

  
  if(nameValue && serviceValue && dateValue){
    let user = new MakeUser(nameValue,serviceValue,dateValue);
    displayBooking(user);
    userArray.push(user);
    console.log(userArray)
  }else{
    alert('Please fill all fields')
  }
})

const displayBooking = x => {
  const list = document.createElement('li');
  const delBtn = document.createElement('button');
  delBtn.textContent = "Delete";
  delBtn.addEventListener('click', () => {
    delBooking(list);
    userArray = userArray.filter(item => item !== x);
  })
  list.textContent = `${x.name} booked ${x.service} on ${x.date}`;
  list.append(delBtn)
  bookingList.append(list);
}

const delBooking = x => {
  x.remove();
}