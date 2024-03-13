function mul(x){
    let num = 0 
    if(x )
    return function(y){
        return function(z){
            return x*y*z;
        }
    }
}

var y = 1
if(function f(){}){
    function m(){}
    console.log(m);
    console.log(typeof f);
    y += typeof f;
}
console.log(y);

// console.log(mul(100)(1)(6));