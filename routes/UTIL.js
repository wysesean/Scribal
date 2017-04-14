var UTIL = {
	commonSubstring(a,b) {
	  var longest = "";
	  // loop through the first string
	  for (var i = 0; i < a.length; ++i) {
	    // loop through the second string
	    for (var j = 0; j < b.length; ++j) {
	      // if it's the same letter
	      if (a[i] === b[j]) {
	        var str = a[i];
	        var k = 1;
	        // keep going until the letters no longer match, or we reach end
	        while (i+k < a.length && j+k < b.length && a[i+k] === b[j+k]){ // same letter
	          str += a[i+k];
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

	levenshtein_distance(a, b) {
	    a=a.toUpperCase()
	    b=b.toUpperCase()
	    //If strings are empty, return opposite strings length
	    if(a.length == 0) return b.length 
	    if(b.length == 0) return a.length
	  
		//Create the matrix
	    var matrix = [];
	    for(let i = 0; i <= b.length; i++){
	      matrix[i] = [i]
	    }
	    for(let j = 0; j <= a.length; j++){
	      matrix[0][j] = j
	    }

	  	//Iterate through i axis, or first word
	    for(let i = 1; i <= b.length; i++){
			//Iterate through j axis, or second word
	    	for(let j = 1; j <= a.length; j++){
	    		//If characters are equal
		        if(b.charAt(i-1) === a.charAt(j-1)){
		          matrix[i][j] = matrix[i-1][j-1]
		        } 
	        else {
	          matrix[i][j] = Math.min(
	                            matrix[i-1][j-1] + 1, //Represents a substition
	                            matrix[i][j-1] + 1, //Represents an insertion
	                            matrix[i-1][j] + 1 //Represents a deletion
	          				)
	        }
	      }
	    }
	    return matrix[b.length][a.length]
	},

	//returns the total edit distance between between a single string against all other string in an array
	totalDistance(arr, str){
		return arr.reduce((total,singleElem)=>{
	        return total+this.levenshtein_distance(singleElem,str)
	    },0)
	},

	//Returns the string with the lowest edit distance against all other strings in an array
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

	//Joins two seperate strings together if they have any commonality
	stringJoiner(str1,str2){
	    if(str1.length===0) return str2
	    if(str2.length===0) return str1
	    var commonString = this.commonSubstring(str1, str2)
	    return str1+str2.substring(str2.indexOf(commonString)+commonString.length,str2.length)
	}
}

module.exports = {
	UTIL: UTIL
}