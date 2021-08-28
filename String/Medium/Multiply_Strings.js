/*
        Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.
        Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.

        Example 1:
                Input: num1 = "2", num2 = "3"
                Output: "6"
        Example 2:
                Input: num1 = "123", num2 = "456"
                Output: "56088"

        Constraints:
                1) 1 <= num1.length, num2.length <= 200
                2) num1 and num2 consist of digits only.
                3) Both num1 and num2 do not contain any leading zero, except the number 0 itself.

*/

/*
 * @param { string } num1
 * @param { string } num2
 * @return { string }
*/

var addStrings = function( num1, num2, count ) {
        for( let i=0; i<count; i++ ){
                num1 = num1 + "0";
        }
        let carry = sum = 0;
        let answer = '';
        let j = num2.length-1;
        for( let i = num1.length-1; i>=0; i-- ){
                sum = String( +num1[i] + ( num2[j] ? +num2[j--] : 0 ) + carry );
                answer = String( +sum[sum.length-1] ) + answer;
                sum.length > 1 ? carry = +sum[0] : carry = 0;
        }
        return carry > 0 ? carry + answer : answer;
};

var multiply = function( num1, num2 ) {
        if( num2.length > num1.length ) {
                return multiply( num2, num1 );
        }
        let count = num2.length;
        while( count++ !== num1.length ) {
                num2 = "0" + num2;
        }
        let answer = '';
        let temp = '';
        let counts = 0;
        for( let i = num1.length-1; i>=0; i-- ) {
                let carry = product = 0;
                for( let j = num2.length-1; j>=0; j-- ) {
                        product = String( ( +num1[i] * +num2[j] ) + carry ) ;
                        answer = String( +product[product.length-1] ) + answer;
                        product.length > 1 ? carry = +product[0] : carry = 0 ;
                }
                if( carry > 0 ) {
                        answer = carry + answer;
                }
                temp = addStrings( answer, temp, counts );
                counts++;
                answer = '';
        }
        return temp;
};

console.log( multiply( "123", "0" ) );