let selectedProfileId = null;
const profiles = [];

function populateAutocomplete() {
  const input = document.getElementById('customer-input');

  fetch('profiles.json')
    .then(response => response.json())
    .then(data => {
      profiles.push(...data);

      $("#customer-input").autocomplete({
        source: profiles.map(profile => ({label: profile.name, value: profile.id})),
        select: function(event, ui) {
          event.preventDefault();
          input.value = ui.item.label;
          selectedProfileId = ui.item.value;
          calculateBonuses();
          populateProfileInfo();
        },
        focus: function(event, ui) {
          event.preventDefault();
          input.value = ui.item.label;
        }
      });

      input.addEventListener('change', calculateBonuses);
      document.getElementById('amount').addEventListener('input', calculateBonuses);
    })
    .catch(err => console.error(err));
}

function calculateBonuses() {
  const amountInput = document.getElementById('amount');
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || selectedProfileId === null) {
    clearResults();
    return;
  }

  const selectedProfile = profiles.find(profile => profile.id === selectedProfileId);
  const bonusFormula = selectedProfile.bonusFormula;

  const resultSpans = document.querySelectorAll('.results span');

  if (selectedProfile.bonusStatus !== "Good to go") {
    resultSpans.forEach(span => {
      span.style.color = 'red';
      span.style.fontWeight = 'normal';
      span.textContent = `Payout to cover ${selectedProfile.bonusStatus}`;
    });
    return;
  }

  // Set color to black and text to bold for 'Good to go' profiles
  resultSpans.forEach(span => {
    span.style.color = 'black';
    span.style.fontWeight = 'bold';
  });

  const bonusAmount = Math.round(amount * bonusFormula.bonusMultiplier);
  const totalAmount = Math.round(amount + bonusAmount);
  const rollover = Math.round(totalAmount * bonusFormula.rolloverMultiplier);
  const bustOutComp = Math.round(amount * bonusFormula.bustOutCompMultiplier);
  const bustOutRollover = Math.round(bustOutComp * bonusFormula.bustOutRolloverMultiplier);

  document.getElementById('bonus-amount').textContent = bonusAmount;
  document.getElementById('total-amount').textContent = totalAmount;
  document.getElementById('rollover').textContent = rollover;
  document.getElementById('bust-out-comp').textContent = bustOutComp;
  document.getElementById('bust-out-rollover').textContent = bustOutRollover;

  if (bonusFormula.boLoyaltyMultiplier !== undefined) {
    const boLoyalty = Math.round(amount * bonusFormula.boLoyaltyMultiplier);
    document.getElementById('bo-loyalty').textContent = boLoyalty;
    document.getElementById('bo-loyalty').parentNode.style.display = 'block';
  } else {
    document.getElementById('bo-loyalty').parentNode.style.display = 'none';
  }
}

function populateProfileInfo() {
  const selectedProfile = profiles.find(profile => profile.id === selectedProfileId);

  document.getElementById('profile-name').textContent = selectedProfile.name;
  document.getElementById('bonus-status').textContent = selectedProfile.bonusStatus;
  document.getElementById('pending-settlements').textContent = selectedProfile.pendingSettlements;

  const bonusPackageElement = document.getElementById('bonus-package');
  bonusPackageElement.innerHTML = '';
  for (let item of selectedProfile.bonusPackage) {
    let li = document.createElement('li');
    li.innerHTML = item;
    bonusPackageElement.appendChild(li);
  }

  const clientInfoElement = document.getElementById('client-info');
  clientInfoElement.innerHTML = '';
  for (let item of selectedProfile.clientInfo) {
    let li = document.createElement('li');
    li.innerHTML = item;
    clientInfoElement.appendChild(li);
  }

  document.getElementById('telephone').textContent = selectedProfile.telephone;
  document.getElementById('house-name').textContent = selectedProfile.houseName;
  document.getElementById('street').textContent = selectedProfile.street;
  document.getElementById('town').textContent = selectedProfile.town;
  document.getElementById('county').textContent = selectedProfile.county;
  document.getElementById('zipcode').textContent = selectedProfile.zipcode;
  document.getElementById('total-deposits').textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selectedProfile.totalDeposits);
  document.getElementById('total-withdrawals').textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selectedProfile.totalWithdrawals);
}

function clearResults() {
  const resultSpans = document.querySelectorAll('.results span');
  resultSpans.forEach(span => {
    span.textContent = '';
    span.style.color = 'initial';
    span.style.fontWeight = 'normal';
  });
}

window.addEventListener('load', populateAutocomplete);
