const UTIL = {
	commonSubstring(str1,str2) {
	  var longest = "";
	  //Iterate through the first string
	  for (var i = 0; i < str1.length; ++i) {
	    //Iterate through the second string
	    for (var j = 0; j < str2.length; ++j) {
	      //if it's the same word
	      if (str1[i] === str2[j]) {
	        var str = str1[i];
	        var k = 1;
	        // keep going until the words no longer match, or we reach end
	        while (i+k < str1.length && j+k < str2.length && str1[i+k] === str2[j+k]){ // same letter
	          str += str1[i+k];
	          ++k;
	        }
	        if (str.length > longest.length){
	            longest = str
	        }
	      }
	    }
	  }
	  return longest;
	},
	//Retruns total amount of subsitutions, insertions and deletions necesseary to transform one word to another
	levenshtein_distance(str1, str2) {
	    str1=str1.toUpperCase()
	    str2=str2.toUpperCase()
	    //If strings are empty, return opposite strings length
	    if(str1.length == 0) return str2.length 
	    if(str2.length == 0) return str1.length
	  
		//Create the matrix
	    var matrix = [];
	    for(let i = 0; i <= str2.length; i++){
	      matrix[i] = [i]
	    }
	    for(let j = 0; j <= str1.length; j++){
	      matrix[0][j] = j
	    }

	  	//Iterate through i axis, or first word
	    for(let i = 1; i <= str2.length; i++){
			//Iterate through j axis, or second word
	    	for(let j = 1; j <= str1.length; j++){
	    		//If characters are equal
		        if(str2.charAt(i-1) === str1.charAt(j-1)){
		          matrix[i][j] = matrix[i-1][j-1]
		        } 
	        else {
	          matrix[i][j] = Math.min(
	                            matrix[i-1][j-1] + 1, //Represents a substitution
	                            matrix[i][j-1] + 1, //Represents an insertion
	                            matrix[i-1][j] + 1 //Represents a deletion
	          				)
	        }
	      }
	    }
	    //Retruns total amount of subsitutions, insertions and deletions necesseary to transform one word to another
	    return matrix[str2.length][str1.length]
	},

	//returns the total edit distance between between a single string against all other string in an array
	totalDistance(arr, str){
		return arr.reduce((total,singleElem)=>{
	        return total+this.levenshtein_distance(singleElem,str)
	    },0)
	},

	//Returns the string with the lowest edit distance against all other strings in an array
	//In other words, returns the most 'average' strings
	lowestDistance(arr){
	    let lowest = arr[0]
	    let prevLowest = this.totalDistance(arr,arr[0])
		for(let i = 0; i<arr.length; i++){
	        let nextLowest = this.totalDistance(arr,arr[i])
	    	if(nextLowest<prevLowest){
	            prevLowest = nextLowest
	        	lowest = arr[i]
	        }
	    }
	    return lowest
	},

	//Joins two seperate strings together by their longest common subsequence
	stringJoiner(str1,str2){
		//Check for undefined
		if(str1&&!str2) return str1
		if(str2&&!str1) return str2
		if(!str1&&!str2) return ''

		//Check for string length
		if(str2.length===0) return str1
		if(str1.length===0) return str2
        str1.trim()
        str2.trim()
	    var commonString = this.commonSubstring(str1, str2).trim()

	    return (
	    	str1.substring(0,str1.indexOf(commonString))
            +commonString          
            +str2.substring(str2.indexOf(commonString)+commonString.length,str2.length)
        )
	},

	//Returns the average similarity of one string against strings in an array.
	//Essentially this returns the "confidence" of the string when making a subtitle
	averageSimilarity(arr, str){		
    	var average = 0
        var total = arr.length
        arr.forEach((el)=>{
        	average += this.similarity(el,str)
        })
        return average/total
	},

	//Returns the similarity of one string compared to another.
	similarity(str1, str2) {
		//Check for undefined
		if(!str1||!str2) return 0
		//Set longest string
		var longer = str1;
		var shorter = str2;
		if (str1.length < str2.length){
			longer = str2;
			shorter = str1;
		}
		var longerLength = longer.length;
		if (longerLength == 0) {
			return 1.0;
		}
		return (longerLength - this.levenshtein_distance(longer, shorter)) / parseFloat(longerLength);
	},
}

module.exports = UTIL
