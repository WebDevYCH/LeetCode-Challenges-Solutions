/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxAbsoluteSum = function(nums) {
        let max = nums[0];
        let maxSubarray = nums[0];
        for( let i=1; i<nums.length; i++ ) {
                maxSubarray = Math.max( nums[i], nums[i] + maxSubarray );
                max = Math.max( max, maxSubarray );
        } 
        let min = nums[0];
        let minSubarray = nums[0];
        for( let i=1; i<nums.length; i++ ) {
                minSubarray = Math.min( nums[i], nums[i] + minSubarray );
                min = Math.min( min, minSubarray );
        }
        return Math.max(max,Math.abs(min));
};