
// GetDetailOrder = [
//     { ProductID: 5, Name: "654564564" },
//     { ProductID: 50, Name: "654564564" },
//     { ProductID: 500, Name: "654564564" },
//     { ProductID: 5000, Name: "654564564" },
// ]


// var DIC = {}


// GetDetailOrder.forEach(x => {
//     DIC[x.ProductID] = x
// })

// console.log(DIC)


var dic1 ={
    A: false,
    B: false,
    C: false
  }
  
  var dic2={
    B: false,
    C: true,
    D: false,
    E: false,
  }


  const keys_2_release = Object.keys(dic1).filter(x => ! (x in dic2) ) // [ 'A' ]
  const keys_2_catch = Object.keys(dic2).filter(x => ! (x in dic1) ) // [ 'D', 'E' ]
  