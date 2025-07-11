function MakeUser(name,service,date){
  this.name = name
  this.date = date
  this.service = service
}
const clientName = document.querySelector('#clientName');
const serviceType = document.querySelector('#serviceType');
const bookingDate = document.querySelector('#bookingDate');
const addBookingBtn = document.querySelector('#addBookingBtn');
const bookingList = document.querySelector('#bookingList');

addBookingBtn.addEventListener('click', e => {
  e.preventDefault();
  const nameValue = clientName.value;
  const serviceValue = serviceType.value;
  const dateValue = bookingDate.value;

})