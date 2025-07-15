class MakeUser{
  constructor(name,service,date){
  this.name = name
  this.date = date
  this.service = service
  this.id = Date.now();
}} 
//user class object


const clientName = document.querySelector('#clientName');
const serviceType = document.querySelector('#serviceType');
const bookingDate = document.querySelector('#bookingDate');
const addBookingBtn = document.querySelector('#addBookingBtn');
const searchInput = document.querySelector('#searchInput');
const bookingList = document.querySelector('#bookingList');
const count = document.querySelector('#count');
const plural = document.querySelector('#plural');
const clearBtn = document.querySelector('#clearBtn');
const allNavTabs = document.querySelectorAll('.navTabs');
const exportBtn = document.querySelector('#exportBtn');
const dateFilter = document.querySelector('#dateFilter');
const resetDateBtn = document.querySelector('#resetDateBtn');
//DOM variables


let userArray = getUser() || [];
userArray = userArray.sort((a,b) => new Date(a.date) - new Date(b.date)); //Sort by earlier dates
userArray.forEach(element => {
  displayBooking(element);
});
//To display list when page loads

showBookingCount();


//Event Listeners
allNavTabs.forEach(tab => {
  tab.addEventListener('click',() => {

    const tabElement = document.querySelector(`#${tab.dataset.tab}`);
    const navItems = document.querySelectorAll(".navTabs");
    const otherTabs = document.querySelectorAll(".tabContent");


    hideTab(otherTabs);
    displayTab(tabElement);


    navItems.forEach(nav => nav.classList.remove('active'));
    tab.classList.add('active');

  })
});


addBookingBtn.addEventListener('click', e => {
  e.preventDefault();
  const nameValue = clientName.value.trim();
  const serviceValue = serviceType.value.trim();
  const dateValue = bookingDate.value.trim();

  
  if(nameValue && serviceValue && dateValue){
    let user = new MakeUser(nameValue,serviceValue,dateValue);

    if(checkDuplicateEntry(userArray,user)) {
      showToast("duplicate");
      return};
    displayBooking(user);
    userArray.push(user);

    userArray = userArray.sort((a,b) => new Date(a.date) - new Date(b.date)); //sort the array by earlier dates

    saveUser(userArray);
    showBookingCount();
    showToast("success");

  }else{
    alert('Please fill all fields')
    showToast("error");
  }

  clientName.value = "";
  serviceType.value = "Select Service";
  bookingDate.value= "";

});
//for booking button



searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase().trim();

  const filtered = userArray.filter(x => x.name.toLowerCase().includes(value) || x.service.toLowerCase().includes(value));
  //Returns an array matching the value of the search input

  renderList(filtered);
});
//For Search Input


dateFilter.addEventListener('input', () => {
  const selectedDate = dateFilter.value;

  if (!selectedDate) return renderList(userArray);

  const filtered = userArray.filter(x => x.date === selectedDate);
  renderList(filtered);
});


clearBtn.addEventListener('click', () => {
  if(confirm("Are you sure you want to clear all bookings")){
    clearAllBookings();
  }
});

resetDateBtn.addEventListener('click', () => {
  dateFilter.value = "";
  renderList(userArray);
});

exportBtn.addEventListener('click', () => {
  if (userArray.length === 0) {
    alert('No bookings to export.');
    return;
  }

  const csvHeader = "Client Name,Service,Booking Date\n";
  const csvRows = userArray.map(user =>
    `${user.name},${user.service},${user.date}`
  );

  const csvContent = csvHeader + csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "bookings.csv";
  a.click();

  URL.revokeObjectURL(url);
}); //CSV Export functionality



//Functions
function showBookingCount(){
  count.textContent = `${userArray.length}`;
  plural.style.display = (userArray.length > 1 || userArray.length) === 0 ? "inline-block" : "none";

  const emptyMessage = document.querySelector('#emptyMessage');
  emptyMessage.style.display = userArray.length === 0 ? "block" : "none";
}



function displayBooking (x){
  const list = document.createElement('li');
  const delBtn = document.createElement('button');

  delBtn.textContent = "Delete";

  delBtn.addEventListener('click', () => {
    delBooking(list);

    userArray = userArray.filter(item => item.id !== x.id); //Remove the deleted list from the array

    userArray = userArray.sort((a,b) => new Date(a.date) - new Date(b.date)); //sort the array by earlier dates

    saveUser(userArray);
    showBookingCount();
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

function renderList(x){
  displayTab(bookingList);
  bookingList.innerHTML = "";
  x.forEach(element => displayBooking(element));
  
}

function checkDuplicateEntry(x,y){
  const isDuplicate = x.some(u => u.name === y.name && u.service === y.service && u.date === y.date);
  //Check if booking already exists

  if(isDuplicate){
    alert('This Booking Already Exists');
    return true;
  } else{
    return false;
  }
};

function clearAllBookings(){
  bookingList.innerHTML = "";
  userArray.length = 0;
  localStorage.removeItem('User');
  showBookingCount();
};

function displayTab(x){
  x.style.display = "block";
}

function hideTab(x){
  x.forEach(content => {
      content.style.display = "none";
    });
}

function showToast(type) {
  const toast = document.querySelector(`#${type}Toast`);
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
