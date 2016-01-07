/**
 * @module <%= name %>/loading
*/
var loading = {
    elem:document.getElementById('loading')
    start:function(){
        this.elem.style.display = "block";
    },
    loaded:function(num){
        elem.innerHTML = (num * 100).toFixed(2);
    },
    end:function(){
        this.elem.style.display = "none";
    }
};
