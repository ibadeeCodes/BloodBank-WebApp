// Login Modal

$(document).ready(function () {
  $(".modal").modal();
});

// getting classes and ids

const donatebtn = document.querySelector(".hidden_btn1");
const signoutbtn = document.querySelector(".hidden_btn2");
const signinbtn = document.querySelector(".shown_btn1");
const signupbtn = document.querySelector(".shown_btn2");
const donor_details = document.querySelector('#donor_details');
const yes = document.querySelector('.yes');
const no = document.querySelector('.no');
const create = document.querySelector('.create_account');

var name_form = document.querySelector('.name_details');
var address_form = document.querySelector('.address_details');
var phone_form = document.querySelector('.phone_details');
var bloodgroup_form = document.querySelector('.bloodgroup_details');
var sequence_counter = 1;

auth.onAuthStateChanged(user => {
  if (user) {
    console.log("User Logged In");
    donatebtn.classList.remove("hidden_btn1");
    signoutbtn.classList.remove("hidden_btn2");
    signinbtn.style.display = "none";
    signupbtn.style.display = "none";
    create.style.display = "none";

  } else {
    console.log("No User Logged In");
    donatebtn.classList.add("hidden_btn1");
    signoutbtn.classList.add("hidden_btn2");
    signinbtn.style.display = "inline-block";
    signupbtn.style.display = "inline-block";
  }
});

// JS Code //

const signinform = document.querySelector("#signin_submit");
const signupform = document.querySelector("#signup_submit");

// Sign Up the user

signupform.addEventListener("submit", e => {
  e.preventDefault();

  const email = signupform["signup_email"].value;
  const password = signupform["signup_password"].value;

  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    signupform.reset();
    let modal = document.querySelector("#modal2");
    M.Modal.getInstance(modal).close();
    M.toast({ html: 'Account Created Successfully' });
  });
});

// Logging Users In //

signinform.addEventListener("submit", e => {
  e.preventDefault();

  const email = signinform["signin_email"].value;
  const password = signinform["signin_password"].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    signinform.reset();
    let modal = document.querySelector("#modal1");
    M.Modal.getInstance(modal).close();
    M.toast({ html: 'User Logged In Successfully!' })
  });
});

// Logging User Out //

signoutbtn.addEventListener("click", e => {
  auth.signOut();
});

// Adding Donator Details in Cloud Firestore //

const donator = document.querySelector("#donate_submit");
donator.addEventListener("submit", e => {
  e.preventDefault();
  db.collection("Donors")
    .add({
      Position: sequence_counter,
      Name: donator["name"].value,
      Address: donator["address"].value,
      Phone: donator["phone_number"].value,
      BloodGroup: donator["blood_group"].value
    })
    .then(() => {
      donator.reset();
      let modal = document.querySelector("#modal3");
      M.Modal.getInstance(modal).close();
      M.toast({ html: 'Blood Donated Successfully!' })
    });
});

// Function that will individually get the docs //

const individual_details = document.querySelector('.individual_details');

const setupGuides = (data) => {

  let html = '';

  data.forEach(doc => {
    const donor = doc.data();
    const donor_data = `  
      <tr>
        <td>${sequence_counter}</td>
        <td>${donor.Name}</td>
        <td>${donor.BloodGroup}</td>
        <td>
          <button data-target="modal4" class="btn modal-trigger waves-effect waves-light btn right red accent-4">
            Details
          </button>
        </td>
      </tr>
    `;

    name_form.innerHTML = donor.Name;
    address_form.innerHTML = donor.Address;
    phone_form.innerHTML = donor.Phone;
    bloodgroup_form.innerHTML = donor.BloodGroup;

    html += donor_data;


  });

  individual_details.innerHTML = html;
}

// Getting Database Items //

db.collection("Donors").onSnapshot(snapshot => {
  setupGuides(snapshot.docs);
});



















