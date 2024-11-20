

function convertEmoji() {
    // console.log(finalMessage.raw());
    let ogMessage = document.getElementById('userInput').value;
    let ogMessageArr = ogMessage.split("\n");
    console.log(ogMessageArr);
    // console.log(ogMessage);
    // let url = "http://127.0.0.1:5000/getemoji?message=";
    let url = "http://37.27.51.34:33303/getemoji?message="
    

    let finalMessageStr = "";
    let responses = [];
    let promises = [];
    
    for (let i = 0; i < ogMessageArr.length; i++) {
        console.log(i);
        promises.push(
            fetch(url + ogMessageArr[i])
                .then((response) => response.json())
                .then((json) => ({ index: i, message: json['message'] })) // Include the index with the response
        );
    }
    
    Promise.all(promises).then((results) => {
        // Sort the results by the original order using the index
        results.sort((a, b) => a.index - b.index);
    
        for (let result of results) {
            console.log(result.message);
            finalMessageStr += result.message + "\n";
        }
    
        document.getElementById("output").value = finalMessageStr;
    })
}