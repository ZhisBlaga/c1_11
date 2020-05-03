const timer = document.querySelector('.countdown');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const message = document.querySelector('.message');

const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const start = document.querySelector('.start');
const restart = document.querySelector('.restart');

let run = false;  //отслеживаем статус работы скрипта

let countSec = 0;
let countMin = 0;
let regexp = /[0-5][0-9]/i;


restart.style.display = 'none'; //кнопку рестарт убираем


const updateText = () =>{	
  minutes.value = (0 + String(countMin)).slice(-2);
  seconds.value = (0 + String(countSec)).slice(-2);
}
updateText();

const countDown = () => {	
	let total = countSec + countMin * 60;
  const timeinterval = setTimeout(countDown, 1000);
  
  if (run == true){
    if (total <= 0) {
      clearInterval(timeinterval);
      timer.style.display = 'none';
      message.innerHTML = '<p>I am done...</p>'
      start.style.display = 'none';
      restart.style.display = '';
      sound();
      
    }
    if(countSec > 0) countSec--;
    else{
      countSec = 59;
      countMin--;
    } 
    
    updateText();
  }
  else{
    clearTimeout(timeinterval); //очищаем 
  }
  
}

plus.onclick = () =>{
  if(countSec < 59) ++countSec;
  else{
  	countSec = 0;
  	++countMin;
  }
  updateText()
}

minus.onclick = () =>{
	if(countMin <= 0 && countSec===0){
  	countSec = 0;
    countMin = 0;
    return;
  }
  if(countSec > 0) --countSec;
  else{
  	countSec = 59;
  	--countMin;
  }
  updateText();
}

start.onclick = () => {
    if (run == false){
      start.innerHTML='stop'; //старт, меняем текст
      run = true;
      countDown();
      
      
    }
    else{
      start.innerHTML='start'; //останавливаем, меняем текст
      run = false;
      
    }
}

restart.onclick =() =>{
	countSec = 0;
  countMin = 0;
  updateText();
  timer.style.display = '';
  message.innerHTML = '';
  start.style.display = '';
  start.innerHTML='start';
  restart.style.display = 'none';
}



function sound() {                    //функция воспроизведения звука по окончании
  var audio = new Audio(); 
  audio.src = 'Sound_05952.mp3'; 
  audio.autoplay = true; 
}

minutes.onblur =() =>{              //функция проверки введеных данных через резулярку при потери фокуса
  if (regexp.test(minutes.value)) {
    console.log(countMin);
    countMin = minutes.value;
  }
  else{
    alert('Значение должно быть в диапазоне 00-59')
    updateText();
  }
}


seconds.onblur =() =>{                  //функция проверки введеных данных через резулярку при потери фокуса
  if (regexp.test(seconds.value)) {
    console.log(countMin);
    countMin = seconds.value;
  }
  else{
    alert('Значение должно быть в диапазоне 00-59')
    updateText();
  }
}