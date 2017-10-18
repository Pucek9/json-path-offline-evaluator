function outputCorrect(id, output) {
    document.getElementById(id).style.backgroundColor = 'white';
    document.getElementById(id).value = output;
    document.getElementById('path').style.backgroundColor = 'white';
}

function outputWrong(e, id) {
    document.getElementById('output').style.backgroundColor = '#FF9F9F';
    document.getElementById('output').value = e;
    document.getElementById(id).style.backgroundColor = '#FF9F9F';
}

function convertToPretty(ugly) {
    var obj = JSON.parse(ugly);
    return JSON.stringify(obj, undefined, 4);
}

function prettyPrint(id) {
    var ugly = document.getElementById(id).value;
    try {
        var pretty = convertToPretty(ugly);
        outputCorrect(id, pretty);
    } catch (e) {
        console.error('wrong json format', e);
        outputWrong(e, id)
    }
}

function jsonEvaluate() {
    var result;
    var lib = document.getElementById('library').value;
    var json = document.getElementById('json').value;
    var path = document.getElementById('path').value;
    try {
        json = JSON.parse(json);
        try {
            if (lib === 'JsonPath') {
                result = jsonpath.query(json, path);
            } else {
                result = jsonPath.eval(json, path);
            }
            console.log('evaluate', path, 'from', json, 'by', lib, ':', result);
            outputCorrect('output', JSON.stringify(result));
            prettyPrint('json');
            prettyPrint('output');
        } catch (e) {
            console.error('evaluate', path, 'from', json, 'by', lib, ':', e);
            outputWrong(e, 'path');
        }
    } catch (e2) {
        outputWrong(e2, 'json');
    }


}

var exampleJson = {
    "store": {
        "book": [
            {
                "category": "reference",
                "author": "Nigel Rees",
                "title": "Sayings of the Century",
                "price": 8.95
            },
            {
                "category": "fiction",
                "author": "Evelyn Waugh",
                "title": "Sword of Honour",
                "price": 12.99
            },
            {
                "category": "fiction",
                "author": "Herman Melville",
                "title": "Moby Dick",
                "isbn": "0-553-21311-3",
                "price": 8.99
            },
            {
                "category": "fiction",
                "author": "J. R. R. Tolkien",
                "title": "The Lord of the Rings",
                "isbn": "0-395-19395-8",
                "price": 22.99
            }
        ],
        "bicycle": {
            "color": "red",
            "price": 19.95
        }
    }
};
var examplePath = '$.store.book[?(@.price>10)].author';

window.onload = function () {
    document.getElementById('path').placeholder = examplePath;
    document.getElementById('path').value = examplePath;
    jsonString = JSON.stringify(exampleJson);
    document.getElementById('json').placeholder = convertToPretty(jsonString);
    document.getElementById('json').value = jsonString;
    prettyPrint('json');
    jsonEvaluate();
};