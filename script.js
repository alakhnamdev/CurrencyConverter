let selFrom = document.getElementById('selFrom');
let selTo = document.getElementById('selTo');
let fromFlag = document.getElementById('fromCountry');
let toFlag = document.getElementById('toCountry');
let display = document.getElementById('msg');
let amount = document.getElementById('conversionAmount');
let convert = document.getElementById('convert');
amount.value = 1;
let createSelectFromList = () =>{
    [list1,list2] = ['',''];
    for (let i in countryList){
        if(i == 'USD'){
            list1 += `<option value="${i}" selected>${i}</option>`;
            list2 += `<option value="${i}">${i}</option>`;
        }
        else if(i == 'INR'){
            list2 += `<option value="${i}" selected>${i}</option>`;
            list1 += `<option value="${i}">${i}</option>`;
        }
        else{
            list1 += `<option value="${i}">${i}</option>`;
            list2 += `<option value="${i}">${i}</option>`;
        }
    }
    selFrom.innerHTML = list1;
    selTo.innerHTML = list2;
};
let getFlag = () =>{
    selFrom.onchange = ()=>{
        let flag = selFrom.value;
        flag = flag.slice(0,2);
        fromFlag.src = `https://flagsapi.com/${flag}/shiny/64.png`;
        setdisplay();
    };
    selTo.onchange = ()=>{
        let flag = selTo.value;
        flag = flag.slice(0,2);
        toFlag.src = `https://flagsapi.com/${flag}/shiny/64.png`;
        setdisplay();
    };
};
let getrate = async (cur1,cur2) => {
    let base_url = `https://latest.currency-api.pages.dev/v1/currencies/${cur1}.json`;
    let data = await fetch(base_url);
    let result = await data.json();
    rate = [];
    rate[0] = result[cur1][cur2];
    return rate;
};
let getCurrentAmount = () => {
    return amount.value;
}
getFlag();
createSelectFromList();
let setdisplay = async () => {
    let cur1 = selFrom.value.toLowerCase();
    let cur2 = selTo.value.toLowerCase();
    let rate = await getrate(cur1,cur2);
    display.innerHTML = `${getCurrentAmount()*rate[0]} ${cur2.toUpperCase()}`;
};
setdisplay();
convert.addEventListener('click',()=>{
    setdisplay();
});

