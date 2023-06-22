function calculateBonus() {
  var profileSelect = document.getElementById("profile-select");
  var selectedProfile = profileSelect.value;
  var amountInput = document.getElementById("amount-input");
  var amount = parseFloat(amountInput.value);

  var bonusAmountLabel = document.getElementById("bonus-amount-label");
  var totalAmountLabel = document.getElementById("total-amount-label");
  var rolloverLabel = document.getElementById("rollover-label");
  var bustOutLabel = document.getElementById("bust-out-label");
  var bustOutRolloverLabel = document.getElementById("bust-out-rollover-label");
  var boLoyaltyLabel = document.getElementById("bo-loyalty-label"); // Added new field
  var profileNameLabel = document.getElementById("profile-name-label");

  var bonusFormula;
  var rollover;
  var bustOut;
  var bustOutRollover;
  var boLoyalty;


  switch (selectedProfile) {
    case "shannon":
      profileNameLabel.textContent = "Shannon Dice1630";
      bonusFormula = 1.5;
      rollover = Math.floor(30 * amount) + Math.floor(30 * amount * bonusFormula);
      bustOut = Math.floor(0.3 * amount);
      bustOutRollover = Math.floor(0.3 * amount * 20);
      break;
    case "rick":
      profileNameLabel.textContent = "Rick Dice325";
      bonusFormula = 1;
      rollover = Math.floor((amount + amount * bonusFormula) * 8);
      bustOut = Math.floor(0.5 * amount);
      bustOutRollover = Math.floor(8 * (0.5 * amount));
      boLoyalty = Math.floor(0.65 * amount); // Added new field
      break;
    case "binetti":
      profileNameLabel.textContent = "Binetti Dice105";
      bonusFormula = 1;
      rollover = Math.floor((amount + amount * bonusFormula) * 12); // Updated for Binetti profile
      bustOut = 0; // No bust out for Binetti profile
      bustOutRollover = 0; // No bust out rollover for Binetti profile
      boLoyalty = 0; // No BO + Loyalty for Binetti profile
      break;
    case "Jared":
      profileNameLabel.textContent = "Jared K Dice270";
      bonusFormula = 1;
      rollover = Math.floor((amount + amount * bonusFormula) * 20); // Updated for Jared profile
      bustOut = 0; // No bust out for Jared profile
      bustOutRollover = 0; // No bust out rollover for Jared profile
      boLoyalty = 0; // No BO + Loyalty for Jared profile
      break;
    case "Claud":
      profileNameLabel.textContent = "Claud Gabby Dice155";
      bonusFormula = 1;
      rollover = Math.floor((amount + amount * bonusFormula) * 20); // Updated for Jared profile
      bustOut = 0; // No bust out for Jared profile
      bustOutRollover = 0; // No bust out rollover for Jared profile
      boLoyalty = 0; // No BO + Loyalty for Jared profile
      break;
    default:
      profileNameLabel.textContent = "";
      bonusFormula = 0;
      rollover = 0;
      bustOut = 0;
      bustOutRollover = 0;
      boLoyalty = 0;
  }

  var bonusAmount = amount * bonusFormula;
  var totalAmount = amount + bonusAmount;

  bonusAmountLabel.textContent = "Bonus Amount: " + Math.floor(bonusAmount);
  totalAmountLabel.textContent = "Total Amount: " + Math.floor(totalAmount);
  rolloverLabel.textContent = "Rollover: " + Math.floor(rollover);
  bustOutLabel.textContent = "Bust Out Comp: " + Math.floor(bustOut);
  bustOutRolloverLabel.textContent = "Bust Out Rollover: " + Math.floor(bustOutRollover);
  boLoyaltyLabel.textContent = "BO + Loyalty: " + Math.floor(boLoyalty); // Updated for Binetti profile
}
