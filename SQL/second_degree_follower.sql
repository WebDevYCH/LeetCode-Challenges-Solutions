/*
        SQL Schema
                In facebook, there is a follow table with two columns: followee, follower.

        Please write a sql query to get the amount of each follower’s follower if he/she has one.

        For example:

                +-------------+------------+
                | followee    | follower   |
                +-------------+------------+
                |     A       |     B      |
                |     B       |     C      |
                |     B       |     D      |
                |     D       |     E      |
                +-------------+------------+
                
                output:
                +-------------+------------+
                | follower    | num        |
                +-------------+------------+
                |     B       |  2         |
                |     D       |  1         |
                +-------------+------------+

        Explaination:
                Both B and D exist in the follower list, when as a followee, B's follower is C and D, and D's follower is E. A does not exist in follower list.

        Note:
                Followee would not follow himself/herself in all cases.
                Please display the result in follower's alphabet order.
*/
SELECT 
    followee AS follower,
    COUNT(DISTINCT follower) AS num
FROM 
    follow
GROUP BY followee
HAVING followee IN (
                        SELECT 
                                follower 
                        FROM 
                                follow
                        ORDER BY followee
                   )
ORDER BY followee