module.exports = function(){
	//Inserts a new line at 30 length segments, doesn't break strings
	function overFlowString(str){
		let strArr = str.split(' '),
	    	counter = 0,
	        segmentLength = 30
	        
	    for(let i=0; i<strArr.length; i++){
	    	if(counter < segmentLength){
	        	counter += strArr[i].length
	        }
	        else{
				//adds a new line to the beginning of the word
	            strArr[i] = strArr[i].replace(/^/,'\r\n')
	            counter = 0
	        }
	    }
	    return strArr.join(' ')
	}

	//Pads numbers with 0s to fit webvtt format if needed
	function pad(num){
		num = num < 10 ? '0' + num : num
		return num
	}

	//Converts seconds to 00:00:00.000 format
 	function secondsToTime(sec){
        var seconds = (sec%60).toFixed(3),
            minutes = Math.floor(sec / 60) % 60,
            hours = Math.floor(sec / 60 / 60)	
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    }

	//Generates a string that can be used in a vtt file
	function vtt(){
        var counter = 0,
            content = 'WEBVTT\r\n'
        this.add = (startingOffset, endingOffset, line)=>{
            ++counter
            content += `\n\r${counter}\r\n${secondsToTime(startingOffset)} --> ${secondsToTime(endingOffset)} \r\n${overFlowString(line)}`
        }
        this.toString = function(){
            return content
        }
    }
}