/*
    Given an array of characters chars, compress it using the following algorithm:
    
    Begin with an empty string s. For each group of consecutive repeating characters in chars:
        1) If the group's length is 1, append the character to s.
        2) Otherwise, append the character followed by the group's length.
    
    The compressed string s should not be returned separately, but instead be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars.

    After you are done modifying the input array, return the new length of the array.

    You must write an algorithm that uses only constant extra space.

    Example 1:
        Input: chars = ["a","a","b","b","c","c","c"]
        Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
        Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".
    
    Example 2:
        Input: chars = ["a"]
        Output: Return 1, and the first character of the input array should be: ["a"]
        Explanation: The only group is "a", which remains uncompressed since it's a single character.
    
    Example 3:
        Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
        Output: Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].
        Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".
    
    Example 4:
        Input: chars = ["a","a","a","b","b","a","a"]
        Output: Return 6, and the first 6 characters of the input array should be: ["a","3","b","2","a","2"].
        Explanation: The groups are "aaa", "bb", and "aa". This compresses to "a3b2a2". Note that each group is independent even if two groups have the same character.

    Constraints:
        1) 1 <= chars.length <= 2000
        2) chars[i] is a lower-case English letter, upper-case English letter, digit, or symbol.
*/
var compress = function(chars) {
    if(chars.length === 1) {
       return 1;
    }
    let charCount = 1;
    let indexes = [];
    for( let i=0; i<chars.length; i++ ){
        charCount = 1;
        if(indexes.includes(i)) {
                continue;
        }
        for( let j=i+1; j<chars.length; j++ ){
            if( chars[i] === chars[j] ) {
                charCount++;
            }
            else {
                break;
            }
        }
        if( charCount === 1 ) {
            continue;
        }
        let index = -1;
        if( charCount > 9 ) {
            for( let k=i; k<chars.length; k++ ){
                if( chars[k] != chars[k+1]) {
                    index = k+1;
                    break;
                }
            }
            let d = Math.abs((i+1) - (index-1)) + 1;
            if(d==0) {
                d = 1;
            }
            chars.splice(i+1, d);
            index = i+1;
            for( let k=0; k<String(charCount).length; k++ ) {
                    chars.splice(index, 0, String(charCount)[k]);
                indexes.push(index);
                index++;
            }
        } 
        else {
            for( let k=i; k<chars.length; k++ ){
                if( chars[k] != chars[k+1]) {
                    index = k+1;
                    break;
                }
            }
            let d = Math.abs((i+1) - (index-1)) + 1;
            if(d==0) {
                d = 1;
            }
            chars.splice(i+1, d);
            index = i+1;
            chars.splice(index, 0, String(charCount));
            indexes.push(index);
        }
    }
    return chars.length;
};
