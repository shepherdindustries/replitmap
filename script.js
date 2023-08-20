var getFromZip, getToZip;

function getValueFrom() {
    var fromZipValue = document.getElementById("fromZip").value;
    if (/^\d{5}$/.test(fromZipValue)) {
        getFromZip = fromZipValue;
        fromZip();
        checkZone();
    }
}

function getValueTo() {
    var toZipValue = document.getElementById("toZip").value;
    if (/^\d{5}$/.test(toZipValue)) {
        getToZip = toZipValue;
        fromZip();
        toZip();
        checkZone();
    } else {
        document.getElementById("zoneInfoWrap").style.display = "none";
    }
}

function fromZip() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            getFrom(this);
       
        }
    };
    xhttp.open("GET", 'https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID="364SIMPL0013"><ZipCode ID="1"><Zip5>' + getFromZip + "</Zip5></ZipCode></CityStateLookupRequest>", true);
    xhttp.send();
    
    var imgMap = "https://images.simplfulfillment.com/file/usps-images/" + getFromZip.substring(0, 3) + ".png";
    document.getElementById("zoneMapImage").setAttribute("src", imgMap);

}

function getFrom(xml) {
var xmlDoc = xml.responseXML;
var city = xmlDoc.getElementsByTagName("City")[0];
var state = xmlDoc.getElementsByTagName("State")[0];
var description = xmlDoc.getElementsByTagName("Description")[0];
if (description === undefined || description.length === 0) {
    city = city.textContent.charAt(0).toUpperCase() + city.textContent.substr(1).toLowerCase();
    state = state.textContent;
    document.getElementById("fromCS").innerHTML = city + ", " + state + " to ";
} else {
    description = description.textContent;
    document.getElementById("toast-message").innerHTML = description;
    document.getElementById("alert-wrap").style.display = "block";
    setTimeout(function () {
        document.getElementById("alert-wrap").style.display = "none";
    }, 3000);
}
}

function toZip() {
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
if (this.readyState === 4 && this.status === 200) {
getTo(this);
}
};
xhttp.open("GET", 'https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID="364SIMPL0013"><ZipCode ID="1"><Zip5>' + getToZip + "</Zip5></ZipCode></CityStateLookupRequest>", true);
xhttp.send();
document.getElementById("zoneInfoWrap").style.display = "block";

}

function getTo(xml) {
var xmlDoc = xml.responseXML;
var city = xmlDoc.getElementsByTagName("City")[0];
var state = xmlDoc.getElementsByTagName("State")[0];
var description = xmlDoc.getElementsByTagName("Description")[0];


if (description === undefined || description.length === 0) {
    city = city.textContent.charAt(0).toUpperCase() + city.textContent.substr(1).toLowerCase();
    state = state.textContent;
    document.getElementById("toCS").innerHTML = city + ", " + state;
} else {
    description = description.textContent;
    document.getElementById("toast-message").innerHTML = description;
    document.getElementById("alert-wrap").style.display = "block";
    document.getElementById("zoneInfoWrap").style.display = "none";
    setTimeout(function () {
        document.getElementById("alert-wrap").style.display = "none";
    }, 3000);
}
}

function checkZone() {
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
if (this.readyState === 4 && this.status === 200) {
var zone = this.responseXML.getElementsByTagName("Zone")[0].textContent;
document.getElementById("zone").innerHTML = " Zone " + zone;
}
};3C/Service%3E%3CFirstClassMailType%3EParcel%3C/FirstClassMailType%3E%3CZipOrigination%3E" + getFromZip + "%3C/ZipOrigination%3E%3CZipDestination%3E" + getToZip + "%3C/ZipDestination%3E%3CPounds%3E0%3C/Pounds%3E%3COunces%3E3%3C/Ounces%3E%3CContainer%3ERectangular%3C/Container%3E%3CSize%3EVariable%3C/Size%3E%3CMachinable%3Etrue%3C/Machinable%3E%3C/Package%3E%3C/RateV4Request%3E", true);
xhttp.send();
}

// Add an event listener for when the user submits the form
document.getElementById("fromZip").addEventListener("keyup", function (event) {
if (event.keyCode === 13) {
event.preventDefault();
getValueFrom();
}
});

document.getElementById("toZip").addEventListener("keyup", function (event) {
if (event.keyCode === 13) {
event.preventDefault();
getValueTo();
}
});

</script>