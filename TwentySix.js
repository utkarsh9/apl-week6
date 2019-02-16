var fs=require('fs');

var allWords=[[]];

var stopWords=[[]];

var nonStopWords=[[],function(){
    allWords[0].forEach(function(word){
        if(!stopWords[0].includes(word) && "s".localeCompare(word)){
            nonStopWords[0].push(word);
        }
    });
}];

var uniqueWords=[[],function(){
    nonStopWords[0].forEach(function(word){
        if(!uniqueWords[0].includes(word)){
            uniqueWords[0].push(word);
        }
    });
}];

var counts=[[],function(){
    var count;
    uniqueWords[0].forEach(function(word){
        count=nonStopWords[0].filter(function(nonStopWord){
            return word===nonStopWord;
        }).length;
        counts[0].push(count);
    });
}];

var sortedData=[[],function(){
        var i=0;
        var wordCountMap=new Map();
        for(i=0;i<uniqueWords[0].length;i++){
            wordCountMap.set(uniqueWords[0][i],counts[0][i]);
        }
        var sortedMap=new Map([...wordCountMap.entries()].sort((a,b)=>b[1]-a[1]));
        sortedData[0]=[...sortedMap];
}];

var allColumns=[allWords,stopWords,nonStopWords,uniqueWords,counts,sortedData];
allWords[0]=fs.readFileSync(process.argv[2], 'utf8').replace(/[\W_]+/g, ' ').toLowerCase().split(' ');
stopWords[0]=fs.readFileSync("stop-words.txt", 'utf8').split(",").map(str=>{return str.toLowerCase();});
update();
function update(){
    var a;
    for(a=0;a<allColumns.length;a++){
        if(allColumns[a].length>1){
            allColumns[a][1]();
        }
    } 
}
var j;
var data=sortedData[0];
for(j=0;j<25;j++){
    var element=data[j];
    console.log(element[0]+"-"+element[1]);
}