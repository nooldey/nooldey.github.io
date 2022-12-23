/*
 * @lc app=leetcode.cn id=2 lang=typescript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  function getNums(l: ListNode){
    let node = l;
    let num = [];
    while (node) {
      num.unshift(node.val);
      node = node.next;
    }
    return num;
  }
  function plus(a:number[],b:number[]) {
    return parseInt(a.join('')) + parseInt(b.join('')); 
    
  }
  let num1 = getNums(l1);
  let num2 = getNums(l2);
  let res:any = plus(num1,num2);
  res = (res + '').split('').map(n => +n);
  let Node = null;
  for(let i = res.length - 1; i > -1; i--){
    Node = new ListNode(res[i]);
    Node.next = 
  }
  return Node;
  
};
// @lc code=end

