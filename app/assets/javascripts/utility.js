Array.prototype.replace = function (replaceTo, replaceWith) {
    for (var i = 0; i < this.length; i++) {
        if (this[i]._id == replaceTo._id) {
            this.splice(i, 1, replaceWith);
        }
    }
}

Array.prototype.removeById = function(id) {
    for(var i=0; i<this.length; i++) {
        if(this[i]._id == id) {
            this.splice(i, 1);
            break;
        }
    }
}

Array.prototype.getById = function(id) {
    for(var i=0; i<this.length; i++) {
        if(this[i]._id == id) {
            return this[i];
        }
    }
}

function objectDefined(object)
{
    return object != undefined || object != null;
}
