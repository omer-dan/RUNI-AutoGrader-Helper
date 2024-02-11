function findDifference() {
    var errorText = document.getElementById("errorText").value;

    var startIndex = errorText.indexOf("The output for test") + "The output for test".length;
    var endIndex = errorText.indexOf("did not match");
    var methodAndInput = errorText.substring(startIndex, endIndex).trim();

    // Extract "expectedString" string
    startIndex = errorText.indexOf("Expected:%0") + "Expected:%0A".length;
    endIndex = errorText.indexOf("%0AActual:%0A");
    var expectedString = errorText.substring(startIndex, endIndex).trim();

    // Extract "actualString" string
    startIndex = errorText.indexOf("%0AActual:%0A") + "%0AActual:%0A".length;
    var actualString = errorText.substring(startIndex).trim();
    
    // Initialize output variable
    var output = "";

    // Call findDifferenceBetweenStrings and pass output by reference
    findDifferenceBetweenStrings(expectedString, actualString, output);
    
    // Display the output
    document.getElementById("output").innerHTML = output;
}


function findDifferenceBetweenStrings(expected, actual, output) {
    var expectedSentences = expected.split("%0A");
    var actualSentences = actual.split("%0A");


    for (var i = 0; i < Math.min(expectedSentences.length, actualSentences.length); i++) {
        var expectedWords = expectedSentences[i].split(' ');
        var actualWords = actualSentences[i].split(' ');

        for (var j = 0; j < Math.min(expectedWords.length, actualWords.length); j++) {
            if (expectedWords[j] !== actualWords[j]) {
                output += "Expected - " + expectedSentences[i] + "<br>" +
                          "Actual - " + actualSentences[i] + "<br>" +
                          "Difference - '" + actualWords[j] + "' should have been '" + expectedWords[j] + "'<br><br>";
            }
        }
        output += "- - - - - - - - - - - - -- - - - - - - <br>";
    }
}
