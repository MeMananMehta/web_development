document.getElementById('loan-form').addEventListener('submit', function(e){    
  
  //hide results
  document.getElementById('results').style.display = 'none';
  
  //show results
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);
  
  e.preventDefault();

});

function calculateResults(){

  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const monthlyInterest = parseFloat(interest.value) / 100 / 12;
  const noOfPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + monthlyInterest, noOfPayments);
  const monthly = (principal * x * monthlyInterest) / (x-1);
  
  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * noOfPayments).toFixed(2);
    totalInterest.value = (totalPayment.value - principal).toFixed(2);

    document.getElementById('loading').style.display = 'none';

    document.getElementById('results').style.display = 'block';

  }else{
    showError('Please check your numbers');
  }

}


function showError(error){

  document.getElementById('loading').style.display = 'none';

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  //insert error above heading
  card.insertBefore(errorDiv , heading);

  //clear error after 3 sec
  setTimeout(clearError, 2000);
  
}

function clearError(){
  document.querySelector('.alert').remove();
}