var UTIL = {
	levenshtein_distance(a, b) {
	    a=a.toUpperCase()
	    b=b.toUpperCase()
	    if(a.length == 0) return b.length 
	    if(b.length == 0) return a.length
	  
	    var matrix = [];
	    for(let i = 0; i <= b.length; i++){
	      matrix[i] = [i]
	    }
	  
	    for(let j = 0; j <= a.length; j++){
	      matrix[0][j] = j
	    }
	  
	    for(let i = 1; i <= b.length; i++){
	      for(let j = 1; j <= a.length; j++){
	        if(b.charAt(i-1) === a.charAt(j-1)){
	          matrix[i][j] = matrix[i-1][j-1]
	        } 
	        else {
	          matrix[i][j] = Math.min(
	                            matrix[i-1][j-1] + 1,
	                            matrix[i][j-1] + 1,
	                            matrix[i-1][j] + 1
	          				)
	        }
	      }
	    }
	    return matrix[b.length][a.length]
	},

	totalDistance(arr, str){
		return arr.reduce((total,singleElem)=>{
	        return total+levenshtein_distance(singleElem,str)
	    },0)
	    
	},

	lowestDistance(arr){
	    var lowest = arr[0]
		for(var i = 0; i<arr.length; i++){
	    	if(totalDistance(arr,arr[i])<totalDistance(arr,lowest)){
	        	lowest = arr[i]
	        }
	    }
	    return lowest
	}
}

module.exports = {
	UTIL: UTIL
}