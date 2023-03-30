let controllerize = function (controller){
    return capitalize(controller) + "Controller";
}

let capitalize = function(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {controllerize,capitalize};
