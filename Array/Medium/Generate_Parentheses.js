/*
 * @param { number } n
 * @return { string[] }
*/


 var generateParenthesis = function( n ) {
        let parenthesis = [
                ['(', 1, 0]
        ];
        while( true ) {
                let openCount = parenthesis[0][1];
                let closeCount = parenthesis[0][2];
                // CHECK RULE 3
                if( openCount == closeCount && closeCount == n && openCount == n ) {
                        break;
                }
                let data = parenthesis.shift();
                let temp = [];
                let str = "";
                // CHECK RULE 1
                if( openCount < n ) {
                        str = data[0] + "(";
                        [, o, c] = data;
                        temp.push(str, ++o, c);
                        parenthesis.push(temp);
                        temp = [];
                }
                // CHECK RULE 2
                if( openCount > closeCount ) {
                        str = data[0] + ")";
                        [, o, c] = data;
                        temp.push(str, o, ++c);
                        parenthesis.push(temp);
                        temp = [];
                }
        }
        let result = [];
        for( let i=0; i<parenthesis.length; i++ ){
                result.push(parenthesis[i][0]);
        }
        return result;
};