document.querySelector('#financeForm').addEventListener('submit', function (event) {
 event.preventDefault();
 console.log("click")
});

async function newFinanceHandler(event) {
 event.preventDefault();
 const finance_name = document.querySelector('#finance_name').value.trim();
 const finance_email = document.querySelector('#finance_email').value.trim();
 const document_password = document.querySelector('#document_password').value.trim();


 if (
  !finance_name ||
  !finance_email ||
  !document_password
 ) {
  alert('Please fill in all required fields.');
  return; // Prevent further execution
 }

 const financeInfo = await fetch('api/finance', {
  method: 'POST',
  body: JSON.stringify({
   finance_name,
   finance_email,
   document_password
  }),
  headers: {
   'Content-Type': 'application/json'
  }
 });
 if (financeInfo.ok) {
  document.location.replace('/financeUpdated');
 } else {
  alert('Failed to sign up. Please check your input and try again.')
 }
}

document.addEventListener('DOMContentLoaded', () => {
 document.querySelector('#financeForm').addEventListener('submit', newFinanceHandler);
});


