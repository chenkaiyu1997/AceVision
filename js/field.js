// var field_name = json1.name
//
// for (var au in author) {
//   if (au.hasOwnProperty(variable)) {
//
//   }
// }

var figure_af = new Array(10);
var i = 0;
for (af in affiliation){
    i++;
  var dic = new Array();
  dic['name'] = af;
  dic['num'] = affiliation[af].Gindex;
  figure_af.push(dic);
if(i==10)break;
}
