// TODO: Add tests

// import { ForComparison } from './index'

// // Ensure that the values going in are converted to string properly (for the table headers)
// const testRepresentation = (what, shouldBe) => {
//   const fc = new ForComparison(what);
//   if (fc.toString() !== shouldBe) {
//     throw new Error("Value is not being represented correctly.");
//   }
// };

// testRepresentation(true,"true")
// testRepresentation(false,"false")
// testRepresentation(1,"1")
// testRepresentation(0,"0")
// testRepresentation(-1,"-1")
// testRepresentation("`'true'`","\"true\"")
// testRepresentation("`'false'`","\"false\"")
// testRepresentation("`'1'`","\"1\"")
// testRepresentation("`'0'`","\"0\"")
// testRepresentation("`'-1'`","\"-1\"")
// testRepresentation("","\"\"")
// testRepresentation("`null`","null")
// testRepresentation("`undefined`","undefined")
// testRepresentation("`[]`","[]")
// testRepresentation("`{}`","{}")
// testRepresentation([[]],"[[]]")
// testRepresentation([0],"[0]")
// testRepresentation([1],"[1]")
// testRepresentation("`parseFloat('nan')`","NaN")

// const testEquality = (tf, item, comparator) => {
//   const fc1 = new ForComparison(item);
//   if (fc1.testResults(fc1, comparator)[1] !== tf) {
//     throw new Error("Condition should be #{tf}");
//   }
// };

// testEquality(`true==true`, "`true`", "==");
// testEquality(`[[]]==[[]]`, "`[[]]`", "==");
// testEquality(`[]==[]`, "`[]`", "==");

