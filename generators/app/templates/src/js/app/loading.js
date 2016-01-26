/**
 * @module <%= name %>/loading
*/
var loading = {
    elem:document.getElementById('loading'),
    start:function(){
        this.elem.style.display = "block";
        this.loaded(0);
    },
    loaded:function(num){
        this.elem.innerHTML = 'loading... ' + (num * 100).toFixed(2) + '%';
    },
    end:function(){
        this.elem.parentNode.removeChild(this.elem);
    }
};
