const LANG = [
    {
    name: "RU",
    alphabet:['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ','ъ','ы','ь', 'э', 'ю', 'я']
    },
    {
        name: "EN",
        alphabet:['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    }
    // ,{
    //     name: "DE",
    //     alphabet:['a','ä', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o','ö', 'p', 'q', 'r', 's', 'ß' , 't', 'u','ü', 'v', 'w', 'x', 'y', 'z']
    // }

];

const NUM = [0,1,2,3,4,5,6,7,8,9];
count = 0;

var add_DOMel = function(DOM_name,DOM_class, DOM_id,DOM_text,DOM_value,DOM_attr_name,DOM_attr){
  let DOM = document.createElement(DOM_name);
  DOM.className = DOM_class;

  if(Number(DOM_id) || Number(DOM_id) == 0){
      DOM.id = DOM_class + "_" + DOM_id;
  }else if (DOM_id !== undefined){
  DOM.id = DOM_id;
  }

  if (DOM_text !== undefined){
  DOM.innerHTML = DOM_text;
  }else{
     DOM.value=DOM_value;
  }

  if (DOM_attr !== undefined && DOM_attr_name !== undefined)
  DOM.setAttribute(DOM_attr_name,DOM_attr);

  return DOM;
};

var EventListener = function (obj, func) {
    obj.addEventListener('click',function (e) {
    e.preventDefault();
    if (func == 'add'){
    area.value += this.text;
    }else if(func == 'space'){
        area.value += " ";
    }else if (func == 'del'){
        area.value = area.value.slice(0,-1);
    }else if (func =='change'){
        count += 1;
        if (count >= LANG.length){
            count = 0;
        }
        document.getElementById('keyboard_lang').remove();
        allKeys(LANG[count].alphabet);
        document.getElementById('changeLang').innerText = all_languages();
    }

    })
};

var all_languages = function(){
    let count1 = count;
    count1 += 1;
    if (count1 >= LANG.length){
        count1 = 0;
    }
    return LANG[count1].name;
};

var keys = document.querySelector('.keys');

let keyboard_setting = add_DOMel('div','keyboard_setting','keyboard_setting');
keys.append(keyboard_setting);

let keyboard = add_DOMel('div','keyboard','keyboard');
keys.append(keyboard);

var addElem = function(lang){

    var area = add_DOMel('input','area','area','','','size','50');

    keyboard_setting.append(area);

    let keyboard_func = add_DOMel('div','func');

    keyboard_setting.append(keyboard_func);

        let del_symb = add_DOMel('a','del_symb','del_symb','&#9003;','','href','#');

        EventListener(del_symb,'del');

        keyboard_func.append(del_symb);



        let space = add_DOMel('a','space','space','&#9176;','','href','#');

        EventListener(space,'space');

        keyboard_func.append(space);



        let changeLang = add_DOMel('a','changeLang','changeLang',all_languages(),'','href','#');

        EventListener(changeLang,'change');

        keyboard_func.append(changeLang);

};

var allKeys = function(lang){

    let keyboard_lang = add_DOMel('div','keyboard_lang','keyboard_lang');
    keyboard.prepend(keyboard_lang);

    for(let i = 0; i < lang.length; i++){
        let key = add_DOMel('a','key',i ,lang[i],'','href','#');

        EventListener(key,'add');

        keyboard_lang.append(key)
    }
};

var allNumerical = function(){
    let keyboard_num = add_DOMel('div','numbers');

    keyboard.appendChild(keyboard_num);

    for(let j = 0; j < NUM.length; j++){
        let key_num = add_DOMel('a','number',j,NUM[j],'','href','#');

        EventListener(key_num,'add');

        keyboard_num.append(key_num)
    }
};

allKeys(LANG[count].alphabet);
allNumerical();
addElem(LANG);