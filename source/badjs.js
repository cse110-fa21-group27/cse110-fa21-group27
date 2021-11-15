#!/usr/bin/env node
/*jslint browser, node*/
/*global caches, indexedDb*/
import https from 'https'
import jslint from './jslint.mjs'

/*jslint-disable*/
//Syntax error.
/*jslint-enable*/

eval('console.log("hello world");') //jslint-quiet

eval('console.log("hello world");')

// Optional directives.
// .... /*jslint beta*/ .......... Enable experimental warnings.
// .... /*jslint bitwise*/ ....... Allow bitwise operators.
// .... /*jslint browser*/ ....... Assume browser environment.
// .... /*jslint convert*/ ....... Allow conversion operators.
// .... /*jslint devel*/ ......... Allow console.log() and friends.
// .... /*jslint for*/ ........... Allow for-statement.
// .... /*jslint getset*/ ........ Allow get() and set().
// .... /*jslint indent2*/ ....... Use 2-space indent.
// .... /*jslint long*/ .......... Allow long lines.
// .... /*jslint name*/ .......... Allow weird property names.
// .... /*jslint node*/ .......... Assume Node.js environment.
// .... /*jslint single*/ ........ Allow single-quote strings.
// .... /*jslint this*/ .......... Allow 'this'.
// .... /*jslint trace*/ ......... Include jslint stack-trace in warnings.
// .... /*jslint unordered*/ ..... Allow unordered cases, params, properties,
// ................................... and variables.
// .... /*jslint variable*/ ...... Allow unordered const and let declarations
// ................................... that are not at top of function-scope.
// .... /*jslint white*/ ......... Allow messy whitespace.

;(async function () {
  let result = await new Promise(function (resolve) {
    https
      .request('https://www.jslint.com/jslint.mjs', function (res) {
        result = ''
        res
          .on('data', function (chunk) {
            result += chunk
          })
          .on('end', function () {
            resolve(result)
          })
          .setEncoding('utf8')
      })
      .end()
  })
  result = jslint.jslint(result)
  result.warnings.forEach(function ({ formatted_message }) {
    console.error(formatted_message)
  })
})()
