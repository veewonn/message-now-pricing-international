var clickCount = 0;
var countriesData = [];
var flag = 0;
var contactSales = 0;
var moreThanTenThousand = 0;
var debounceTimer;
var htmlCode =
  '<a element="closeCalcRowBtn" href="#" class="close-calc-btn-icon w-inline-block"><img src="https://assets-global.website-files.com/6475ec9b171f837184813fcb/65950c64939aa155bf3c57a5_close-icon-png.png" loading="lazy" alt=""></a>';

function delayedFunction(priceForCountry, number) {
  console.log("priceForCountry", priceForCountry);
  console.log("number", number);
  var perSMSPriceInput = document.getElementById(`perSMSPrice${number}`);
  var checkbox = document.getElementById("USD_INR_Checkbox");
  if (flag) {
    console.log("checked");
    perSMSPriceInput.value = priceForCountry.pricerupee;
  } else {
    perSMSPriceInput.value = priceForCountry.price;
    console.log("unchecked");
  }

  // perSMSPriceInput.value = priceForCountry.price;
}
function multiply(storedValue, number, selectedCountry) {
  console.log("storedValue", storedValue);
  console.log("number", number);
  var priceForCountry = getPriceByName(selectedCountry);
  delayedFunction(priceForCountry, number);
  console.log("priceForCountry1", priceForCountry);
  var messageCnt = 0;
  var moreThanTenThousand = 0;
  var total = 0,
    total1 = 0,
    total2 = 0,
    total3 = 0;
  var rupee = 1;
  var currencyValue = document.querySelector(
    '[element="usdValueInINR"]'
  ).textContent;
  rupee = rupee * (parseFloat(currencyValue) ? parseFloat(currencyValue) : 1);
  var perSMSPriceInput = document.getElementById(`perSMSPrice${number}`);
  var subTotal = document.getElementById(`field-2${number}`);
  var mnPricingTwilio = document.getElementById(
    `subTotalMNPricingTwilio${number}`
  );
  var vnPricing = document.getElementById(`subTotalVNPricing${number}`);
  var vnPricingTwilio = document.getElementById(
    `subTotalVNPricingTwilio${number}`
  );
  console.log("priceForCountry", priceForCountry);
  console.log("mnPricingTwilio", mnPricingTwilio);
  if (flag) {
    subTotal.value = parseFloat(
      (
        parseFloat(storedValue) * parseFloat(priceForCountry.pricerupee)
      ).toFixed(6)
    );
    mnPricingTwilio.value = parseFloat(
      (
        parseFloat(storedValue) * parseFloat(priceForCountry.twilliopricerupee)
      ).toFixed(6)
    );
    vnPricing.value = parseFloat(
      (
        parseFloat(storedValue) * parseFloat(priceForCountry.vnpricerupee)
      ).toFixed(6)
    );
    vnPricingTwilio.value = parseFloat(
      (
        parseFloat(storedValue) *
        parseFloat(priceForCountry.vntwilliopricerupee)
      ).toFixed(6)
    );
  } else {
    subTotal.value = parseFloat(
      (parseFloat(storedValue) * parseFloat(priceForCountry.price)).toFixed(6)
    );
    mnPricingTwilio.value = parseFloat(
      (
        parseFloat(storedValue) * parseFloat(priceForCountry.twillioprice)
      ).toFixed(6)
    );
    vnPricing.value = parseFloat(
      (parseFloat(storedValue) * parseFloat(priceForCountry.vnprice)).toFixed(6)
    );
    vnPricingTwilio.value = parseFloat(
      (
        parseFloat(storedValue) * parseFloat(priceForCountry.vntwillioprice)
      ).toFixed(6)
    );
  }
  // subTotal.value = parseFloat(storedValue) * parseFloat(perSMSPriceInput.value);

  console.log("mnPricingTwilio.value", mnPricingTwilio.value);

  console.log("vnPricing.value", vnPricing.value);

  console.log("vnPricingTwiliovalue", vnPricingTwilio.value);
  console.log("subTotalvalue", subTotal.value);
  var subTotals = document.querySelectorAll('[name="field-2"]');
  subTotals.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  var subTotals1 = document.querySelectorAll(
    '[name="subTotalMNPricingTwilio"]'
  );
  subTotals1.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total1 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  var subTotals2 = document.querySelectorAll('[name="subTotalVNPricing"]');
  console.log("subtotals2", subTotals2);
  subTotals2.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total2 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  var subTotals3 = document.querySelectorAll(
    '[name="subTotalVNPricingTwilio"]'
  );
  console.log("subtotals3", subTotals3);
  subTotals3.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total3 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  console.log("total", total);
  console.log("total1", total1);
  console.log("total2", total2);
  console.log("total3", total3);
  var element = document.querySelector('[element="totalMonthlyCost"]');
  console.log("element", element);
  if (flag) {
    element.textContent = `₹${total.toFixed(6)}`;
  } else {
    element.textContent = `$${total.toFixed(6)}`;
  }

  var inputElements = document.querySelectorAll('[element="numberOfMessage"]');
  inputElements.forEach(function (input) {
    console.log(typeof input.value);
    if (parseFloat(input.value) > 10000) {
      moreThanTenThousand = 1;
    }
    messageCnt += parseFloat(input.value) ? parseFloat(input.value) : 0;
  });
  var element1 = document.querySelectorAll('[element="totalMonthlySMS"]');
  element1[0].textContent = `${messageCnt}`;
  element1[1].textContent = `${messageCnt}`;
  var comparison1 = document.querySelector('[element="costComparisonForMN"]');
  var percentageChangeWithTwillio = ((total1 - total) / total1) * 100;
  var fullComparisonText = document.querySelector(
    '[element="full-comparison-text"]'
  );
  var fullComparisonTextVN = document.querySelector(
    '[element="full-costComparisonForVN-text"]'
  );
  console.log(
    "percentageChangeWithTwillio in multiply",
    percentageChangeWithTwillio
  );

  if (percentageChangeWithTwillio < 0) {
    comparison1.textContent = `${Math.abs(
      percentageChangeWithTwillio.toFixed(2)
    )}% more`;
    fullComparisonText.style.display = "none";
  } else {
    comparison1.textContent = `${percentageChangeWithTwillio.toFixed(2)}% less`;
    fullComparisonText.style.display = "block";
  }

  var comparison2 = document.querySelector('[element="costComparisonForVN"]');
  var percentageChangeWithTwillio1 = ((total3 - total2) / total3) * 100;
  if (percentageChangeWithTwillio1 < 0) {
    comparison2.textContent = `${Math.abs(
      percentageChangeWithTwillio1.toFixed(2)
    )}% more`;
    fullComparisonTextVN.style.display = "none";
  } else {
    comparison2.textContent = `${percentageChangeWithTwillio1.toFixed(
      2
    )}% less`;
    fullComparisonTextVN.style.display = "block";
  }

  var totalMonthlyCostForVN = document.querySelector(
    '[element="totalMonthlyCostForVN"]'
  );
  if (flag) {
    totalMonthlyCostForVN.textContent = `₹${total2.toFixed(6)}`;
  } else {
    totalMonthlyCostForVN.textContent = `$${total2.toFixed(6)}`;
  }
  showHide();
  var element2 = document.querySelector('[element="totalMonthlyCost"]');
  if (moreThanTenThousand) {
    element2.innerHTML =
      '<a element="totalMonthlyCost" href="/talk-to-expert" class="sms_contact--sales w-inline-block"><p class="text-size-regular text-color-seeblue-60 text-weight-bold">Contact Sales</p><img src="https://assets-global.website-files.com/6475ec9b171f837184813fcb/6599a8ec59675bce211a6873_outlined.png" loading="lazy" alt="" class="icon-1x1-xsmall"></a>';
    var section = document.querySelector('[element="complementary-section"]');
    if (section) {
      section.style.display = "none";
    }
    var sectionCustom = document.querySelector(
      '[element="complementary-section-custom"]'
    );
    if (sectionCustom) {
      sectionCustom.style.display = "block";
    }
    var percentageElement = document.querySelector(
      '[element="full-comparison-text"]'
    );
    if (percentageElement) {
      percentageElement.style.display = "none";
    }
  } else {
    var section = document.querySelector('[element="complementary-section"]');
    if (section) {
      section.style.display = "block";
    }
    var sectionCustom = document.querySelector(
      '[element="complementary-section-custom"]'
    );
    if (sectionCustom) {
      sectionCustom.style.display = "none";
    }
    var percentageElement = document.querySelector(
      '[element="full-comparison-text"]'
    );
    var fullComparisonText = document.querySelector(
      '[element="full-comparison-text"]'
    );
    if (percentageElement) {
      percentageElement.style.display = "block";
      var percentageChangeWithTwillio = ((total1 - total) / total1) * 100;
      if (percentageChangeWithTwillio < 0) {
        comparison1.textContent = `${Math.abs(
          percentageChangeWithTwillio.toFixed(2)
        )}% more`;
        fullComparisonText.style.display = "none";
      } else {
        comparison1.textContent = `${percentageChangeWithTwillio.toFixed(
          2
        )}% less`;
        fullComparisonText.style.display = "block";
      }
    }
  }
}
function deleteIDForMobile(id) {
  var messageCnt = 0;
  moreThanTenThousand = 0;
  var total = 0,
    total1 = 0,
    total2 = 0,
    total3 = 0;
  var formSection = document.getElementById(`formSection${id}`);
  var mnPricingTwilio = document.getElementById(`subTotalMNPricingTwilio${id}`);
  var vnPricing = document.getElementById(`subTotalVNPricing${id}`);
  var vnPricingTwilio = document.getElementById(`subTotalVNPricingTwilio${id}`);
  if (formSection) {
    formSection.parentNode.removeChild(formSection);
  }
  if (mnPricingTwilio) {
    mnPricingTwilio.parentNode.removeChild(mnPricingTwilio);
  }
  if (vnPricing) {
    vnPricing.parentNode.removeChild(vnPricing);
  }
  if (vnPricingTwilio) {
    vnPricingTwilio.parentNode.removeChild(vnPricingTwilio);
  }
  var subTotals = document.querySelectorAll('[name="field-2"]');
  subTotals.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  var subTotals1 = document.querySelectorAll(
    '[name="subTotalMNPricingTwilio"]'
  );
  subTotals1.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total1 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  var subTotals2 = document.querySelectorAll('[name="subTotalVNPricing"]');
  subTotals2.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total2 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  var subTotals3 = document.querySelectorAll(
    '[name="subTotalVNPricingTwilio"]'
  );
  subTotals3.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total3 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  console.log("total", total);
  console.log("total1", total1);
  console.log("total2", total2);
  console.log("total3", total3);
  var element = document.querySelector('[element="totalMonthlyCost"]');
  if (flag) {
    element.textContent = `₹${total.toFixed(6)}`;
  } else {
    element.textContent = `$${total.toFixed(6)}`;
  }
  var inputElements = document.querySelectorAll('[element="numberOfMessage"]');
  inputElements.forEach(function (input) {
    console.log(typeof input.value);
    messageCnt += parseFloat(input.value) ? parseFloat(input.value) : 0;
  });
  var element1 = document.querySelectorAll('[element="totalMonthlySMS"]');
  element1[0].textContent = `${messageCnt}`;
  element1[1].textContent = `${messageCnt}`;
  var comparison1 = document.querySelector('[element="costComparisonForMN"]');
  var percentageChangeWithTwillio = ((total1 - total) / total1) * 100;
  comparison1.textContent = `${percentageChangeWithTwillio.toFixed(2)}% less`;
  var comparison2 = document.querySelector('[element="costComparisonForVN"]');
  var percentageChangeWithTwillio1 = ((total3 - total2) / total3) * 100;
  comparison2.textContent = `${percentageChangeWithTwillio1.toFixed(2)}% less`;
  var totalMonthlyCostForVN = document.querySelector(
    '[element="totalMonthlyCostForVN"]'
  );
  if (flag) {
    totalMonthlyCostForVN.textContent = `₹${total2.toFixed(6)}`;
  } else {
    totalMonthlyCostForVN.textContent = `$${total2.toFixed(6)}`;
  }
  if (moreThanTenThousand) {
    var section = document.querySelector('[element="complementary-section"]');
    if (section) {
      section.style.display = "none";
    }
    var sectionCustom = document.querySelector(
      '[element="complementary-section-custom"]'
    );
    if (sectionCustom) {
      sectionCustom.style.display = "block";
    }
    var percentageElement = document.querySelector(
      '[element="full-comparison-text"]'
    );
    if (percentageElement) {
      percentageElement.style.display = "none";
    }
    var totalMonthlyCostElement = document.querySelector(
      '[element="totalMonthlyCost"]'
    );
    if (totalMonthlyCostElement) {
      totalMonthlyCostElement.innerHTML =
        '<a element="totalMonthlyCost" href="/talk-to-expert" class="sms_contact--sales w-inline-block"><p class="text-size-regular text-color-seeblue-60 text-weight-bold">Contact Sales</p><img src="https://assets-global.website-files.com/6475ec9b171f837184813fcb/6599a8ec59675bce211a6873_outlined.png" loading="lazy" alt="" class="icon-1x1-xsmall"></a>';
    }
  } else {
    var section = document.querySelector('[element="complementary-section"]');
    if (section) {
      section.style.display = "block";
    }
    var sectionCustom = document.querySelector(
      '[element="complementary-section-custom"]'
    );
    if (sectionCustom) {
      sectionCustom.style.display = "none";
    }
    var percentageElement = document.querySelector(
      '[element="full-comparison-text"]'
    );
    var fullComparisonText = document.querySelector(
      '[element="full-comparison-text"]'
    );
    if (percentageElement) {
      percentageElement.style.display = "block";
      var percentageChangeWithTwillio = ((total1 - total) / total1) * 100;
      if (percentageChangeWithTwillio < 0) {
        comparison1.textContent = `${Math.abs(
          percentageChangeWithTwillio.toFixed(2)
        )}% more`;
        fullComparisonText.style.display = "none";
      } else {
        comparison1.textContent = `${percentageChangeWithTwillio.toFixed(
          2
        )}% less`;
        fullComparisonText.style.display = "block";
      }
    }
  }
  showHide();
}
function deleteInputsInMobileView() {
  var crossSigns = document.querySelectorAll('[element="closeCalcRowBtn"]');

  crossSigns.forEach(function (crossSign) {
    crossSign.addEventListener("click", function () {
      var clickedId = crossSign.id;
      var number = clickedId.match(/\d+/);
      deleteIDForMobile(number);

      console.log("Clicked cross sign id: " + clickedId);
    });
  });
}
function addMoreMobileView() {
  console.log("addmoreinmobile");
  clickCount++;
  moreThanTenThousand = 0;
  var inputElements = document.querySelectorAll('[element="numberOfMessage"]');
  inputElements.forEach(function (input) {
    console.log(typeof input.value);
    if (parseFloat(input.value) > 10000) {
      moreThanTenThousand = 1;
    }
  });
  var newFormSection = document.createElement("div");
  newFormSection.id = `formSection${clickCount}`;
  console.log("flag 421", flag);
  newFormSection.innerHTML = `<div style="margin-top: 2rem;margin-bottom: 0.25rem; display: flex; align-items: center; justify-content: space-between;" id="w-node-_5cdb42fb-e498-ef35-da91-d9fed1be200a-4a51d068" class="sms-pricing_form-label"><p class="text-size-small text-color-white">Country</p><a element="closeCalcRowBtn" id="delete${clickCount}" href="#" class="close-calc-btn-icon w-inline-block" style="left: 42px;position: relative;"><img src="https://assets-global.website-files.com/6475ec9b171f837184813fcb/65950c64939aa155bf3c57a5_close-icon-png.png" loading="lazy" alt=""></a></div><select style="margin-bottom: 0.25rem;" id="selectedCountry${clickCount}" name="selectedCountry" data-name="selectedCountry" fs-cmsselect-element="select" element="selectedCountry" class="form-input is-border-radius w-node-_69a17a08-e332-777f-73cd-9b4001180c93-4a51d068 w-select"><option value="">Select Country</option><option value="Afghanistan">Afghanistan</option><option value="Albania">Albania</option><option value="Algeria">Algeria</option><option value="American Samoa">American Samoa</option><option value="Andorra">Andorra</option><option value="Angola">Angola</option><option value="Anguilla">Anguilla</option><option value="Antigua and Barbuda">Antigua and Barbuda</option><option value="Argentina">Argentina</option><option value="Armenia">Armenia</option><option value="Aruba">Aruba</option><option value="Australia">Australia</option><option value="Austria">Austria</option><option value="Azerbaijan">Azerbaijan</option><option value="Bahamas">Bahamas</option><option value="Bahrain">Bahrain</option><option value="Bangladesh">Bangladesh</option><option value="Barbados">Barbados</option><option value="Belarus">Belarus</option><option value="Belgium">Belgium</option><option value="Belize">Belize</option><option value="Benin">Benin</option><option value="Bermuda">Bermuda</option><option value="Bhutan">Bhutan</option><option value="Bolivia">Bolivia</option><option value="Bosnia And Herzegovina">Bosnia And Herzegovina</option><option value="Botswana">Botswana</option><option value="Brazil">Brazil</option><option value="Brunei">Brunei</option><option value="Bulgaria">Bulgaria</option><option value="Burkina Faso">Burkina Faso</option><option value="Burma (Myanmar)">Burma (Myanmar)</option><option value="Burundi">Burundi</option><option value="Cambodia">Cambodia</option><option value="Cameroon">Cameroon</option><option value="Cayman Islands">Cayman Islands</option><option value="Central African Republic">Central African Republic</option><option value="Chad">Chad</option><option value="Chile">Chile</option><option value="China">China</option><option value="Colombia">Colombia</option><option value="Comoros">Comoros</option><option value="Congo">Congo</option><option value="Cook Islands">Cook Islands</option><option value="Costa Rica">Costa Rica</option><option value="Croatia">Croatia</option><option value="Cuba">Cuba</option><option value="Cyprus">Cyprus</option><option value="Czech Republic">Czech Republic</option><option value="Denmark">Denmark</option><option value="Djibouti">Djibouti</option><option value="Dominica">Dominica</option><option value="Dominican Republic">Dominican Republic</option><option value="Ecuador">Ecuador</option><option value="Egypt">Egypt</option><option value="El Salvador">El Salvador</option><option value="Equatorial Guinea">Equatorial Guinea</option><option value="Eritrea">Eritrea</option><option value="Estonia">Estonia</option><option value="Ethiopia">Ethiopia</option><option value="Falkland Islands">Falkland Islands</option><option value="Faroe Islands">Faroe Islands</option><option value="Fiji">Fiji</option><option value="Finland">Finland</option><option value="France">France</option><option value="French Polynesia">French Polynesia</option><option value="Gabon">Gabon</option><option value="Gambia">Gambia</option><option value="Georgia">Georgia</option><option value="Germany">Germany</option><option value="Ghana">Ghana</option><option value="Gibraltar">Gibraltar</option><option value="Greece">Greece</option><option value="Greenland">Greenland</option><option value="Grenada">Grenada</option><option value="Guam">Guam</option><option value="Guatemala">Guatemala</option><option value="Guinea">Guinea</option><option value="Guinea-Bissau">Guinea-Bissau</option><option value="Guyana">Guyana</option><option value="Haiti">Haiti</option><option value="Honduras">Honduras</option><option value="Hong Kong">Hong Kong</option><option value="Hungary">Hungary</option><option value="Iceland">Iceland</option><option value="India">India</option><option value="Indonesia">Indonesia</option><option value="Iran">Iran</option><option value="Iraq">Iraq</option><option value="Ireland">Ireland</option><option value="Israel">Israel</option><option value="Italy">Italy</option><option value="Ivory Coast">Ivory Coast</option><option value="Jamaica">Jamaica</option><option value="Japan">Japan</option><option value="Jordan">Jordan</option><option value="Kazakhstan">Kazakhstan</option><option value="Kenya">Kenya</option><option value="Kiribati">Kiribati</option><option value="Kuwait">Kuwait</option><option value="Kyrgyzstan">Kyrgyzstan</option><option value="Laos">Laos</option><option value="Latvia">Latvia</option><option value="Lebanon">Lebanon</option><option value="Lesotho">Lesotho</option><option value="Liberia">Liberia</option><option value="Libya">Libya</option><option value="Liechtenstein">Liechtenstein</option><option value="Lithuania">Lithuania</option><option value="Luxembourg">Luxembourg</option><option value="Macau">Macau</option><option value="Macedonia">Macedonia</option><option value="Madagascar">Madagascar</option><option value="Malawi">Malawi</option><option value="Malaysia">Malaysia</option><option value="Maldives">Maldives</option><option value="Mali">Mali</option><option value="Malta">Malta</option><option value="Mauritania">Mauritania</option><option value="Mauritius">Mauritius</option><option value="Mexico">Mexico</option><option value="Micronesia">Micronesia</option><option value="Moldova">Moldova</option><option value="Monaco">Monaco</option><option value="Mongolia">Mongolia</option><option value="Montenegro">Montenegro</option><option value="Montserrat">Montserrat</option><option value="Morocco">Morocco</option><option value="Mozambique">Mozambique</option><option value="Namibia">Namibia</option><option value="Nepal">Nepal</option><option value="Netherlands">Netherlands</option><option value="New Caledonia">New Caledonia</option><option value="New Zealand">New Zealand</option><option value="Nicaragua">Nicaragua</option><option value="Niger">Niger</option><option value="Nigeria">Nigeria</option><option value="Norfolk Island">Norfolk Island</option><option value="Norway">Norway</option><option value="Oman">Oman</option><option value="Pakistan">Pakistan</option><option value="Palau">Palau</option><option value="Palestinian Territory">Palestinian Territory</option><option value="Panama">Panama</option><option value="Papua New Guinea">Papua New Guinea</option><option value="Paraguay">Paraguay</option><option value="Peru">Peru</option><option value="Philippines">Philippines</option><option value="Poland">Poland</option><option value="Portugal">Portugal</option><option value="Puerto Rico">Puerto Rico</option><option value="Qatar">Qatar</option><option value="Reunion">Reunion</option><option value="Romania">Romania</option><option value="Russia">Russia</option><option value="Rwanda">Rwanda</option><option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option><option value="Saint Lucia">Saint Lucia</option><option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option><option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option><option value="Samoa">Samoa</option><option value="San Marino">San Marino</option><option value="Sao Tome and Principe">Sao Tome and Principe</option><option value="Saudi Arabia">Saudi Arabia</option><option value="Senegal">Senegal</option><option value="Serbia">Serbia</option><option value="Seychelles">Seychelles</option><option value="Sierra Leone">Sierra Leone</option><option value="Singapore">Singapore</option><option value="Slovakia">Slovakia</option><option value="Slovenia">Slovenia</option><option value="Solomon Islands">Solomon Islands</option><option value="Somalia">Somalia</option><option value="South Africa">South Africa</option><option value="Spain">Spain</option><option value="Sri Lanka">Sri Lanka</option><option value="Sudan">Sudan</option><option value="Suriname">Suriname</option><option value="Swaziland">Swaziland</option><option value="Sweden">Sweden</option><option value="Switzerland">Switzerland</option><option value="Syria">Syria</option><option value="Taiwan">Taiwan</option><option value="Tajikistan">Tajikistan</option><option value="Tanzania">Tanzania</option><option value="Thailand">Thailand</option><option value="Togo">Togo</option><option value="Tonga">Tonga</option><option value="Trinidad and Tobago">Trinidad and Tobago</option><option value="Tunisia">Tunisia</option><option value="Turkey">Turkey</option><option value="Turkmenistan">Turkmenistan</option><option value="Turks and Caicos Islands">Turks and Caicos Islands</option><option value="Tuvalu">Tuvalu</option><option value="Uganda">Uganda</option><option value="Ukraine">Ukraine</option><option value="United Arab Emirates">United Arab Emirates</option><option value="United Kingdom">United Kingdom</option><option value="United States">United States</option><option value="Uruguay">Uruguay</option><option value="Uzbekistan">Uzbekistan</option><option value="Vanuatu">Vanuatu</option><option value="Venezuela">Venezuela</option><option value="Vietnam">Vietnam</option><option value="Wallis and Futuna">Wallis and Futuna</option><option value="Yemen">Yemen</option><option value="Zambia">Zambia</option><option value="Zimbabwe">Zimbabwe</option></select><div style="margin-bottom: 0.25rem;" id="w-node-_1fd963d0-9f61-c588-324f-8e57cb988cfb-4a51d068" class="sms-pricing_form-label"><p class="text-size-small text-color-white">One way message</p></div><input style="margin-bottom: 0.25rem;" class="form-input is-border-radius w-node-_09f74062-4d55-5228-aaae-ddcfeaf07244-4a51d068 w-input" maxlength="256" name="numberOfMessage" data-name="numberOfMessage" placeholder="1,000" type="number" id="numberOfMessage${clickCount}" element="numberOfMessage" required=""><div style="margin-bottom: 0.25rem;" id="w-node-_37cc0f9b-32ee-197e-e354-4eee162f01a0-4a51d068" class="sms-pricing_form-label is-right"><p class="text-size-small text-color-white">Per SMS (<span element="dollar-sign">${
    flag ? "₹" : "$"
  }</span>)</p></div><input style="margin-bottom: 0.25rem;" class="form-input is-border-radius is-background w-node-_045763f2-ae3e-a983-71e0-c2ffc94c2a3f-4a51d068 w-input" maxlength="256" name="perSMSPrice" data-name="perSMSPrice" placeholder="0.02" type="text" id="perSMSPrice${clickCount}" element="perSMSPrice" required=""><div style="margin-bottom: 0.25rem;" id="w-node-_17ab614b-634b-e909-3515-7e68641675e0-4a51d068" class="sms-pricing_form-label is-right"><p class="text-size-small text-color-white">Subtotal &nbsp;(<span element="dollar-sign">${
    flag ? "₹" : "$"
  }</span>)</p></div><input style="margin-bottom: 0.25rem;" class="form-input is-border-radius is-background w-node-_09ea87b0-9877-ffe5-9e11-aa06a43c7e62-4a51d068 w-input" maxlength="256" name="field-2" data-name="Field 2" placeholder="102" type="text" id="field-2${clickCount}" required="">`;

  document
    .querySelector('[element="formGridHolder"]')
    .appendChild(newFormSection);
  var newInput1 = document.createElement("input");
  newInput1.type = "hidden";
  newInput1.name = "subTotalMNPricingTwilio";
  newInput1.value = "";
  newInput1.setAttribute("element", "subTotalMNPricingTwilio");
  newInput1.id = `subTotalMNPricingTwilio${clickCount}`;
  document.querySelector('[element="formGridHolder"]').appendChild(newInput1);
  var newInput2 = document.createElement("input");
  newInput2.type = "hidden";
  newInput2.name = "subTotalVNPricing";
  newInput2.value = "";
  newInput2.setAttribute("element", "subTotalVNPricing");
  newInput2.id = `subTotalVNPricing${clickCount}`;
  document.querySelector('[element="formGridHolder"]').appendChild(newInput2);
  var newInput3 = document.createElement("input");
  newInput3.type = "hidden";
  newInput3.name = "subTotalVNPricingTwilio";
  newInput3.value = "";
  newInput3.setAttribute("element", "subTotalVNPricingTwilio");
  newInput3.id = `subTotalVNPricingTwilio${clickCount}`;
  document.querySelector('[element="formGridHolder"]').appendChild(newInput3);
  newFormSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
  var element2 = document.querySelector('[element="totalMonthlyCost"]');
  //
  var messageCnt = 0;
  var moreThanTenThousand = 0;
  var total = 0,
    total1 = 0,
    total2 = 0,
    total3 = 0;
  var rupee = 1;
  var currencyValue = document.querySelector(
    '[element="usdValueInINR"]'
  ).textContent;
  rupee = rupee * (parseFloat(currencyValue) ? parseFloat(currencyValue) : 1);
  // var perSMSPriceInput = document.getElementById(`perSMSPrice${number}`);
  // var subTotal = document.getElementById(`field-2${number}`);
  // var mnPricingTwilio = document.getElementById(
  //   `subTotalMNPricingTwilio${number}`
  // );
  // var vnPricing = document.getElementById(`subTotalVNPricing${number}`);
  // var vnPricingTwilio = document.getElementById(
  //   `subTotalVNPricingTwilio${number}`
  // );
  // console.log("priceForCountry", priceForCountry);
  // console.log("mnPricingTwilio", mnPricingTwilio);
  // if (flag) {
  //   subTotal.value =
  //     parseFloat(storedValue) * parseFloat(priceForCountry.pricerupee);
  //   mnPricingTwilio.value =
  //     parseFloat(storedValue) * parseFloat(priceForCountry.twilliopricerupee);
  //   vnPricing.value =
  //     parseFloat(storedValue) * parseFloat(priceForCountry.vnpricerupee);
  //   vnPricingTwilio.value =
  //     parseFloat(storedValue) * parseFloat(priceForCountry.vntwilliopricerupee);
  // } else {
  //   subTotal.value =
  //     parseFloat(storedValue) * parseFloat(priceForCountry.price);
  //   mnPricingTwilio.value =
  //     parseFloat(storedValue) * parseFloat(priceForCountry.twillioprice);
  //   vnPricing.value =
  //     parseFloat(storedValue) * parseFloat(priceForCountry.vnprice);
  //   vnPricingTwilio.value =
  //     parseFloat(storedValue) * parseFloat(priceForCountry.vntwillioprice);
  // }
  // // subTotal.value = parseFloat(storedValue) * parseFloat(perSMSPriceInput.value);

  // console.log("mnPricingTwilio.value", mnPricingTwilio.value);

  // console.log("vnPricing.value", vnPricing.value);

  // console.log("vnPricingTwiliovalue", vnPricingTwilio.value);
  // console.log("subTotalvalue", subTotal.value);
  var subTotals = document.querySelectorAll('[name="field-2"]');
  subTotals.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  var subTotals1 = document.querySelectorAll(
    '[name="subTotalMNPricingTwilio"]'
  );
  subTotals1.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total1 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  var subTotals2 = document.querySelectorAll('[name="subTotalVNPricing"]');
  console.log("subtotals2", subTotals2);
  subTotals2.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total2 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  var subTotals3 = document.querySelectorAll(
    '[name="subTotalVNPricingTwilio"]'
  );
  console.log("subtotals3", subTotals3);
  subTotals3.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total3 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  console.log("total", total);
  console.log("total1", total1);
  console.log("total2", total2);
  console.log("total3", total3);
  var element = document.querySelector('[element="totalMonthlyCost"]');
  console.log("element", element);
  if (flag) {
    element.textContent = `₹${total.toFixed(6)}`;
  } else {
    element.textContent = `$${total.toFixed(6)}`;
  }
  var comparison1 = document.querySelector('[element="costComparisonForMN"]');
  //
  if (moreThanTenThousand) {
    element2.innerHTML =
      '<a element="totalMonthlyCost" href="/talk-to-expert" class="sms_contact--sales w-inline-block"><p class="text-size-regular text-color-seeblue-60 text-weight-bold">Contact Sales</p><img src="https://assets-global.website-files.com/6475ec9b171f837184813fcb/6599a8ec59675bce211a6873_outlined.png" loading="lazy" alt="" class="icon-1x1-xsmall"></a>';
    var section = document.querySelector('[element="complementary-section"]');
    if (section) {
      section.style.display = "none";
    }
    var sectionCustom = document.querySelector(
      '[element="complementary-section-custom"]'
    );
    if (sectionCustom) {
      sectionCustom.style.display = "block";
    }
    var percentageElement = document.querySelector(
      '[element="full-comparison-text"]'
    );
    if (percentageElement) {
      percentageElement.style.display = "none";
    }
  } else {
    var section = document.querySelector('[element="complementary-section"]');
    if (section) {
      section.style.display = "block";
    }
    var sectionCustom = document.querySelector(
      '[element="complementary-section-custom"]'
    );
    if (sectionCustom) {
      sectionCustom.style.display = "none";
    }
    var percentageElement = document.querySelector(
      '[element="full-comparison-text"]'
    );
    var fullComparisonText = document.querySelector(
      '[element="full-comparison-text"]'
    );
    if (percentageElement) {
      percentageElement.style.display = "block";
      var percentageChangeWithTwillio = ((total1 - total) / total1) * 100;
      if (percentageChangeWithTwillio < 0) {
        comparison1.textContent = `${Math.abs(
          percentageChangeWithTwillio.toFixed(2)
        )}% more`;
        fullComparisonText.style.display = "none";
      } else {
        comparison1.textContent = `${percentageChangeWithTwillio.toFixed(
          2
        )}% less`;
        fullComparisonText.style.display = "block";
      }
    }
  }
  updateDropdowns();
  updateInputs();
  deleteInputsInMobileView();
  showHide();
}

function addMore() {
  clickCount++;
  moreThanTenThousand = 0;
  var inputElements = document.querySelectorAll('[element="numberOfMessage"]');
  inputElements.forEach(function (input) {
    console.log(typeof input.value);
    if (parseFloat(input.value) > 10000) {
      moreThanTenThousand = 1;
    }
  });
  var newFormSection = document.createElement("div");
  newFormSection.innerHTML = `
    <select class="form-input is-border-radius w-node-_69a17a08-e332-777f-73cd-9b4001180c93-9a041518 w-select" name="selectedCountry" fs-cmsfilter-field="country" data-name="selectedCountry" fs-cmsselect-element="select" id="selectedCountry${clickCount}" element="selectedCountry"><option value="">Select Country</option><option value="Afghanistan">Afghanistan</option><option value="Albania">Albania</option><option value="Algeria">Algeria</option><option value="American Samoa">American Samoa</option><option value="Andorra">Andorra</option><option value="Angola">Angola</option><option value="Anguilla">Anguilla</option><option value="Antigua and Barbuda">Antigua and Barbuda</option><option value="Argentina">Argentina</option><option value="Armenia">Armenia</option><option value="Aruba">Aruba</option><option value="Australia">Australia</option><option value="Austria">Austria</option><option value="Azerbaijan">Azerbaijan</option><option value="Bahamas">Bahamas</option><option value="Bahrain">Bahrain</option><option value="Bangladesh">Bangladesh</option><option value="Barbados">Barbados</option><option value="Belarus">Belarus</option><option value="Belgium">Belgium</option><option value="Belize">Belize</option><option value="Benin">Benin</option><option value="Bermuda">Bermuda</option><option value="Bhutan">Bhutan</option><option value="Bolivia">Bolivia</option><option value="Bosnia And Herzegovina">Bosnia And Herzegovina</option><option value="Botswana">Botswana</option><option value="Brazil">Brazil</option><option value="Brunei">Brunei</option><option value="Bulgaria">Bulgaria</option><option value="Burkina Faso">Burkina Faso</option><option value="Burma (Myanmar)">Burma (Myanmar)</option><option value="Burundi">Burundi</option><option value="Cambodia">Cambodia</option><option value="Cameroon">Cameroon</option><option value="Cayman Islands">Cayman Islands</option><option value="Central African Republic">Central African Republic</option><option value="Chad">Chad</option><option value="Chile">Chile</option><option value="China">China</option><option value="Colombia">Colombia</option><option value="Comoros">Comoros</option><option value="Congo">Congo</option><option value="Cook Islands">Cook Islands</option><option value="Costa Rica">Costa Rica</option><option value="Croatia">Croatia</option><option value="Cuba">Cuba</option><option value="Cyprus">Cyprus</option><option value="Czech Republic">Czech Republic</option><option value="Denmark">Denmark</option><option value="Djibouti">Djibouti</option><option value="Dominica">Dominica</option><option value="Dominican Republic">Dominican Republic</option><option value="Ecuador">Ecuador</option><option value="Egypt">Egypt</option><option value="El Salvador">El Salvador</option><option value="Equatorial Guinea">Equatorial Guinea</option><option value="Eritrea">Eritrea</option><option value="Estonia">Estonia</option><option value="Ethiopia">Ethiopia</option><option value="Falkland Islands">Falkland Islands</option><option value="Faroe Islands">Faroe Islands</option><option value="Fiji">Fiji</option><option value="Finland">Finland</option><option value="France">France</option><option value="French Polynesia">French Polynesia</option><option value="Gabon">Gabon</option><option value="Gambia">Gambia</option><option value="Georgia">Georgia</option><option value="Germany">Germany</option><option value="Ghana">Ghana</option><option value="Gibraltar">Gibraltar</option><option value="Greece">Greece</option><option value="Greenland">Greenland</option><option value="Grenada">Grenada</option><option value="Guam">Guam</option><option value="Guatemala">Guatemala</option><option value="Guinea">Guinea</option><option value="Guinea-Bissau">Guinea-Bissau</option><option value="Guyana">Guyana</option><option value="Haiti">Haiti</option><option value="Honduras">Honduras</option><option value="Hong Kong">Hong Kong</option><option value="Hungary">Hungary</option><option value="Iceland">Iceland</option><option value="India">India</option><option value="Indonesia">Indonesia</option><option value="Iran">Iran</option><option value="Iraq">Iraq</option><option value="Ireland">Ireland</option><option value="Israel">Israel</option><option value="Italy">Italy</option><option value="Ivory Coast">Ivory Coast</option><option value="Jamaica">Jamaica</option><option value="Japan">Japan</option><option value="Jordan">Jordan</option><option value="Kazakhstan">Kazakhstan</option><option value="Kenya">Kenya</option><option value="Kiribati">Kiribati</option><option value="Kuwait">Kuwait</option><option value="Kyrgyzstan">Kyrgyzstan</option><option value="Laos">Laos</option><option value="Latvia">Latvia</option><option value="Lebanon">Lebanon</option><option value="Lesotho">Lesotho</option><option value="Liberia">Liberia</option><option value="Libya">Libya</option><option value="Liechtenstein">Liechtenstein</option><option value="Lithuania">Lithuania</option><option value="Luxembourg">Luxembourg</option><option value="Macau">Macau</option><option value="Macedonia">Macedonia</option><option value="Madagascar">Madagascar</option><option value="Malawi">Malawi</option><option value="Malaysia">Malaysia</option><option value="Maldives">Maldives</option><option value="Mali">Mali</option><option value="Malta">Malta</option><option value="Mauritania">Mauritania</option><option value="Mauritius">Mauritius</option><option value="Mexico">Mexico</option><option value="Micronesia">Micronesia</option><option value="Moldova">Moldova</option><option value="Monaco">Monaco</option><option value="Mongolia">Mongolia</option><option value="Montenegro">Montenegro</option><option value="Montserrat">Montserrat</option><option value="Morocco">Morocco</option><option value="Mozambique">Mozambique</option><option value="Namibia">Namibia</option><option value="Nepal">Nepal</option><option value="Netherlands">Netherlands</option><option value="New Caledonia">New Caledonia</option><option value="New Zealand">New Zealand</option><option value="Nicaragua">Nicaragua</option><option value="Niger">Niger</option><option value="Nigeria">Nigeria</option><option value="Norfolk Island">Norfolk Island</option><option value="Norway">Norway</option><option value="Oman">Oman</option><option value="Pakistan">Pakistan</option><option value="Palau">Palau</option><option value="Palestinian Territory">Palestinian Territory</option><option value="Panama">Panama</option><option value="Papua New Guinea">Papua New Guinea</option><option value="Paraguay">Paraguay</option><option value="Peru">Peru</option><option value="Philippines">Philippines</option><option value="Poland">Poland</option><option value="Portugal">Portugal</option><option value="Puerto Rico">Puerto Rico</option><option value="Qatar">Qatar</option><option value="Reunion">Reunion</option><option value="Romania">Romania</option><option value="Russia">Russia</option><option value="Rwanda">Rwanda</option><option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option><option value="Saint Lucia">Saint Lucia</option><option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option><option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option><option value="Samoa">Samoa</option><option value="San Marino">San Marino</option><option value="Sao Tome and Principe">Sao Tome and Principe</option><option value="Saudi Arabia">Saudi Arabia</option><option value="Senegal">Senegal</option><option value="Serbia">Serbia</option><option value="Seychelles">Seychelles</option><option value="Sierra Leone">Sierra Leone</option><option value="Singapore">Singapore</option><option value="Slovakia">Slovakia</option><option value="Slovenia">Slovenia</option><option value="Solomon Islands">Solomon Islands</option><option value="Somalia">Somalia</option><option value="South Africa">South Africa</option><option value="Spain">Spain</option><option value="Sri Lanka">Sri Lanka</option><option value="Sudan">Sudan</option><option value="Suriname">Suriname</option><option value="Swaziland">Swaziland</option><option value="Sweden">Sweden</option><option value="Switzerland">Switzerland</option><option value="Syria">Syria</option><option value="Taiwan">Taiwan</option><option value="Tajikistan">Tajikistan</option><option value="Tanzania">Tanzania</option><option value="Thailand">Thailand</option><option value="Togo">Togo</option><option value="Tonga">Tonga</option><option value="Trinidad and Tobago">Trinidad and Tobago</option><option value="Tunisia">Tunisia</option><option value="Turkey">Turkey</option><option value="Turkmenistan">Turkmenistan</option><option value="Turks and Caicos Islands">Turks and Caicos Islands</option><option value="Tuvalu">Tuvalu</option><option value="Uganda">Uganda</option><option value="Ukraine">Ukraine</option><option value="United Arab Emirates">United Arab Emirates</option><option value="United Kingdom">United Kingdom</option><option value="United States">United States</option><option value="Uruguay">Uruguay</option><option value="Uzbekistan">Uzbekistan</option><option value="Vanuatu">Vanuatu</option><option value="Venezuela">Venezuela</option><option value="Vietnam">Vietnam</option><option value="Wallis and Futuna">Wallis and Futuna</option><option value="Yemen">Yemen</option><option value="Zambia">Zambia</option><option value="Zimbabwe">Zimbabwe</option></select>
   `;
  document
    .querySelector('[element="additionalFormLane"]')
    .appendChild(newFormSection);
  var newFormSection1 = document.createElement("div");
  newFormSection1.innerHTML = `<input type="number" class="form-input is-border-radius w-node-_09f74062-4d55-5228-aaae-ddcfeaf07244-9a041518 w-input" maxlength="256" name="numberOfMessage" data-name="numberOfMessage" placeholder="1,000" id="numberOfMessage${clickCount}" element="numberOfMessage" required="">`;
  document
    .querySelector('[element="additionalFormLane"]')
    .appendChild(newFormSection1);
  var newFormSection2 = document.createElement("div");
  newFormSection2.innerHTML = `<input type="text" class="form-input is-border-radius is-background w-node-_045763f2-ae3e-a983-71e0-c2ffc94c2a3f-9a041518 w-input" maxlength="256" name="perSMSPrice" data-name="perSMSPrice" placeholder="0.02" id="perSMSPrice${clickCount}" element="perSMSPrice" required="">`;
  document
    .querySelector('[element="additionalFormLane"]')
    .appendChild(newFormSection2);
  var newFormSection3 = document.createElement("div");
  newFormSection3.innerHTML = `<input type="text" class="form-input is-border-radius is-background w-node-_09ea87b0-9877-ffe5-9e11-aa06a43c7e62-9a041518 w-input" maxlength="256" name="field-2" data-name="Field 2" placeholder="102" id="field-2${clickCount}" required="">
  <a element="closeCalcRowBtn" id="delete${clickCount}" href="#" class="close-calc-btn-icon w-inline-block"><img src="https://assets-global.website-files.com/6475ec9b171f837184813fcb/65950c64939aa155bf3c57a5_close-icon-png.png" loading="lazy" alt=""></a>`;
  newFormSection3.style.display = "flex";
  newFormSection3.style.marginRight = "-28px";
  newFormSection3.style.alignItems = "center";
  document
    .querySelector('[element="additionalFormLane"]')
    .appendChild(newFormSection3);
  var newInput1 = document.createElement("input");
  newInput1.type = "hidden";
  newInput1.name = "subTotalMNPricingTwilio";
  newInput1.value = "";
  newInput1.setAttribute("element", "subTotalMNPricingTwilio");
  newInput1.id = `subTotalMNPricingTwilio${clickCount}`;
  document
    .querySelector('[element="additionalFormLane"]')
    .appendChild(newInput1);
  var newInput2 = document.createElement("input");
  newInput2.type = "hidden";
  newInput2.name = "subTotalVNPricing";
  newInput2.value = "";
  newInput2.setAttribute("element", "subTotalVNPricing");
  newInput2.id = `subTotalVNPricing${clickCount}`;
  document
    .querySelector('[element="additionalFormLane"]')
    .appendChild(newInput2);
  var newInput3 = document.createElement("input");
  newInput3.type = "hidden";
  newInput3.name = "subTotalVNPricingTwilio";
  newInput3.value = "";
  newInput3.setAttribute("element", "subTotalVNPricingTwilio");
  newInput3.id = `subTotalVNPricingTwilio${clickCount}`;
  document
    .querySelector('[element="additionalFormLane"]')
    .appendChild(newInput3);
  var element2 = document.querySelector('[element="totalMonthlyCost"]');
  //
  var messageCnt = 0;
  var moreThanTenThousand = 0;
  var total = 0,
    total1 = 0,
    total2 = 0,
    total3 = 0;
  var rupee = 1;
  var currencyValue = document.querySelector(
    '[element="usdValueInINR"]'
  ).textContent;
  rupee = rupee * (parseFloat(currencyValue) ? parseFloat(currencyValue) : 1);
  // var perSMSPriceInput = document.getElementById(`perSMSPrice${number}`);
  // var subTotal = document.getElementById(`field-2${number}`);
  // var mnPricingTwilio = document.getElementById(
  //   `subTotalMNPricingTwilio${number}`
  // );
  // var vnPricing = document.getElementById(`subTotalVNPricing${number}`);
  // var vnPricingTwilio = document.getElementById(
  //   `subTotalVNPricingTwilio${number}`
  // );
  // console.log("priceForCountry", priceForCountry);
  // console.log("mnPricingTwilio", mnPricingTwilio);
  // if (flag) {
  //   subTotal.value =
  //     parseFloat(storedValue) * parseFloat(priceForCountry.pricerupee);
  //   mnPricingTwilio.value =
  //     parseFloat(storedValue) * parseFloat(priceForCountry.twilliopricerupee);
  //   vnPricing.value =
  //     parseFloat(storedValue) * parseFloat(priceForCountry.vnpricerupee);
  //   vnPricingTwilio.value =
  //     parseFloat(storedValue) * parseFloat(priceForCountry.vntwilliopricerupee);
  // } else {
  //   subTotal.value =
  //     parseFloat(storedValue) * parseFloat(priceForCountry.price);
  //   mnPricingTwilio.value =
  //     parseFloat(storedValue) * parseFloat(priceForCountry.twillioprice);
  //   vnPricing.value =
  //     parseFloat(storedValue) * parseFloat(priceForCountry.vnprice);
  //   vnPricingTwilio.value =
  //     parseFloat(storedValue) * parseFloat(priceForCountry.vntwillioprice);
  // }
  // // subTotal.value = parseFloat(storedValue) * parseFloat(perSMSPriceInput.value);

  // console.log("mnPricingTwilio.value", mnPricingTwilio.value);

  // console.log("vnPricing.value", vnPricing.value);

  // console.log("vnPricingTwiliovalue", vnPricingTwilio.value);
  // console.log("subTotalvalue", subTotal.value);
  var subTotals = document.querySelectorAll('[name="field-2"]');
  subTotals.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  var subTotals1 = document.querySelectorAll(
    '[name="subTotalMNPricingTwilio"]'
  );
  subTotals1.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total1 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  var subTotals2 = document.querySelectorAll('[name="subTotalVNPricing"]');
  console.log("subtotals2", subTotals2);
  subTotals2.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total2 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  var subTotals3 = document.querySelectorAll(
    '[name="subTotalVNPricingTwilio"]'
  );
  console.log("subtotals3", subTotals3);
  subTotals3.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total3 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  console.log("total", total);
  console.log("total1", total1);
  console.log("total2", total2);
  console.log("total3", total3);
  var element = document.querySelector('[element="totalMonthlyCost"]');
  console.log("element", element);
  if (flag) {
    element.textContent = `₹${total.toFixed(6)}`;
  } else {
    element.textContent = `$${total.toFixed(6)}`;
  }
  var comparison1 = document.querySelector('[element="costComparisonForMN"]');
  //
  if (moreThanTenThousand) {
    element2.innerHTML =
      '<a element="totalMonthlyCost" href="/talk-to-expert" class="sms_contact--sales w-inline-block"><p class="text-size-regular text-color-seeblue-60 text-weight-bold">Contact Sales</p><img src="https://assets-global.website-files.com/6475ec9b171f837184813fcb/6599a8ec59675bce211a6873_outlined.png" loading="lazy" alt="" class="icon-1x1-xsmall"></a>';
    var section = document.querySelector('[element="complementary-section"]');
    if (section) {
      section.style.display = "none";
    }
    var sectionCustom = document.querySelector(
      '[element="complementary-section-custom"]'
    );
    if (sectionCustom) {
      sectionCustom.style.display = "block";
    }
    var percentageElement = document.querySelector(
      '[element="full-comparison-text"]'
    );
    if (percentageElement) {
      percentageElement.style.display = "none";
    }
  } else {
    var section = document.querySelector('[element="complementary-section"]');
    if (section) {
      section.style.display = "block";
    }
    var sectionCustom = document.querySelector(
      '[element="complementary-section-custom"]'
    );
    if (sectionCustom) {
      sectionCustom.style.display = "none";
    }
    var percentageElement = document.querySelector(
      '[element="full-comparison-text"]'
    );
    var fullComparisonText = document.querySelector(
      '[element="full-comparison-text"]'
    );
    if (percentageElement) {
      percentageElement.style.display = "block";
      var percentageChangeWithTwillio = ((total1 - total) / total1) * 100;
      if (percentageChangeWithTwillio < 0) {
        comparison1.textContent = `${Math.abs(
          percentageChangeWithTwillio.toFixed(2)
        )}% more`;
        fullComparisonText.style.display = "none";
      } else {
        comparison1.textContent = `${percentageChangeWithTwillio.toFixed(
          2
        )}% less`;
        fullComparisonText.style.display = "block";
      }
    }
  }

  updateDropdowns();
  updateInputs();
  deleteInputs();
  showHide();
}
function getPriceByName(countryName) {
  const foundCountry = countriesData.find(
    (country) => country.name === countryName
  );

  if (foundCountry) {
    const prices = {
      price: foundCountry.price > 0 ? foundCountry.price : 0,
      twillioprice:
        foundCountry.twillioprice > 0 ? foundCountry.twillioprice : 0,
      vnprice: foundCountry.vnprice > 0 ? foundCountry.vnprice : 0,
      vntwillioprice:
        foundCountry.vntwillioprice > 0 ? foundCountry.vntwillioprice : 0,
      pricerupee: foundCountry.pricerupee > 0 ? foundCountry.pricerupee : 0,
      twilliopricerupee:
        foundCountry.twilliopricerupee > 0 ? foundCountry.twilliopricerupee : 0,
      vnpricerupee:
        foundCountry.vnpricerupee > 0 ? foundCountry.vnpricerupee : 0,
      vntwilliopricerupee:
        foundCountry.vntwilliopricerupee > 0
          ? foundCountry.vntwilliopricerupee
          : 0,
    };

    return prices;
  }

  // If the country is not found, you can return some default values or handle it as needed.
  return {
    price: 0,
    twillioprice: 0,
    vnprice: 0,
    vntwillioprice: 0,
  };
}

function updateDropdowns() {
  var dropdowns = document.querySelectorAll('[name="selectedCountry"]');
  dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener("change", function () {
      var selectedId = dropdown.id;
      var number = selectedId.match(/\d+/);
      var selectedValue = this.value;
      var priceForCountry = getPriceByName(selectedValue);
      console.log("priceForCountry", priceForCountry);
      if (number) {
        delayedFunction(priceForCountry, number[0]);
        makeInputValueToReset(number[0], priceForCountry);
      } else {
        delayedFunction(priceForCountry, "");
        makeInputValueToReset("", priceForCountry);
      }
      console.log("Selected Country:", selectedValue);
    });
  });
}
function makeInputValueToReset(idSuffix, priceForCountry) {
  var messageCnt = 0;
  moreThanTenThousand = 0;
  var total = 0,
    total1 = 0,
    total2 = 0,
    total3 = 0;
  //
  console.log("selected country in reset", priceForCountry);
  // var priceForCountry = getPriceByName(selectedCountry);
  // delayedFunction(priceForCountry, idSuffix);
  console.log("priceForCountry1", priceForCountry);
  var rupee = 1;
  var currencyValue = document.querySelector(
    '[element="usdValueInINR"]'
  ).textContent;
  rupee = rupee * (parseFloat(currencyValue) ? parseFloat(currencyValue) : 1);
  var perSMSPriceInput = document.getElementById(`perSMSPrice${idSuffix}`);
  var subTotal = document.getElementById(`field-2${idSuffix}`);
  var mnPricingTwilio = document.getElementById(
    `subTotalMNPricingTwilio${idSuffix}`
  );
  var vnPricing = document.getElementById(`subTotalVNPricing${idSuffix}`);
  var vnPricingTwilio = document.getElementById(
    `subTotalVNPricingTwilio${idSuffix}`
  );
  console.log("priceForCountry", priceForCountry);
  console.log("mnPricingTwilio", mnPricingTwilio);
  var numberOfMessageInput = document.getElementById(
    `numberOfMessage${idSuffix}`
  );
  if (!numberOfMessageInput.value) {
    numberOfMessageInput.value = "0";
  }
  var storedValue = numberOfMessageInput.value;
  console.log("storedvalue in reset", storedValue);
  console.log("flag in reset", flag);
  if (flag) {
    subTotal.value = parseFloat(
      (
        parseFloat(storedValue) * parseFloat(priceForCountry.pricerupee)
      ).toFixed(6)
    );
    mnPricingTwilio.value = parseFloat(
      (
        parseFloat(storedValue) * parseFloat(priceForCountry.twilliopricerupee)
      ).toFixed(6)
    );
    vnPricing.value = parseFloat(
      (
        parseFloat(storedValue) * parseFloat(priceForCountry.vnpricerupee)
      ).toFixed(6)
    );
    vnPricingTwilio.value = parseFloat(
      (
        parseFloat(storedValue) *
        parseFloat(priceForCountry.vntwilliopricerupee)
      ).toFixed(6)
    );
  } else {
    subTotal.value = parseFloat(
      (parseFloat(storedValue) * parseFloat(priceForCountry.price)).toFixed(6)
    );
    mnPricingTwilio.value = parseFloat(
      (
        parseFloat(storedValue) * parseFloat(priceForCountry.twillioprice)
      ).toFixed(6)
    );
    vnPricing.value = parseFloat(
      (parseFloat(storedValue) * parseFloat(priceForCountry.vnprice)).toFixed(6)
    );
    vnPricingTwilio.value = parseFloat(
      (
        parseFloat(storedValue) * parseFloat(priceForCountry.vntwillioprice)
      ).toFixed(6)
    );
  }
  // subTotal.value = parseFloat(storedValue) * parseFloat(perSMSPriceInput.value);

  console.log("mnPricingTwilio.value", mnPricingTwilio.value);

  console.log("vnPricing.value", vnPricing.value);

  console.log("vnPricingTwiliovalue", vnPricingTwilio.value);
  console.log("subTotalvalue", subTotal.value);

  //
  // var numberOfMessageInput = document.getElementById(
  //   `numberOfMessage${idSuffix}`
  // );
  // var subTotalInput = document.getElementById(`field-2${idSuffix}`);

  // if (numberOfMessageInput) {
  //   // Check if the corresponding input exists
  //   numberOfMessageInput.value = "0";
  // }
  // if (subTotalInput) {
  //   // Check if the corresponding input exists
  //   subTotalInput.value = "0";
  // }
  // var mnPricingTwilio = document.getElementById(
  //   `subTotalMNPricingTwilio${idSuffix}`
  // );
  // if (mnPricingTwilio) {
  //   mnPricingTwilio.value = "0";
  // }
  // var vnPricing = document.getElementById(`subTotalVNPricing${idSuffix}`);
  // if (vnPricing) {
  //   vnPricing.value = "0";
  // }
  // var vnPricingTwilio = document.getElementById(
  //   `subTotalVNPricingTwilio${idSuffix}`
  // );
  // if (vnPricingTwilio) {
  //   vnPricingTwilio.value = "0";
  // }
  var subTotals = document.querySelectorAll('[name="field-2"]');
  subTotals.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  var subTotals1 = document.querySelectorAll(
    '[name="subTotalMNPricingTwilio"]'
  );
  subTotals1.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total1 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  var subTotals2 = document.querySelectorAll('[name="subTotalVNPricing"]');
  subTotals2.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total2 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  var subTotals3 = document.querySelectorAll(
    '[name="subTotalVNPricingTwilio"]'
  );
  subTotals3.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total3 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  console.log("total", total);
  console.log("total1", total1);
  console.log("total2", total2);
  console.log("total3", total3);
  var element = document.querySelector('[element="totalMonthlyCost"]');
  if (flag) {
    element.textContent = `₹${total.toFixed(6)}`;
  } else {
    element.textContent = `$${total.toFixed(6)}`;
  }
  var inputElements = document.querySelectorAll('[element="numberOfMessage"]');
  inputElements.forEach(function (input) {
    if (parseFloat(input.value) > 10000) {
      moreThanTenThousand = 1;
    }
    console.log(typeof input.value);
    messageCnt += parseFloat(input.value) ? parseFloat(input.value) : 0;
  });
  var element1 = document.querySelectorAll('[element="totalMonthlySMS"]');
  element1[0].textContent = `${messageCnt}`;
  element1[1].textContent = `${messageCnt}`;
  var comparison1 = document.querySelector('[element="costComparisonForMN"]');
  var percentageChangeWithTwillio = ((total1 - total) / total1) * 100;
  var fullComparisonText = document.querySelector(
    '[element="full-comparison-text"]'
  );
  var fullComparisonTextVN = document.querySelector(
    '[element="full-costComparisonForVN-text"]'
  );
  console.log(
    "percentageChangeWithTwillio in reset",
    percentageChangeWithTwillio
  );
  if (percentageChangeWithTwillio < 0) {
    comparison1.textContent = `${Math.abs(
      percentageChangeWithTwillio.toFixed(2)
    )}% more`;
    fullComparisonText.style.display = "none";
  } else {
    comparison1.textContent = `${percentageChangeWithTwillio.toFixed(2)}% less`;
    fullComparisonText.style.display = "block";
  }
  var comparison2 = document.querySelector('[element="costComparisonForVN"]');
  var percentageChangeWithTwillio1 = ((total3 - total2) / total3) * 100;
  if (percentageChangeWithTwillio1 < 0) {
    comparison2.textContent = `${Math.abs(
      percentageChangeWithTwillio1.toFixed(2)
    )}% more`;
    fullComparisonTextVN.style.display = "none";
  } else {
    comparison2.textContent = `${percentageChangeWithTwillio1.toFixed(
      2
    )}% less`;
    fullComparisonTextVN.style.display = "block";
  }
  var totalMonthlyCostForVN = document.querySelector(
    '[element="totalMonthlyCostForVN"]'
  );
  if (flag) {
    totalMonthlyCostForVN.textContent = `₹${total2.toFixed(6)}`;
  } else {
    totalMonthlyCostForVN.textContent = `$${total2.toFixed(6)}`;
  }
  if (moreThanTenThousand) {
    var section = document.querySelector('[element="complementary-section"]');
    if (section) {
      section.style.display = "none";
    }
    var sectionCustom = document.querySelector(
      '[element="complementary-section-custom"]'
    );
    if (sectionCustom) {
      sectionCustom.style.display = "block";
    }
    var percentageElement = document.querySelector(
      '[element="full-comparison-text"]'
    );
    if (percentageElement) {
      percentageElement.style.display = "none";
    }
    var totalMonthlyCostElement = document.querySelector(
      '[element="totalMonthlyCost"]'
    );
    if (totalMonthlyCostElement) {
      totalMonthlyCostElement.innerHTML =
        '<a element="totalMonthlyCost" href="/talk-to-expert" class="sms_contact--sales w-inline-block"><p class="text-size-regular text-color-seeblue-60 text-weight-bold">Contact Sales</p><img src="https://assets-global.website-files.com/6475ec9b171f837184813fcb/6599a8ec59675bce211a6873_outlined.png" loading="lazy" alt="" class="icon-1x1-xsmall"></a>';
    }
  }

  showHide();
}
function makeContactSales(idSuffix) {
  var perSMSPriceInput = document.getElementById(`perSMSPrice${idSuffix}`);
  var subTotalInput = document.getElementById(`field-2${idSuffix}`);
  if (perSMSPriceInput) {
    perSMSPriceInput.value = "Contact Sales";
  }
  if (subTotalInput) {
    subTotalInput.value = "Contact Sales";
  }
}
function updateFieldsForHighVolume(idSuffix) {
  var messageCnt = 0;
  var inputElements = document.querySelectorAll('[element="numberOfMessage"]');
  inputElements.forEach(function (input) {
    console.log(typeof input.value);
    messageCnt += parseFloat(input.value) ? parseFloat(input.value) : 0;
  });
  var element1 = document.querySelectorAll('[element="totalMonthlySMS"]');
  element1[0].textContent = `${messageCnt}`;
  element1[1].textContent = `${messageCnt}`;
  var perSMSPriceInput = document.getElementById(`perSMSPrice${idSuffix}`);
  var subTotalInput = document.getElementById(`field-2${idSuffix}`);
  if (perSMSPriceInput) {
    perSMSPriceInput.value = "Contact Sales";
  }
  if (moreThanTenThousand) {
    var section = document.querySelector('[element="complementary-section"]');
    if (section) {
      section.style.display = "none";
    }
    var sectionCustom = document.querySelector(
      '[element="complementary-section-custom"]'
    );
    if (sectionCustom) {
      sectionCustom.style.display = "block";
    }
    var percentageElement = document.querySelector(
      '[element="full-comparison-text"]'
    );
    if (percentageElement) {
      percentageElement.style.display = "none";
    }
  }

  if (subTotalInput) {
    subTotalInput.value = "Contact Sales";
  }
  var totalMonthlyCostElement = document.querySelector(
    'p[element="totalMonthlyCost"]'
  );
  // Check if the element exists to avoid errors
  if (totalMonthlyCostElement) {
    totalMonthlyCostElement.innerHTML =
      '<a element="totalMonthlyCost" href="/talk-to-expert" class="sms_contact--sales w-inline-block"><p class="text-size-regular text-color-seeblue-60 text-weight-bold">Contact Sales</p><img src="https://assets-global.website-files.com/6475ec9b171f837184813fcb/6599a8ec59675bce211a6873_outlined.png" loading="lazy" alt="" class="icon-1x1-xsmall"></a>';
  }
}
function updateInputs() {
  var inputElements = document.querySelectorAll('[element="numberOfMessage"]');
  var storedValue = 0;
  var messageCnt = 0;
  console.log("inputElements", inputElements);
  inputElements.forEach(function (input) {
    messageCnt += parseFloat(input.value) ? parseFloat(input.value) : 0;
    console.log("messageCnt", messageCnt);
    var element = document.querySelectorAll('[element="totalMonthlySMS"]');
    element[0].textContent = `${messageCnt}`;
    element[1].textContent = `${messageCnt}`;
    console.log(element);
    input.addEventListener("input", function () {
      storedValue = input.value;
      var selectedId = input.id;
      var number = selectedId.match(/\d+/);
      console.log("number", number);
      let id1 = number;
      if (number) {
        id1 = number;
      } else {
        id1 = "";
      }
      var dropdown = document.getElementById(`selectedCountry${id1}`);
      var selectedIndex = dropdown.selectedIndex;
      var selectedOption = dropdown.options[selectedIndex];
      var selectedValue = selectedOption.value;

      console.log("Selected Value:", selectedValue);
      if (parseInt(storedValue) > 10000) {
        moreThanTenThousand = 1;
        console.log("more than 10000");
        if (number) {
          updateFieldsForHighVolume(number[0]);
        } else {
          updateFieldsForHighVolume("");
        }
      } else {
        console.log("less than 10000");
        if (number) {
          multiply(storedValue, number[0], selectedValue);
        } else {
          multiply(storedValue, "", selectedValue);
        }
        console.log("Stored Value:", storedValue);
      }
    });
  });
  showHide();
}
function deleteId(id) {
  var messageCnt = 0;
  moreThanTenThousand = 0;
  var total = 0,
    total1 = 0,
    total2 = 0,
    total3 = 0;
  var selectCountry = document.getElementById(`selectedCountry${id}`);
  var onewayMessage = document.getElementById(`numberOfMessage${id}`);
  var perSms = document.getElementById(`perSMSPrice${id}`);
  var subTotal = document.getElementById(`field-2${id}`);
  var crossSign = document.getElementById(`delete${id}`);
  var mnPricingTwilio = document.getElementById(`subTotalMNPricingTwilio${id}`);
  var vnPricing = document.getElementById(`subTotalVNPricing${id}`);
  var vnPricingTwilio = document.getElementById(`subTotalVNPricingTwilio${id}`);

  if (selectCountry) {
    selectCountry.parentNode.removeChild(selectCountry);
  }
  if (onewayMessage) {
    onewayMessage.parentNode.removeChild(onewayMessage);
  }
  if (perSms) {
    perSms.parentNode.removeChild(perSms);
  }
  if (subTotal) {
    subTotal.parentNode.removeChild(subTotal);
  }
  if (crossSign) {
    crossSign.parentNode.removeChild(crossSign);
  }
  if (mnPricingTwilio) {
    mnPricingTwilio.parentNode.removeChild(mnPricingTwilio);
  }
  if (vnPricing) {
    vnPricing.parentNode.removeChild(vnPricing);
  }
  if (vnPricingTwilio) {
    vnPricingTwilio.parentNode.removeChild(vnPricingTwilio);
  }
  var subTotals = document.querySelectorAll('[name="field-2"]');
  subTotals.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  var subTotals1 = document.querySelectorAll(
    '[name="subTotalMNPricingTwilio"]'
  );
  subTotals1.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total1 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  var subTotals2 = document.querySelectorAll('[name="subTotalVNPricing"]');
  subTotals2.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total2 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  var subTotals3 = document.querySelectorAll(
    '[name="subTotalVNPricingTwilio"]'
  );
  subTotals3.forEach(function (sub) {
    console.log("sub", sub.value);
    console.log(typeof sub.value);
    total3 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
  });
  console.log("total", total);
  console.log("total1", total1);
  console.log("total2", total2);
  console.log("total3", total3);
  var element = document.querySelector('[element="totalMonthlyCost"]');
  if (flag) {
    element.textContent = `₹${total.toFixed(6)}`;
  } else {
    element.textContent = `$${total.toFixed(6)}`;
  }
  var inputElements = document.querySelectorAll('[element="numberOfMessage"]');
  inputElements.forEach(function (input) {
    if (parseFloat(input.value) > 10000) {
      moreThanTenThousand = 1;
    }
    console.log(typeof input.value);
    messageCnt += parseFloat(input.value) ? parseFloat(input.value) : 0;
  });
  var element1 = document.querySelectorAll('[element="totalMonthlySMS"]');
  element1[0].textContent = `${messageCnt}`;
  element1[1].textContent = `${messageCnt}`;
  var comparison1 = document.querySelector('[element="costComparisonForMN"]');
  var percentageChangeWithTwillio = ((total1 - total) / total1) * 100;
  var fullComparisonText = document.querySelector(
    '[element="full-comparison-text"]'
  );
  var fullComparisonTextVN = document.querySelector(
    '[element="full-costComparisonForVN-text"]'
  );
  if (percentageChangeWithTwillio < 0) {
    comparison1.textContent = `${Math.abs(
      percentageChangeWithTwillio.toFixed(2)
    )}% more`;
    fullComparisonText.style.display = "none";
  } else {
    comparison1.textContent = `${percentageChangeWithTwillio.toFixed(2)}% less`;
    fullComparisonText.style.display = "block";
  }
  var comparison2 = document.querySelector('[element="costComparisonForVN"]');
  var percentageChangeWithTwillio1 = ((total3 - total2) / total3) * 100;
  if (percentageChangeWithTwillio1 < 0) {
    comparison2.textContent = `${Math.abs(
      percentageChangeWithTwillio1.toFixed(2)
    )}% more`;
    fullComparisonTextVN.style.display = "none";
  } else {
    comparison2.textContent = `${percentageChangeWithTwillio1.toFixed(
      2
    )}% less`;
    fullComparisonTextVN.style.display = "block";
  }
  var totalMonthlyCostForVN = document.querySelector(
    '[element="totalMonthlyCostForVN"]'
  );
  if (flag) {
    totalMonthlyCostForVN.textContent = `₹${total2.toFixed(6)}`;
  } else {
    totalMonthlyCostForVN.textContent = `$${total2.toFixed(6)}`;
  }
  if (moreThanTenThousand) {
    var section = document.querySelector('[element="complementary-section"]');
    if (section) {
      section.style.display = "none";
    }
    var sectionCustom = document.querySelector(
      '[element="complementary-section-custom"]'
    );
    if (sectionCustom) {
      sectionCustom.style.display = "block";
    }
    var percentageElement = document.querySelector(
      '[element="full-comparison-text"]'
    );
    if (percentageElement) {
      percentageElement.style.display = "none";
    }
    var totalMonthlyCostElement = document.querySelector(
      '[element="totalMonthlyCost"]'
    );
    if (totalMonthlyCostElement) {
      totalMonthlyCostElement.innerHTML =
        '<a element="totalMonthlyCost" href="/talk-to-expert" class="sms_contact--sales w-inline-block"><p class="text-size-regular text-color-seeblue-60 text-weight-bold">Contact Sales</p><img src="https://assets-global.website-files.com/6475ec9b171f837184813fcb/6599a8ec59675bce211a6873_outlined.png" loading="lazy" alt="" class="icon-1x1-xsmall"></a>';
    }
  } else {
    var section = document.querySelector('[element="complementary-section"]');
    if (section) {
      section.style.display = "block";
    }
    var sectionCustom = document.querySelector(
      '[element="complementary-section-custom"]'
    );
    if (sectionCustom) {
      sectionCustom.style.display = "none";
    }
    var percentageElement = document.querySelector(
      '[element="full-comparison-text"]'
    );
    var fullComparisonText = document.querySelector(
      '[element="full-comparison-text"]'
    );
    if (percentageElement) {
      percentageElement.style.display = "block";
      var percentageChangeWithTwillio = ((total1 - total) / total1) * 100;
      if (percentageChangeWithTwillio < 0) {
        comparison1.textContent = `${Math.abs(
          percentageChangeWithTwillio.toFixed(2)
        )}% more`;
        fullComparisonText.style.display = "none";
      } else {
        comparison1.textContent = `${percentageChangeWithTwillio.toFixed(
          2
        )}% less`;
        fullComparisonText.style.display = "block";
      }
    }
  }

  showHide();
}
function deleteInputs() {
  var crossSigns = document.querySelectorAll('[element="closeCalcRowBtn"]');
  crossSigns.forEach(function (crossSign) {
    crossSign.addEventListener("click", function () {
      var clickedId = crossSign.id;
      var number = clickedId.match(/\d+/);
      deleteId(number);
      console.log("Clicked cross sign id: " + clickedId);
    });
  });
}
function checkViewport() {
  var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  var breakpoint = 768;
  if (viewportWidth < breakpoint) {
    console.log("mobile");
    mobileView();
  } else {
    console.log("desktop");
    webView();
  }
}
function updateFunction(checkbox) {
  var total = 0,
    total1 = 0,
    total2 = 0,
    total3 = 0;
  moreThanTenThousand = 0;
  var rupee = 1;
  var currencyValue = document.querySelector(
    '[element="usdValueInINR"]'
  ).textContent;
  var dollarsigns = document.querySelectorAll('[element="dollar-sign"]');
  var perSMSPriceAll = document.querySelectorAll('[name="perSMSPrice"]');
  console.log("perSMSPriceAll", perSMSPriceAll);
  var subTotals = document.querySelectorAll('[name="field-2"]');
  var subTotals1 = document.querySelectorAll(
    '[name="subTotalMNPricingTwilio"]'
  );
  var subTotals2 = document.querySelectorAll('[name="subTotalVNPricing"]');
  var subTotals3 = document.querySelectorAll(
    '[name="subTotalVNPricingTwilio"]'
  );
  rupee = rupee * (parseFloat(currencyValue) ? parseFloat(currencyValue) : 1);
  console.log("rupee", rupee);
  var element = document.querySelector('[element="totalMonthlyCost"]');
  var totalMonthlyCostForVN = document.querySelector(
    '[element="totalMonthlyCostForVN"]'
  );

  if (checkbox.checked) {
    flag = 1;
    console.log("rupee", rupee);
    dollarsigns.forEach(function (dollarsign) {
      dollarsign.textContent = "₹";
    });
    perSMSPriceAll.forEach(function (p) {
      p.value = (
        rupee * (parseFloat(p.value) ? parseFloat(p.value) : 0)
      ).toFixed(6);
      console.log("p value", p.value);
    });
    subTotals.forEach(function (sub) {
      sub.value = (
        rupee * (parseFloat(sub.value) ? parseFloat(sub.value) : 0)
      ).toFixed(6);
      console.log("sub value", sub.value);
      total += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
    });
    subTotals1.forEach(function (sub) {
      sub.value = (
        rupee * (parseFloat(sub.value) ? parseFloat(sub.value) : 0)
      ).toFixed(6);
      console.log("sub value", sub.value);
      total1 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
    });
    subTotals2.forEach(function (sub) {
      sub.value = (
        rupee * (parseFloat(sub.value) ? parseFloat(sub.value) : 0)
      ).toFixed(6);
      console.log("sub value", sub.value);
      total2 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
    });
    subTotals3.forEach(function (sub) {
      sub.value = (
        rupee * (parseFloat(sub.value) ? parseFloat(sub.value) : 0)
      ).toFixed(6);
      console.log("sub value", sub.value);
      total3 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
    });
    element.textContent = `₹${total.toFixed(6)}`;
    totalMonthlyCostForVN.textContent = `₹${total2.toFixed(6)}`;
    console.log("Checkbox is selected");
  } else {
    flag = 0;
    console.log("rupee", rupee);
    dollarsigns.forEach(function (dollarsign) {
      dollarsign.textContent = "$";
    });
    perSMSPriceAll.forEach(function (p) {
      p.value = (parseFloat(p.value) / rupee).toFixed(6);
    });
    subTotals.forEach(function (sub) {
      sub.value = (parseFloat(sub.value) / rupee).toFixed(6);
      total += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
    });
    subTotals1.forEach(function (sub) {
      sub.value = (parseFloat(sub.value) / rupee).toFixed(6);
      total1 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
      console.log("sub value", sub.value);
    });
    subTotals2.forEach(function (sub) {
      sub.value = (parseFloat(sub.value) / rupee).toFixed(6);
      total2 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
      console.log("sub value", sub.value);
    });
    subTotals3.forEach(function (sub) {
      sub.value = (parseFloat(sub.value) / rupee).toFixed(6);
      total3 += parseFloat(sub.value) ? parseFloat(sub.value) : 0;
      console.log("sub value", sub.value);
    });
    element.textContent = `$${total.toFixed(6)}`;
    totalMonthlyCostForVN.textContent = `$${total2.toFixed(6)}`;

    console.log("Checkbox is not selected");
  }
  console.log("total", total);
  console.log("total1", total1);
  console.log("total2", total2);
  console.log("total3", total3);

  var comparison1 = document.querySelector('[element="costComparisonForMN"]');
  var percentageChangeWithTwillio = ((total1 - total) / total1) * 100;
  var fullComparisonText = document.querySelector(
    '[element="full-comparison-text"]'
  );
  var fullComparisonTextVN = document.querySelector(
    '[element="full-costComparisonForVN-text"]'
  );
  if (percentageChangeWithTwillio < 0) {
    comparison1.textContent = `${Math.abs(
      percentageChangeWithTwillio.toFixed(2)
    )}% more`;
    fullComparisonText.style.display = "none";
  } else {
    comparison1.textContent = `${percentageChangeWithTwillio.toFixed(2)}% less`;
    fullComparisonText.style.display = "block";
  }

  var comparison2 = document.querySelector('[element="costComparisonForVN"]');
  var percentageChangeWithTwillio1 = ((total3 - total2) / total3) * 100;
  if (percentageChangeWithTwillio1 < 0) {
    comparison2.textContent = `${Math.abs(
      percentageChangeWithTwillio1.toFixed(2)
    )}% more`;
    fullComparisonTextVN.style.display = "none";
  } else {
    comparison2.textContent = `${percentageChangeWithTwillio1.toFixed(
      2
    )}% less`;
    fullComparisonTextVN.style.display = "block";
  }
  let idArray = [];
  var inputElements = document.querySelectorAll('[element="numberOfMessage"]');
  inputElements.forEach(function (input, index) {
    if (parseFloat(input.value) > 10000) {
      moreThanTenThousand = 1;
      var number = input.id.match(/\d+/);
      let id1 = number;
      if (number) {
        id1 = number;
      } else {
        id1 = "";
      }
      if (number) {
        makeContactSales(number[0]);
      } else {
        makeContactSales("");
      }
      // idArray.push(input.id);
    }
    console.log(typeof input.value);
  });
  if (moreThanTenThousand) {
    var section = document.querySelector('[element="complementary-section"]');
    if (section) {
      section.style.display = "none";
    }
    var sectionCustom = document.querySelector(
      '[element="complementary-section-custom"]'
    );
    if (sectionCustom) {
      sectionCustom.style.display = "block";
    }
    var percentageElement = document.querySelector(
      '[element="full-comparison-text"]'
    );
    if (percentageElement) {
      percentageElement.style.display = "none";
    }
    var totalMonthlyCostElement = document.querySelector(
      '[element="totalMonthlyCost"]'
    );
    if (totalMonthlyCostElement) {
      totalMonthlyCostElement.innerHTML =
        '<a element="totalMonthlyCost" href="/talk-to-expert" class="sms_contact--sales w-inline-block"><p class="text-size-regular text-color-seeblue-60 text-weight-bold">Contact Sales</p><img src="https://assets-global.website-files.com/6475ec9b171f837184813fcb/6599a8ec59675bce211a6873_outlined.png" loading="lazy" alt="" class="icon-1x1-xsmall"></a>';
    }
  }
}
function updateCheckbox() {
  var checkbox = document.getElementById("USD_INR_Checkbox");
  checkbox.addEventListener("change", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(updateFunction(checkbox), 250);
  });
}
function showHide() {
  var selectedCountryElement = document.getElementById("selectedCountry");
  console.log("selectedCountryElement", selectedCountryElement);
  var selectedCountryValue =
    selectedCountryElement.options[selectedCountryElement.selectedIndex].value;

  var numberOfMessageElement = document.getElementById("numberOfMessage");
  var numberOfMessageValue = numberOfMessageElement.value;

  if (selectedCountryValue !== "" && numberOfMessageValue !== "") {
    var section = document.querySelector('[element="complementary-section"]');
    if (section) {
      section.style.display = "block";
    }
    console.log("Selected Country:", selectedCountryValue);
    console.log("Number of Messages:", numberOfMessageValue);
  } else {
    var section = document.querySelector('[element="complementary-section"]');
    if (section) {
      section.style.display = "none";
    }
  }
  if (moreThanTenThousand) {
    var section = document.querySelector('[element="complementary-section"]');
    if (section) {
      section.style.display = "none";
    }
    var sectionCustom = document.querySelector(
      '[element="complementary-section-custom"]'
    );
    if (sectionCustom) {
      sectionCustom.style.display = "block";
    }
    var percentageElement = document.querySelector(
      '[element="full-comparison-text"]'
    );
    if (percentageElement) {
      percentageElement.style.display = "none";
    }
  }
}
function webView() {
  // document.addEventListener("DOMContentLoaded", function () {
  updateCheckbox();
  updateDropdowns();
  updateInputs();
  deleteInputs();
  showHide();
  setTimeout(() => {
    countriesData = [];
    const collectionItems = document.querySelectorAll(
      '[database="countryItem"]'
    );
    let i = 0;
    var rupee = 1;
    var currencyValue = document.querySelector(
      '[element="usdValueInINR"]'
    ).textContent;
    rupee = rupee * (parseFloat(currencyValue) ? parseFloat(currencyValue) : 1);
    collectionItems.forEach((item) => {
      const countryName = item
        .querySelector('[element="countryName"]')
        .innerText.trim();
      const countryPriceElement = item.querySelector(
        '[element="countryPrice"]'
      );
      const countryPrice = countryPriceElement.innerText.trim();
      const countryPriceElementTwillio = item
        .querySelector('[element="countryPriceTwilio"]')
        .innerText.trim();
      const countryPriceElementVN = item
        .querySelector('[element="countryPriceForVN"]')
        .innerText.trim();
      const countryPriceElementVNTwillio = item
        .querySelector('[element="countryPriceForVNTwilio"]')
        .innerText.trim();
      countriesData.push({
        id: i,
        name: countryName,
        price: countryPrice,
        twillioprice: countryPriceElementTwillio,
        vnprice: countryPriceElementVN,
        vntwillioprice: countryPriceElementVNTwillio,
        pricerupee: countryPrice * rupee,
        twilliopricerupee: countryPriceElementTwillio * rupee,
        vnpricerupee: countryPriceElementVN * rupee,
        vntwilliopricerupee: countryPriceElementVNTwillio * rupee,
      });
      i++;
    });
    console.log(countriesData);
    var dropdown = document.getElementById("selectedCountry");
    dropdown.value = "United States";
    var numberOfMessageInput = document.getElementById("numberOfMessage");
    numberOfMessageInput.value = "100";
    console.log("dropdown on load", dropdown.value);
    console.log("numberOfMessage", numberOfMessageInput.value);
    dropdown.dispatchEvent(new Event("change"));
    numberOfMessageInput.dispatchEvent(new Event("input"));
  }, 1000);

  document
    .querySelector('[element="addCountryBtn"]')
    .addEventListener("click", addMore);
}
function mobileView() {
  // document.addEventListener("DOMContentLoaded", function () {
  updateCheckbox();
  updateDropdowns();
  updateInputs();
  deleteInputsInMobileView();
  showHide();
  setTimeout(() => {
    countriesData = [];
    const collectionItems = document.querySelectorAll(
      '[database="countryItem"]'
    );
    let i = 0;
    var rupee = 1;
    var currencyValue = document.querySelector(
      '[element="usdValueInINR"]'
    ).textContent;
    rupee = rupee * (parseFloat(currencyValue) ? parseFloat(currencyValue) : 1);
    collectionItems.forEach((item) => {
      const countryName = item
        .querySelector('[element="countryName"]')
        .innerText.trim();
      const countryPriceElement = item.querySelector(
        '[element="countryPrice"]'
      );
      const countryPriceElementTwillio = item
        .querySelector('[element="countryPriceTwilio"]')
        .innerText.trim();
      const countryPriceElementVN = item
        .querySelector('[element="countryPriceForVN"]')
        .innerText.trim();
      const countryPriceElementVNTwillio = item
        .querySelector('[element="countryPriceForVNTwilio"]')
        .innerText.trim();
      const countryPrice = countryPriceElement.innerText.trim();
      countriesData.push({
        id: i,
        name: countryName,
        price: countryPrice,
        twillioprice: countryPriceElementTwillio,
        vnprice: countryPriceElementVN,
        vntwillioprice: countryPriceElementVNTwillio,
        pricerupee: countryPrice * rupee,
        twilliopricerupee: countryPriceElementTwillio * rupee,
        vnpricerupee: countryPriceElementVN * rupee,
        vntwilliopricerupee: countryPriceElementVNTwillio * rupee,
      });
      i++;
    });
    console.log(countriesData);
    var dropdown = document.getElementById("selectedCountry");
    dropdown.value = "United States";
    var numberOfMessageInput = document.getElementById("numberOfMessage");
    numberOfMessageInput.value = "100";
    console.log("dropdown on load", dropdown.value);
    console.log("numberOfMessage", numberOfMessageInput.value);
    dropdown.dispatchEvent(new Event("change"));
    numberOfMessageInput.dispatchEvent(new Event("input"));
  }, 1000);
  console.log("flag in mobile", flag);
  document
    .querySelector('[element="addCountryBtn"]')
    .addEventListener("click", addMoreMobileView);
  // });
}
window.addEventListener("load", checkViewport);
// window.addEventListener("resize", checkViewport);
