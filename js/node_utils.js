var scriptCache = [];
var paths = [];
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function Import(path)
{
    var index = 0;
    if((index = paths.indexOf(path)) != -1) //If we already imported this module
    {
        return;
    }

    var request, script, source;
    //var fullPath = window.location.protocol + '//' + window.location.host + '/' + path;

    request = new XMLHttpRequest();
    request.open('GET', path, false);
    request.send();

    source = request.responseText;
    eval(source);
	paths.push(path);
    return;
}

function load_res(job_id,host){
	//alert("loading reosurces for:"+job_id);
	$.ajax({
        type: "GET",
        url: host+"/job/"+job_id+"/resources",
        async: false,
        success: function(resources) {
            if(resources == "" | resources=="null" | resources==undefined ) return;
			resources1=(resources);
			if(resources1 == "" | resources1=="null" | resources1==undefined ) return;
			if (resources1.length==0) return;
			for (res in resources1) {Import(resources1[res]);}
        }
    });

}
