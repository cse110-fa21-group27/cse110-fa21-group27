/** This is a JSDoc comment
 * @param {string} name This is good
 */
function helloYou(name) {
  name = "you" || name;
  console.log("hello" + name + "!");
}

console.log(helloYou);
