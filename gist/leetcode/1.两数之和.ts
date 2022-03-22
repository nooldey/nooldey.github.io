/*
 * @lc app=leetcode.cn id=1 lang=typescript
 *
 * [1] 两数之和
 */

// @lc code=start
function twoSum(nums: number[], target: number): number[] {
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++){
      if (j === i) {
        continue;
      }
      if (nums[j] + nums[i] === target) {
        result = [i,j].sort();
        break;
      }
    }
  }
  return result;
};
// @lc code=end

