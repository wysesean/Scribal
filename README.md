# Scribal
Scribal is an online education platform that rehosts videos taken down by a [recent lawsuit](https://boingboing.net/2017/03/17/fahrenheit-451.html) against Berkeley for not being ADA compliant. Scribal not only rehosts them but makes them ADA compliant by transcribing the educational videos on the platform through crowd-sourcing.
#### [Live website here](https://scribal.herokuapp.com/#home)


![screenshot2](https://res.cloudinary.com/dd21qo4mj/image/upload/v1494148161/Untitled_jicm2b.png)

## How it works:
##### On the front end:
###### Main Features:
* Users can pick and enroll in a course from a categorized selection
* Before users are allowed to watch a video for that course, a popup comes up forcing them to transcribe a randomly selected 7 second clip.
* Once the clip is transcribed it gets stored in a database where it will then be analyzed.
* The user can then proceed to their video.
* Process repeats for all other videos.

###### Other Features:
* Users can track their videos watched.
* Transcriptions are always available to be used even if they are incomplete. Just check the options for a video and use them if you'd like. A completion % and confidence % is provided.
![screenshot1](https://res.cloudinary.com/dd21qo4mj/image/upload/c_scale,w_880/v1494209160/Untitled2_yjv3gc.png)
##### On the back end:
###### Clips
* Clips are 7 second consecutive segments for the length of the video. So if a video is 35 seconds long, it will have 5 clips.
    * First clip covering an offset of 0 to 7 seconds.
    * Second clip covering an offset of 7 to 14 seconds. 
    * etc...
* To ensure that transcriptions cover words that are cut off at the boundary of clips, a second set of clips is generated. This set is offset by 2 seconds.
    * First clip in second set covers an offset of 2 to 9 seconds.
    * Second clip in second set covers an offset of 9 to 16 seconds.
    * etc
* When it comes time to generate transcriptions, the first clipset is merged with the second clip set accordingly.
###### [Click me to view how the merging works](https://matthiasak.github.io/arbiter-frame/#var%20UTIL%20%3D%20%7B%0A%09commonSubstring%28a%2Cb%29%20%7B%0A%09%20%20var%20longest%20%3D%20%22%22%3B%0A%09%20%20//Iterate%20through%20the%20first%20string%0A%09%20%20for%20%28var%20i%20%3D%200%3B%20i%20%3C%20a.length%3B%20++i%29%20%7B%0A%09%20%20%20%20//Iterate%20through%20the%20second%20string%0A%09%20%20%20%20for%20%28var%20j%20%3D%200%3B%20j%20%3C%20b.length%3B%20++j%29%20%7B%0A%09%20%20%20%20%20%20//if%20it%27s%20the%20same%20letter%0A%09%20%20%20%20%20%20if%20%28a%5Bi%5D%20%3D%3D%3D%20b%5Bj%5D%29%20%7B%0A%09%20%20%20%20%20%20%20%20var%20str%20%3D%20a%5Bi%5D%3B%0A%09%20%20%20%20%20%20%20%20var%20k%20%3D%201%3B%0A%09%20%20%20%20%20%20%20%20//%20keep%20going%20until%20the%20letters%20no%20longer%20match%2C%20or%20we%20reach%20end%0A%09%20%20%20%20%20%20%20%20while%20%28i+k%20%3C%20a.length%20%26%26%20j+k%20%3C%20b.length%20%26%26%20a%5Bi+k%5D%20%3D%3D%3D%20b%5Bj+k%5D%29%7B%20//%20same%20letter%0A%09%20%20%20%20%20%20%20%20%20%20str%20+%3D%20a%5Bi+k%5D%3B%0A%09%20%20%20%20%20%20%20%20%20%20++k%3B%0A%09%20%20%20%20%20%20%20%20%7D%0A%09%20%20%20%20%20%20%20%20if%20%28str.length%20%3E%20longest.length%29%7B%0A%09%20%20%20%20%20%20%20%20%20%20%20%20longest%20%3D%20str%0A%09%20%20%20%20%20%20%20%20%7D%0A%09%20%20%20%20%20%20%7D%0A%09%20%20%20%20%7D%0A%09%20%20%7D%0A%09%20%20return%20longest%3B%0A%09%7D%2C%0A%0A%09levenshtein_distance%28a%2C%20b%29%20%7B%0A%09%20%20%20%20a%3Da.toUpperCase%28%29%0A%09%20%20%20%20b%3Db.toUpperCase%28%29%0A%09%20%20%20%20//If%20strings%20are%20empty%2C%20return%20opposite%20strings%20length%0A%09%20%20%20%20if%28a.length%20%3D%3D%200%29%20return%20b.length%20%0A%09%20%20%20%20if%28b.length%20%3D%3D%200%29%20return%20a.length%0A%09%20%20%0A%09%09//Create%20the%20matrix%0A%09%20%20%20%20var%20matrix%20%3D%20%5B%5D%3B%0A%09%20%20%20%20for%28let%20i%20%3D%200%3B%20i%20%3C%3D%20b.length%3B%20i++%29%7B%0A%09%20%20%20%20%20%20matrix%5Bi%5D%20%3D%20%5Bi%5D%0A%09%20%20%20%20%7D%0A%09%20%20%20%20for%28let%20j%20%3D%200%3B%20j%20%3C%3D%20a.length%3B%20j++%29%7B%0A%09%20%20%20%20%20%20matrix%5B0%5D%5Bj%5D%20%3D%20j%0A%09%20%20%20%20%7D%0A%0A%09%20%20%09//Iterate%20through%20i%20axis%2C%20or%20first%20word%0A%09%20%20%20%20for%28let%20i%20%3D%201%3B%20i%20%3C%3D%20b.length%3B%20i++%29%7B%0A%09%09%09//Iterate%20through%20j%20axis%2C%20or%20second%20word%0A%09%20%20%20%20%09for%28let%20j%20%3D%201%3B%20j%20%3C%3D%20a.length%3B%20j++%29%7B%0A%09%20%20%20%20%09%09//If%20characters%20are%20equal%0A%09%09%20%20%20%20%20%20%20%20if%28b.charAt%28i-1%29%20%3D%3D%3D%20a.charAt%28j-1%29%29%7B%0A%09%09%20%20%20%20%20%20%20%20%20%20matrix%5Bi%5D%5Bj%5D%20%3D%20matrix%5Bi-1%5D%5Bj-1%5D%0A%09%09%20%20%20%20%20%20%20%20%7D%20%0A%09%20%20%20%20%20%20%20%20else%20%7B%0A%09%20%20%20%20%20%20%20%20%20%20matrix%5Bi%5D%5Bj%5D%20%3D%20Math.min%28%0A%09%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20matrix%5Bi-1%5D%5Bj-1%5D%20+%201%2C%20//Represents%20a%20substition%0A%09%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20matrix%5Bi%5D%5Bj-1%5D%20+%201%2C%20//Represents%20an%20insertion%0A%09%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20matrix%5Bi-1%5D%5Bj%5D%20+%201%20//Represents%20a%20deletion%0A%09%20%20%20%20%20%20%20%20%20%20%09%09%09%09%29%0A%09%20%20%20%20%20%20%20%20%7D%0A%09%20%20%20%20%20%20%7D%0A%09%20%20%20%20%7D%0A%09%20%20%20%20return%20matrix%5Bb.length%5D%5Ba.length%5D%0A%09%7D%2C%0A%0A%09//returns%20the%20total%20edit%20distance%20between%20between%20a%20single%20string%20against%20all%20other%20string%20in%20an%20array%0A%09totalDistance%28arr%2C%20str%29%7B%0A%09%09return%20arr.reduce%28%28total%2CsingleElem%29%3D%3E%7B%0A%09%20%20%20%20%20%20%20%20return%20total+this.levenshtein_distance%28singleElem%2Cstr%29%0A%09%20%20%20%20%7D%2C0%29%0A%09%7D%2C%0A%20%20%20%20averageSimilarity%28arr%2C%20str%29%7B%0A%20%20%20%20%09var%20average%20%3D%200%0A%20%20%20%20%20%20%20%20var%20total%20%3D%20arr.length%0A%20%20%20%20%20%20%20%20arr.forEach%28%28el%29%3D%3E%7B%0A%20%20%20%20%20%20%20%20%09average%20+%3D%20this.similarity%28el%2Cstr%29%0A%20%20%20%20%20%20%20%20%7D%29%0A%20%20%20%20%20%20%20%20return%20average/total%0A%20%20%20%20%7D%2C%0A%20%20%20%20similarity%28s1%2C%20s2%29%20%7B%0A%20%20%20%20%20%20var%20longer%20%3D%20s1%3B%0A%20%20%20%20%20%20var%20shorter%20%3D%20s2%3B%0A%20%20%20%20%20%20if%20%28s1.length%20%3C%20s2.length%29%20%7B%0A%20%20%20%20%20%20%20%20longer%20%3D%20s2%3B%0A%20%20%20%20%20%20%20%20shorter%20%3D%20s1%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20var%20longerLength%20%3D%20longer.length%3B%0A%20%20%20%20%20%20if%20%28longerLength%20%3D%3D%200%29%20%7B%0A%20%20%20%20%20%20%20%20return%201.0%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20return%20%28longerLength%20-%20this.levenshtein_distance%28longer%2C%20shorter%29%29%20/%20parseFloat%28longerLength%29%3B%0A%20%20%20%20%7D%2C%0A%0A%09//Returns%20the%20string%20with%20the%20lowest%20edit%20distance%20against%20all%20other%20strings%20in%20an%20array%0A%09//In%20other%20words%2C%20returns%20the%20most%20%27average%27%20strings%0A%09lowestDistance%28arr%29%7B%0A%09%20%20%20%20let%20lowest%20%3D%20arr%5B0%5D%0A%09%20%20%20%20let%20prevLowest%20%3D%20this.totalDistance%28arr%2Carr%5B0%5D%29%0A%09%09for%28let%20i%20%3D%200%3B%20i%3Carr.length%3B%20i++%29%7B%0A%09%20%20%20%20%20%20%20%20let%20nextLowest%20%3D%20this.totalDistance%28arr%2Carr%5Bi%5D%29%0A%09%20%20%20%20%09if%28nextLowest%3CprevLowest%29%7B%0A%09%20%20%20%20%20%20%20%20%20%20%20%20prevLowest%20%3D%20nextLowest%0A%09%20%20%20%20%20%20%20%20%09lowest%20%3D%20arr%5Bi%5D%0A%09%20%20%20%20%20%20%20%20%7D%0A%09%20%20%20%20%7D%0A%09%20%20%20%20return%20lowest%0A%09%7D%2C%0A%0A%09//Joins%20two%20seperate%20strings%20together%20by%20their%20longest%20common%20subsequence%0A%09stringJoiner%28str1%2Cstr2%29%7B%0A%09%20%20%20%20if%28str1.length%3D%3D%3D0%29%20return%20str2%0A%09%20%20%20%20if%28str2.length%3D%3D%3D0%29%20return%20str1%0A%20%20%20%20%20%20%20%20str1.trim%28%29%0A%20%20%20%20%20%20%20%20str2.trim%28%29%0A%09%20%20%20%20var%20commonString%20%3D%20this.commonSubstring%28str1%2C%20str2%29.trim%28%29%0A%0A%09%20%20%20%20return%20%28%0A%09%20%20%20%20%09str1.substring%280%2Cstr1.indexOf%28commonString%29%29%0A%20%20%20%20%20%20%20%20%20%20%20%20+commonString%20%20%20%20%20%20%20%20%20%20%0A%20%09%09%09+str2.substring%28str2%0A%20%20%20%20%20%20%20%20%20%09%09.indexOf%28commonString%29%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20+commonString%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20.length%2Cstr2.length%29%0A%20%20%20%20%20%20%20%20%29%0A%09%7D%2C%0A%20%20%20%20%20%20%20%20%0A%7D%0A%0Alet%20str1%20%3D%20%27A%20wonderful%20serenity%20has%20taken%20possession%20of%20my%20entire%20soul%2C%20like%20these%20sw%27%2C%0A%20%20%20%0Astr2%20%3D%20%27entire%20soul%2C%20like%20these%20sweet%20mornings%20of%20spring%20which%20I%20enjoy%20with%20my%20whole%20heart.%27%2C%0A%20%20%20%20%20%0Ajoined%20%3D%20UTIL.stringJoiner%28str1%2C%20str2%29%0A%0Alog%28%27str1%20%3D%20%27%2C%20str1%29%0Alog%28%27%5Cnstr2%20%3D%27%2C%20str2%29%0A%0Alog%28%22%5Cnstr1%20+%20str2%20%3D%22%2C%20joined%29) 

###### Input Filter
* User inputs for random clip transcriptions are stored in a database.
* A random clip can be served up multiple times to different users and each different user's input is stored.
* With a collection of inputs for a clip, the levenshtein distance (or edit distance) is compared across and agasint all inputs. 
* The input which has the lowest average levenshtein distance is used in the final transcription.
* If none of that made any sense, essentially the filter looks at a collection of strings and returns the most "average" looking string for that clip. 
###### [Click me to view how the noise filter works](https://matthiasak.github.io/arbiter-frame/#var%20UTIL%20%3D%20%7B%0A%09commonSubstring%28a%2Cb%29%20%7B%0A%09%20%20var%20longest%20%3D%20%22%22%3B%0A%09%20%20//Iterate%20through%20the%20first%20string%0A%09%20%20for%20%28var%20i%20%3D%200%3B%20i%20%3C%20a.length%3B%20++i%29%20%7B%0A%09%20%20%20%20//Iterate%20through%20the%20second%20string%0A%09%20%20%20%20for%20%28var%20j%20%3D%200%3B%20j%20%3C%20b.length%3B%20++j%29%20%7B%0A%09%20%20%20%20%20%20//if%20it%27s%20the%20same%20letter%0A%09%20%20%20%20%20%20if%20%28a%5Bi%5D%20%3D%3D%3D%20b%5Bj%5D%29%20%7B%0A%09%20%20%20%20%20%20%20%20var%20str%20%3D%20a%5Bi%5D%3B%0A%09%20%20%20%20%20%20%20%20var%20k%20%3D%201%3B%0A%09%20%20%20%20%20%20%20%20//%20keep%20going%20until%20the%20letters%20no%20longer%20match%2C%20or%20we%20reach%20end%0A%09%20%20%20%20%20%20%20%20while%20%28i+k%20%3C%20a.length%20%26%26%20j+k%20%3C%20b.length%20%26%26%20a%5Bi+k%5D%20%3D%3D%3D%20b%5Bj+k%5D%29%7B%20//%20same%20letter%0A%09%20%20%20%20%20%20%20%20%20%20str%20+%3D%20a%5Bi+k%5D%3B%0A%09%20%20%20%20%20%20%20%20%20%20++k%3B%0A%09%20%20%20%20%20%20%20%20%7D%0A%09%20%20%20%20%20%20%20%20if%20%28str.length%20%3E%20longest.length%29%7B%0A%09%20%20%20%20%20%20%20%20%20%20%20%20longest%20%3D%20str%0A%09%20%20%20%20%20%20%20%20%7D%0A%09%20%20%20%20%20%20%7D%0A%09%20%20%20%20%7D%0A%09%20%20%7D%0A%09%20%20return%20longest%3B%0A%09%7D%2C%0A%0A%09levenshtein_distance%28a%2C%20b%29%20%7B%0A%09%20%20%20%20a%3Da.toUpperCase%28%29%0A%09%20%20%20%20b%3Db.toUpperCase%28%29%0A%09%20%20%20%20//If%20strings%20are%20empty%2C%20return%20opposite%20strings%20length%0A%09%20%20%20%20if%28a.length%20%3D%3D%200%29%20return%20b.length%20%0A%09%20%20%20%20if%28b.length%20%3D%3D%200%29%20return%20a.length%0A%09%20%20%0A%09%09//Create%20the%20matrix%0A%09%20%20%20%20var%20matrix%20%3D%20%5B%5D%3B%0A%09%20%20%20%20for%28let%20i%20%3D%200%3B%20i%20%3C%3D%20b.length%3B%20i++%29%7B%0A%09%20%20%20%20%20%20matrix%5Bi%5D%20%3D%20%5Bi%5D%0A%09%20%20%20%20%7D%0A%09%20%20%20%20for%28let%20j%20%3D%200%3B%20j%20%3C%3D%20a.length%3B%20j++%29%7B%0A%09%20%20%20%20%20%20matrix%5B0%5D%5Bj%5D%20%3D%20j%0A%09%20%20%20%20%7D%0A%0A%09%20%20%09//Iterate%20through%20i%20axis%2C%20or%20first%20word%0A%09%20%20%20%20for%28let%20i%20%3D%201%3B%20i%20%3C%3D%20b.length%3B%20i++%29%7B%0A%09%09%09//Iterate%20through%20j%20axis%2C%20or%20second%20word%0A%09%20%20%20%20%09for%28let%20j%20%3D%201%3B%20j%20%3C%3D%20a.length%3B%20j++%29%7B%0A%09%20%20%20%20%09%09//If%20characters%20are%20equal%0A%09%09%20%20%20%20%20%20%20%20if%28b.charAt%28i-1%29%20%3D%3D%3D%20a.charAt%28j-1%29%29%7B%0A%09%09%20%20%20%20%20%20%20%20%20%20matrix%5Bi%5D%5Bj%5D%20%3D%20matrix%5Bi-1%5D%5Bj-1%5D%0A%09%09%20%20%20%20%20%20%20%20%7D%20%0A%09%20%20%20%20%20%20%20%20else%20%7B%0A%09%20%20%20%20%20%20%20%20%20%20matrix%5Bi%5D%5Bj%5D%20%3D%20Math.min%28%0A%09%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20matrix%5Bi-1%5D%5Bj-1%5D%20+%201%2C%20//Represents%20a%20substition%0A%09%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20matrix%5Bi%5D%5Bj-1%5D%20+%201%2C%20//Represents%20an%20insertion%0A%09%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20matrix%5Bi-1%5D%5Bj%5D%20+%201%20//Represents%20a%20deletion%0A%09%20%20%20%20%20%20%20%20%20%20%09%09%09%09%29%0A%09%20%20%20%20%20%20%20%20%7D%0A%09%20%20%20%20%20%20%7D%0A%09%20%20%20%20%7D%0A%09%20%20%20%20return%20matrix%5Bb.length%5D%5Ba.length%5D%0A%09%7D%2C%0A%0A%09//returns%20the%20total%20edit%20distance%20between%20between%20a%20single%20string%20against%20all%20other%20string%20in%20an%20array%0A%09totalDistance%28arr%2C%20str%29%7B%0A%09%09return%20arr.reduce%28%28total%2CsingleElem%29%3D%3E%7B%0A%09%20%20%20%20%20%20%20%20return%20total+this.levenshtein_distance%28singleElem%2Cstr%29%0A%09%20%20%20%20%7D%2C0%29%0A%09%7D%2C%0A%20%20%20%20averageSimilarity%28arr%2C%20str%29%7B%0A%20%20%20%20%09var%20average%20%3D%200%0A%20%20%20%20%20%20%20%20var%20total%20%3D%20arr.length%0A%20%20%20%20%20%20%20%20arr.forEach%28%28el%29%3D%3E%7B%0A%20%20%20%20%20%20%20%20%09average%20+%3D%20this.similarity%28el%2Cstr%29%0A%20%20%20%20%20%20%20%20%7D%29%0A%20%20%20%20%20%20%20%20return%20average/total%0A%20%20%20%20%7D%2C%0A%20%20%20%20similarity%28s1%2C%20s2%29%20%7B%0A%20%20%20%20%20%20var%20longer%20%3D%20s1%3B%0A%20%20%20%20%20%20var%20shorter%20%3D%20s2%3B%0A%20%20%20%20%20%20if%20%28s1.length%20%3C%20s2.length%29%20%7B%0A%20%20%20%20%20%20%20%20longer%20%3D%20s2%3B%0A%20%20%20%20%20%20%20%20shorter%20%3D%20s1%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20var%20longerLength%20%3D%20longer.length%3B%0A%20%20%20%20%20%20if%20%28longerLength%20%3D%3D%200%29%20%7B%0A%20%20%20%20%20%20%20%20return%201.0%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20return%20%28longerLength%20-%20this.levenshtein_distance%28longer%2C%20shorter%29%29%20/%20parseFloat%28longerLength%29%3B%0A%20%20%20%20%7D%2C%0A%0A%09//Returns%20the%20string%20with%20the%20lowest%20edit%20distance%20against%20all%20other%20strings%20in%20an%20array%0A%09//In%20other%20words%2C%20returns%20the%20most%20%27average%27%20strings%0A%09lowestDistance%28arr%29%7B%0A%09%20%20%20%20let%20lowest%20%3D%20arr%5B0%5D%0A%09%20%20%20%20let%20prevLowest%20%3D%20this.totalDistance%28arr%2Carr%5B0%5D%29%0A%09%09for%28let%20i%20%3D%200%3B%20i%3Carr.length%3B%20i++%29%7B%0A%09%20%20%20%20%20%20%20%20let%20nextLowest%20%3D%20this.totalDistance%28arr%2Carr%5Bi%5D%29%0A%09%20%20%20%20%09if%28nextLowest%3CprevLowest%29%7B%0A%09%20%20%20%20%20%20%20%20%20%20%20%20prevLowest%20%3D%20nextLowest%0A%09%20%20%20%20%20%20%20%20%09lowest%20%3D%20arr%5Bi%5D%0A%09%20%20%20%20%20%20%20%20%7D%0A%09%20%20%20%20%7D%0A%09%20%20%20%20return%20lowest%0A%09%7D%2C%0A%0A%09//Joins%20two%20seperate%20strings%20together%20by%20their%20longest%20common%20subsequence%0A%09stringJoiner%28str1%2Cstr2%29%7B%0A%09%20%20%20%20if%28str1.length%3D%3D%3D0%29%20return%20str2%0A%09%20%20%20%20if%28str2.length%3D%3D%3D0%29%20return%20str1%0A%20%20%20%20%20%20%20%20str1.trim%28%29%0A%20%20%20%20%20%20%20%20str2.trim%28%29%0A%09%20%20%20%20var%20commonString%20%3D%20this.commonSubstring%28str1%2C%20str2%29.trim%28%29%0A%0A%09%20%20%20%20return%20%28%0A%09%20%20%20%20%09str1.substring%280%2Cstr1.indexOf%28commonString%29%29%0A%20%20%20%20%20%20%20%20%20%20%20%20+commonString%20%20%20%20%20%20%20%20%20%20%0A%20%09%09%09+str2.substring%28str2%0A%20%20%20%20%20%20%20%20%20%09%09.indexOf%28commonString%29%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20+commonString%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20.length%2Cstr2.length%29%0A%20%20%20%20%20%20%20%20%29%0A%09%7D%2C%0A%20%20%20%20%20%20%20%20%0A%7D%0A%0Alet%20str1Arr%20%3D%20%5B%27dogs%20are%20cool%27%2C%0A%20%20%20%20%20%27dogs%20are%20cool%3F%27%2C%0A%20%20%20%20%20%27dogs%20arent%20cool%27%5D%2C%0A%20%20%20%20%0A%20%20%20%20str2Arr%20%3D%20%5B%27cool%20and%20asdf%3Baskldjf%27%2C%0A%20%20%20%20%20%27cool%20and%20fun%27%2C%0A%20%20%20%20%20%27kewl%20and%20Fun%27%5D%2C%0A%0Astr1Best%20%3D%20UTIL.lowestDistance%28str1Arr%29%2C%0A%20%20%20%20%0Astr2Best%20%3D%20UTIL.lowestDistance%28str2Arr%29%2C%0Ajoined%20%3D%20UTIL.stringJoiner%28str1Best%2C%20str2Best%29%0A%0Alog%28%22str1Arr%3A%22%2C%20str1Arr%29%0Alog%28%22%5Cnstr1Best%3A%20%22%2Cstr1Best%29%0A%0Alog%28%22%5Cnstr2Arr%3A%22%2C%20str2Arr%29%0Alog%28%22%5Cnstr2Best%3A%22%2Cstr2Best%29%0A%0Alog%28%22%5Cnjoined%20strings%22%2C%20joined%29)
# Tech

Scribal uses a number of open source projects to work properly:

* [MongoDB](https://www.mongodb.com/) - For the database.
* [MongooseJS](http://mongoosejs.com/) - MongoDB js wrapper
* [Express](https://expressjs.com/) - For user creation
* [ReactJS](https://facebook.github.io/react/) - For the view
* [NodeJS](https://nodejs.org/en/) - For all things back-end
* [BackboneJS](http://backbonejs.org/) - For putting the MC in MVC
* [Cloudinary](http://cloudinary.com/) - For hosting my videos and parsing them.
* [VideoJS](http://videojs.com/) - For making my video player not look super ugly
* [Materialize](http://materializecss.com/) - For not making the whole site look super ugly


### Installation
```
git clone https://github.com/wysesean/Scribal.git
cd Scribal
npm install
mongod (in a new tab)
npm run go

open localhost:3000 in the browser
```


License
----

MIT


**Free Software, Hell Yeah!**


