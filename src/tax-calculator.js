initLabels();
document.getElementById('taxForm').addEventListener('submit', function(evt) {
  evt.preventDefault();
  calculate();
  return false;
});
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {document.getElementById('price').focus(); }, 100);
});

function initLabels() {
  var title = chrome.i18n.getMessage("extName");
  document.getElementById('pageTitle').innerHTML = title;
  document.getElementById('sectionTitle').innerHTML = title;

  document.getElementById('calculation_type_label').innerHTML = chrome.i18n.getMessage("calculationType");
  document.getElementById('calculation_type_including').innerHTML = chrome.i18n.getMessage("calculationIncluding");
  document.getElementById('calculation_type_excluding').innerHTML = chrome.i18n.getMessage("calculationExcluding");
  document.getElementById('roundLabel').innerHTML = chrome.i18n.getMessage("roundLabel");
  document.getElementById('priceLabel').innerHTML = chrome.i18n.getMessage("priceLabel");
  document.getElementById('rateLabel').innerHTML = chrome.i18n.getMessage("rateLabel");
  document.getElementById('suffix-excl').innerHTML = chrome.i18n.getMessage("exclSuffix");
  document.getElementById('suffix-incl').innerHTML = chrome.i18n.getMessage("inclSuffix");
  document.getElementById('suffix-vat').innerHTML = chrome.i18n.getMessage("vatSuffix");
  document.getElementById('calculate').value = chrome.i18n.getMessage("calculateText");

}
function calculate() {
  document.getElementById('msg').innerHTML = "&nbsp;";
  if (document.getElementById('result').style.display != 'none') {
    document.getElementById("result").style.display = "none";
  }

  // Initialisation des variables
  var result = 0;
  var calculation_type = document.getElementById('calculation_type').value || "excluding";
  var price = document.getElementById("price").value || "";
  var rate = document.getElementById("rate").value || "";
  var round = document.getElementById('round').checked || false;

  price = price.replace(',', '.');
  rate = rate.replace(',', '.');

  if(isNaN(rate) || !(rate > 0)) {
    document.getElementById('msg').innerHTML = chrome.i18n.getMessage("msgErrorRate");

  } else if (isNaN(price) || !(price > 0)) {
    document.getElementById('msg').innerHTML = chrome.i18n.getMessage("msgErrorPrice");

  } else {
    price = parseFloat(price, 2) * 100;
    rate = parseFloat(rate, 2);
    if(calculation_type == "excluding") {
      result = price / ((rate/100) + 1);
      if (round) {
        result = Math.round(result);
      }
      var tax_amount = price - result;
      price = price / 100;
      result = result / 100;
      tax_amount = tax_amount / 100;
      document.getElementById('excluding_price').innerHTML = result;
      document.getElementById('including_price').innerHTML = price;
      document.getElementById('tax_amount').innerHTML = tax_amount;
      
    } else {
      result = (1 + (rate/100)) * price;
      if (round) {
        result = Math.round(result);
      }
      var tax_amount = result - price;
      result = result / 100;
      price = price / 100;
      tax_amount = tax_amount / 100;
      document.getElementById('excluding_price').innerHTML = price;
      document.getElementById('including_price').innerHTML = result;
      document.getElementById('tax_amount').innerHTML = tax_amount;
    }
    document.getElementById("result").style.display = "block";
  }
  return false;
}
