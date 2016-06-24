function interpret() {
    //location.href="xxx.html?id=asdfweio";

    var toType = new Array("W=", "AA.AuN=", "F.FN=","J.JN=","AA.AfN=","C.CN=");
    var search = document.getElementById('search');
    var mystring = search.value;
    if(mystring!="")CallURL(mystring);
    updatedropdown();
}
function updatedropdown() {
    if(myjson=="")return;
    var pgli = document.getElementsByName("seli");
    var pgp=document.getElementsByName("search-dropdown-item");
    for(i=0;i<6;i++) {
        pgli[i].style.display="none";
    }
    for(i=0;i<myjson.interpretations.length;i++) {
        var myvalue=myjson.interpretations[i].rules[0].output.value;
        for(j=0;j<6;j++) {
            if(pgli[j].style.display=="block")continue;
            mystring=fromValueToName(myvalue,j);
            if(mystring!="") {
                pgli[j].style.display="block";
                pgp[j].innerHTML=mystring;
            }
        }
    }
    setTimeout(function () {
        updatedropdown();},500);
}

function fromValueToName(myvalue,j) {
    var toType = new Array("W=", "AA.AuN=", "F.FN=","J.JN=","AA.AfN=","C.CN=");
    if(myvalue.indexOf(toType[j]) == -1)
        return "";
    
    var tmp=myvalue.indexOf(toType[j]);
    tmp+=toType[j].length;
    while(myvalue.charAt(tmp)=='=' || myvalue.charAt(tmp)=='\'' || myvalue.charAt(tmp)=='\"')tmp++;
    var mystring = "";
    while(myvalue.charAt(tmp)!='\'' && myvalue.charAt(tmp)!='\"') {
        mystring=mystring + myvalue.charAt(tmp);
        tmp++;
    }
    return mystring;
}

function t(ind) {
    //location.href="www.baidu.com";

    var pgli = document.getElementsByName("seli");
    var pgp=document.getElementsByName("search-dropdown-item");  
    if(ind==6){
        for(i=0;i<6;i++) {
            if(pgli[i].style.display!="none");
            {
                var tmpexpr=pgp[i].innerHTML;
                tiaozhuan(tmpexpr,i);
            }
        }
    }
    else{
    var tmpexpr=pgp[ind].innerHTML;
    tiaozhuan(tmpexpr,ind);
    }
}

function tiaozhuan(myexpr,ind) {
    
    var toName = new Array("paper.html?", "author.html?", "field.html?","journal.html?","affiliation.html?","conference.html?");
    var toType = new Array("W=", "AA.AuN==", "F.FN==","J.JN==","AA.AfN==","C.CN==");
    var expr="";
    if(ind==0) {
        expr="W="+"\'"+myexpr+"\'";
    }
    else {
        expr="Composite("+toType[ind]+"\'"+myexpr+"\')";
    }
    //alert(expr);
    location.href=toName[ind]+expr;
}


function CallURL(myexpr){
    var params = {
            // Request parameters
            "query": myexpr,
            "complete": "0",
            "count": "10",
            "offset": "0",
            "timeout": "10000",
            "model": "latest",
            "Subscription-Key":"f7cc29509a8443c5b3a5e56b0e38b5a6",
        };
       $.ajax({
            url: "https://oxfordhk.azure-api.net/academic/v1.0/interpret?" + $.param(params),
    type: "GET",
    async:true,
     success: function (msg) {
        myjson=msg;
    },
    error: function () {
        myjson="";
    }
});
    return myjson;
}

function getevaluate() {
    myexpr=location.search.substring(1);
    myexpr=decodeURI(myexpr);
    //alert(myexpr);
        var params = {
            // Request parameters
            "expr": myexpr,
            "count": "100",
            "offset": "0",
            "timeout": "10000",
            "model": "latest",
            "attributes":"Y,F.FN,AA.AfN,AA.AuN,CC,J.JN,C.CN,E,Ti",
            "Subscription-Key":"f7cc29509a8443c5b3a5e56b0e38b5a6",
        };
    var myjson;
       $.ajax({
            url: "https://oxfordhk.azure-api.net/academic/v1.0/evaluate?" + $.param(params),
    type: "GET",
    async:false,
     success: function (msg) {
        myjson=msg;
    },
    error: function () {
        myjson="";
        //alert("error");
    }
});
    //alert(myjson);
    return myjson;
}

function tmpana(tmp,cc) {
    if(tmp==undefined) {
        tmp=new Object();
        tmp.totnumber=0;
        tmp.Gindex=0;
    }
    else {
        tmp.totnumber++;
        tmp.Gindex+=cc;
    }
    return tmp;
}


function myonload(ind) {
    HTMLBodyElement.display="none";
    json1=getevaluate();
    document.getElementById('mainname').innerHTML=fromValueToName(json1.expr,ind);
    for(i=0;i<json1.entities.length;i++) {
        var ent=json1.entities[i];
        var Ejson=JSON.parse(ent.E);
        var tmppaper=new Object();
        try{
        tmppaper.url=Ejson.S[0].U;
        }catch(e){tmppaper.url="";}
        
        try{
        tmppaper.abs=Ejson.D;
        }catch(e){tmppaper.abs="";}
        
        tmppaper.ccount=ent.CC;
        tmppaper.year=ent.Y;
        tmppaper.title=ent.Ti;
        tmppaper.author=new Array();
        
        tmpana(year[tmppaper.year],tmppaper.ccount);
    
        
        if(ent.J!=undefined) {
            journal[ent.J.JN]=tmpana(journal[ent.J.JN],tmppaper.ccount);
            if(sarray[ent.J.JN]==undefined)
                sarray[ent.J.JN]=new Array();
            if(sarray[ent.J.JN][tmppaper.year]==undefined)
                sarray[ent.J.JN][tmppaper.year]=0;
            else
                sarray[ent.J.JN][tmppaper.year]++;

        }
        
        if(ent.C!=undefined) {
            conference[ent.C.CN]=tmpana(conference[ent.C.CN],tmppaper.ccount);     
            if(sarray[ent.C.CN]==undefined)
                sarray[ent.C.CN]=new Array();
            if(sarray[ent.C.CN][tmppaper.year]==undefined)
                sarray[ent.C.CN][tmppaper.year]=0;
            else
                sarray[ent.C.CN][tmppaper.year]++;       
        }
        
        if(ent.F!=undefined) {
            for(j=0;j<ent.F.length;j++) {
                if(sarray[ent.F[j].FN]==undefined)
                    sarray[ent.F[j].FN]=new Array();
            if(sarray[ent.F[j].FN][tmppaper.year]==undefined)
                sarray[ent.F[j].FN][tmppaper.year]=0;
            else
                sarray[ent.F[j].FN][tmppaper.year]++;                 field[ent.F[j].FN]=tmpana(field[ent.F[j].FN],tmppaper.ccount);
            }
        }
        
        if(ent.AA!=undefined) {
            for(j=0;j<ent.AA.length;j++) {
                author[ent.AA[j].AuN]=tmpana(author[ent.AA[j].AuN],tmppaper.ccount);
                affiliation[ent.AA[j].AfN]=tmpana(affiliation[ent.AA[j].AfN],tmppaper.ccount);
                tmppaper.author.push(ent.AA[j].AuN);
            }
        }
        
        paper.push(tmppaper);
        
    }
    
    
}