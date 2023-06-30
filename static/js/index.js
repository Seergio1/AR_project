var button = document.getElementById('scann');
var map = document.getElementById('map');
var content = document.querySelector('.content');
var video;
var select;
var currentStream;
var body = document.querySelector("body");
var idTheme = 0;

localStorage.setItem("langue","fr");

var item_nav_bar = document.querySelectorAll(".item_nav_bar");

window.addEventListener('resize',()=>{
  frame();
});
frame();
navigateOnglet();

function navigateOnglet() {

  let h = 0;
  item_nav_bar.forEach((nav_item,i)=>{
    nav_item.addEventListener('click',()=>{
      h = getActive(item_nav_bar);
              if(!nav_item.classList.contains("active")){
                  item_nav_bar[h].classList.remove("active");
                  nav_item.classList.add("active");
              }         
                  changeBody(i);
    })
  })
}



function changeBody(num){
  let carte = `
  <div class="box_carte">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 914.5 674">
  <g id="Squares" transform="translate(-116 -50)">
    <g id="Rectangle_1" data-name="Rectangle 1" transform="translate(116 50)" fill="none" stroke="#000" stroke-width="5">
      <rect width="914" height="674" stroke="none"/>
      <rect x="2.5" y="2.5" width="909" height="669" fill="none"/>
    </g>
    <g id="Rectangle_2" data-name="Rectangle 2" transform="translate(709 534)" fill="none" stroke="#000" stroke-width="5">
      <rect width="321" height="190" stroke="none"/>
      <rect x="2.5" y="2.5" width="316" height="185" fill="none"/>
    </g>
    <g id="Rectangle_3" data-name="Rectangle 3" transform="translate(381 303)" stroke="#000" stroke-width="5">
      <rect width="254" height="211" stroke="none"/>
      <rect x="2.5" y="2.5" width="249" height="206" fill="none"/>
    </g>
  </g>
  <g id="Line" transform="translate(-116 -50)">
    <line id="Ligne_1" data-name="Ligne 1" y2="191" transform="translate(282.5 50.5)" fill="none" stroke="#070707" stroke-width="5"/>
    <line id="Ligne_2" data-name="Ligne 2" x1="291" transform="translate(282.5 241.5)" fill="none" stroke="#000" stroke-width="5"/>
    <line id="Ligne_3" data-name="Ligne 3" y2="376" transform="translate(882.5 50.5)" fill="none" stroke="#040404" stroke-width="5"/>
    <line id="Ligne_4" data-name="Ligne 4" x1="148" transform="translate(882.5 312.5)" fill="none" stroke="#000" stroke-width="5"/>
    <line id="Ligne_5" data-name="Ligne 5" x1="46" transform="translate(984.5 426.5)" fill="none" stroke="#000" stroke-width="5"/>
    <line id="Ligne_6" data-name="Ligne 6" x1="202" transform="translate(708.5 426.5)" fill="none" stroke="#000" stroke-width="5"/>
    <line id="Ligne_7" data-name="Ligne 7" x2="77" transform="translate(634.5 241.5)" fill="none" stroke="#000" stroke-width="5"/>
    <line id="Ligne_8" data-name="Ligne 8" y1="61" transform="translate(708.5 241.5)" fill="none" stroke="#000" stroke-width="5"/>
    <line id="Ligne_9" data-name="Ligne 9" y2="67" transform="translate(708.5 361.5)" fill="none" stroke="#000" stroke-width="5"/>
    <line id="Ligne_10" data-name="Ligne 10" y2="275" transform="translate(282.5 302.5)" fill="none" stroke="#000" stroke-width="5"/>
    <line id="Ligne_11" data-name="Ligne 11" x1="352" transform="translate(282.5 577.5)" fill="none" stroke="#000" stroke-width="5"/>
    <line id="Ligne_12" data-name="Ligne 12" x1="37" y2="137" transform="translate(245.5 303.5)" fill="none" stroke="#000" stroke-width="5"/>
    <line id="Ligne_13" data-name="Ligne 13" x1="37" y1="139" transform="translate(245.5 438.5)" fill="none" stroke="#000" stroke-width="5"/>
    <line id="Ligne_14" data-name="Ligne 14" x2="144.5" y2="41" transform="translate(344 577.5)" fill="none" stroke="#000" stroke-width="5"/>
    <line id="Ligne_15" data-name="Ligne 15" x1="126" y2="41" transform="translate(485.5 577.5)" fill="none" stroke="#060606" stroke-width="5"/>
  </g>
  <g id="Legend" transform="translate(-116 -50)">
  <text id="I" transform="translate(654 502)" font-size="46" font-family="SegoeUI-Bold, Segoe UI" font-weight="700"><tspan x="0" y="0">I</tspan></text>
    <text id="II" transform="translate(781 165)" font-size="46" font-family="SegoeUI-Bold, Segoe UI" font-weight="700"><tspan x="0" y="0">II</tspan></text>
    <text id="III" transform="translate(157 323)" font-size="46" font-family="SegoeUI-Bold, Segoe UI" font-weight="700"><tspan x="0" y="0">III</tspan></text>
    <text id="IV" transform="translate(298 694)" font-size="46" font-family="SegoeUI-Bold, Segoe UI" font-weight="700"><tspan x="0" y="0">IV</tspan></text>
    <text id="V" transform="translate(305 566)" font-size="46" font-family="SegoeUI-Bold, Segoe UI" font-weight="700"><tspan x="0" y="0">V</tspan></text>
  </g>
</svg>
        <div class="box_indication">
          <div class="indication_item">I.Entrée</div>
          <div class="indication_item">II.Les Précirseurs</div>
          <div class="indication_item">III.Le soleil des Indépendances</div>
          <div class="indication_item">IV.Recherche d'une esthétique</div>
          <div class="indication_item">V.Revue Noire 26 Madagascar</div>
        </div>
        
      </div>
  `;
  let scann_content = `
  <div class="controls">
        <select id="select">
          <option></option>
        </select>
      </div>
  <video id="video" autoplay playsinline></video>
  <canvas id="canvas"> </canvas>
  <img id="photo">
  <div class="info_objet">
    <div class="info_objet_entete">
      <div class="titre_objet">Cadre de Sergio</div>
      <span class="close">&times;</span>
    </div>
    <div class="data_objet">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Donec vestibulum tincidunt massa, ac consequat sapien volutpat non. 
      Nunc sagittis mi sit amet est volutpat bibendum. 
      Vestibulum facilisis neque auctor, tempor enim eget, 
      sollicitudin turpis. Vivamus consectetur consequat ex, 
      at semper massa efficitur nec. Fusce facilisis ultricies justo, 
      in maximus risus convallis sit amet. Donec non eros urna. 
      Quisque nec dui eu sapien vestibulum tempus non ac tortor. 
      Nullam euismod mauris in pulvinar feugiat. Etiam fermentum 
      lacinia finibus. Quisque auctor velit vel risus tristique, 
      id condimentum dolor iaculis. In sagittis metus in diam tristique 
      fringilla. Maecenas ultricies dictum ipsum, id dignissim tortor 
      mattis ac. Mauris congue lectus metus, vel tempor neque rhoncus at. 
      Fusce suscipit, ligula vitae fringilla rhoncus, ligula nunc cursus 
      odio, at finibus sapien ante vel neque. Maecenas bibendum gravida 
      elit, ut pharetra lorem dignissim nec.
    </div>
    <div class="autre">
      <div class="plus_info">Voir plus</div>
      <div class="son_info">
      <i id="son_texte" class="fas fa-volume-up"></i>
      </div>
    </div>
  </div>
  <div class="notification">
    <img src="assets/img/alarm.png" alt="">
  </div>
  `;
  let parametrefr = `
  <div class="box_header">
    <h2 class="titre">Paramètre</h2>
  </div>
  <div class="box_content_param">
    <div class="content_item_param"> 
      <input type="checkbox" class="check" name="sexe" id="sexe"><label class="checkbox" for="sexe"></label>
      <div class="text_param">Mode nuit</div>
    </div>
    
    <div class="content_item_param">
      <i class="fas fa-globe"></i>
      <div class="text_param">Langue</div>
    </div>
    <div class="content_item_param">
      <i  class="fas fa-info"></i>
      <div id="info_" class="text_param">À propos</div>
    </div>
  </div>
  `;
  let parametreen = `
  <div class="box_header">
    <h2 class="titre">Setting</h2>
  </div>
  <div class="box_content_param">
  <div class="content_item_param"> 
      <input type="checkbox" class="check" name="sexe" id="sexe"><label class="checkbox" for="sexe"></label>
      <div class="text_param">Night mode</div>
    </div>

  
    <div class="content_item_param">
      <i class="fas fa-globe"></i>
      <div class="text_param">Langage</div>
    </div>
    <div class="content_item_param">
      <i  class="fas fa-info"></i>
      <div id="info_" class="text_param">About</div>
    </div>
  </div>
  `;
  let aide = `
  <div class="box_header">
    <h2 class="titre">Aide</h2>
  </div>
  <div class="box_content_param">
    <div class="content_item_param">
      <i class="fas fa-book"></i>
      <div class="text_param">Didacticiel</div>
    </div>
    <div class="content_item_param">
      <i class="fas fa-phone"></i>
      <div class="text_param">Service client</div>
    </div>
  </div>
  `;
  let help = `
  <div class="box_header">
    <h2 class="titre">Help</h2>

  </div>
  <div class="box_content_param">
    <div class="content_item_param">
      <i class="fas fa-book"></i>
      <div class="text_param">Tutorial</div>
    </div>
    <div class="content_item_param">
      <i class="fas fa-phone"></i>
      <div class="text_param">Client service</div>
    </div>
  </div>
  `;
  let selectLangagefr = `
  <div class="box_header">
    <h2 class="titre" data-lang="fr">Choisissez une langue</h2>
    <h2 class="titre" data-lang="en" style="display : none;"> Choose a langage</h2>
  </div>
  <div class="box_content_param">
    <div class="content_item_param">
      <select id="langueSelect">
        <option value="fr">Français</option>
        <option value="en">Anglais</option>
      </select>   
      

    </div>
  </div>
  `;
  let apropos = `
  <div class="box_header">
  <h2 class="titre">À propos</h2>

</div>
<div class="box_content_param">
  <div class="content_item_param">
    about
  </div>
</div>
`;

  let selectLangageen = `
  <div class="box_header">
    <h2 class="titre" data-lang="fr" style="display : none;">Choisissez une langue</h2>
    <h2 class="titre" data-lang="en"> Choose a langage</h2>
  </div>
  <div class="box_content_param">
    <div class="content_item_param">
      <select id="langueSelect">
        <option value="en" >English</option>
        <option value="fr" >French</option>
      </select>   
      

    </div>
  </div>
  `;
  let tutofr = `
  <div class="box_header">
  <h2 class="titre">Didacticiel</h2>

</div>
      <div class="didacticil__container">
      <div class="didacticiel">
        <div class="didacticiel__desc">
          <span class="numero">1.</span>
          <span class="desc">Ouvrez le menu <span>Analyse</span></span>
        </div>
        <div class="didacticiel__image">
          <img src="" class="image" />
        </div>
      </div>
      <div class="didacticiel">
        <div class="didacticiel__desc">
          <span class="numero">2.</span>
          <span class="desc">Orientez votre caméra sur l'oeuvre de votre choix</span>
        </div>
        <div class="didacticiel__image">
          <img src="" class="image" />
        </div>
      </div>
      <div class="didacticiel">
        <div class="didacticiel__desc">
          <span class="numero">3.</span>
          <span class="desc">Attendez que le scann finisse</span>
        </div>
        <div class="didacticiel__image">
          <img src="" class="image" />
        </div>
      </div>
      <div class="didacticiel">
        <div class="didacticiel__desc">
          <span class="numero">4.</span>
          <span class="desc">Les résultats vous seront donnés</span>
        </div>
        <div class="didacticiel__image">
          <img src="" class="image" />
        </div>
      </div>
    </div>
  `;
  let tutoen = `
  <div class="box_header">
  <h2 class="titre">Tutorial</h2>

</div>
      <div class="didacticil__container">
      <div class="didacticiel">
        <div class="didacticiel__desc">
          <span class="numero">1.</span>
          <span class="desc">Open <span>Scan menu</span></span>
        </div>
        <div class="didacticiel__image">
          <img src="" class="image" />
        </div>
      </div>
      <div class="didacticiel">
        <div class="didacticiel__desc">
          <span class="numero">2.</span>
          <span class="desc">Aim your camera at the work of your choice</span>
        </div>
        <div class="didacticiel__image">
          <img src="" class="image" />
        </div>
      </div>
      <div class="didacticiel">
        <div class="didacticiel__desc">
          <span class="numero">3.</span>
          <span class="desc">Wait for the scan to finish</span>
        </div>
        <div class="didacticiel__image">
          <img src="" class="image" />
        </div>
      </div>
      <div class="didacticiel">
        <div class="didacticiel__desc">
          <span class="numero">4.</span>
          <span class="desc">The results will be given to you</span>
        </div>
        <div class="didacticiel__image">
          <img src="" class="image" />
        </div>
      </div>
    </div>
  `;
  
  if(num == 0){
    content.innerHTML = '';
    content.innerHTML = carte;
    // Sélection du bouton
    let removeClignotant = (itemSelected)=>{
      var itemG = document.querySelectorAll('#Legend text tspan');
      itemG.forEach(item=>{
        if(item!=itemSelected)
        {
          item.classList.remove("clignoter")
        }
      })
    }
     var itemH = document.querySelectorAll(".indication_item");
     var itemG = document.querySelectorAll('#Legend text tspan');
      // Fonction appelée lorsque le bouton est cliqué
    itemH.forEach((item,index)=>{
      item.addEventListener("click",()=>{
        itemG[index].classList.add("clignoter");
        removeClignotant(itemG[index])

      })
    })  
    if (typeof currentStream !== 'undefined') {
      stopMediaTracks(currentStream);
    }
  }
  if(num == 1){
    content.innerHTML = '';
    content.innerHTML = scann_content;
    const modal = document.querySelector('.info_objet');
    const textElement = document.querySelector('.data_objet');
    const seeMoreButton = document.querySelector('.plus_info');
    const notificationBtn  = document.querySelector('.notification img');
    const closeModalBtn = document.querySelector('.close');

    notificationBtn.addEventListener('click', function() {
      modal.classList.add('open');
    });
    
    closeModalBtn.addEventListener('click', function() {
      modal.classList.remove('open');
    });

    seeMoreButton.addEventListener('click', function() {
      textElement.classList.toggle('show-more');
      if (textElement.classList.contains('show-more')) {
        seeMoreButton.textContent = 'Voir moins';
        textElement.style.height = 'auto';
        textElement.style.setProperty('--gradient-height', '0');
      } else {
        seeMoreButton.textContent = 'Voir plus';
        textElement.style.height = '100px';
        textElement.style.setProperty('--gradient-height', '40px');
      }
    });

    select = document.getElementById('select');
    video = document.getElementById('video');
    
      if (typeof currentStream !== 'undefined') {
        stopMediaTracks(currentStream);
      }
      // const videoConstraints = {
      //   video:{
      //     width:{
      //       min:1280,
      //       ideal:1920,
      //       max:2560,
      //     },
      //     height:{
      //       min:720,
      //       ideal:1080,
      //       max:1440,
      //     }
      //   }
      // };
      const videoConstraints = {
        video:{
          width:{
            min:1200,
            ideal:1200,
            max:1200,
          },
          height:{
            min:900,
            ideal:900,
            max:900,
          }
        }
      };
      if (select.value === '') {
         videoConstraints.facingMode = 'environment'; // camera back
        // videoConstraints.facingMode = 'user'; // camera frontal
      } else {
        // videoConstraints.facingMode = 'user'; // camera frontal
        videoConstraints.deviceId = { exact: select.value };
      }
      const constraints = {
        video: videoConstraints,
        audio: false
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          currentStream = stream;
          video.srcObject = stream;
          return navigator.mediaDevices.enumerateDevices();
        })
        .then(gotDevices)
        .catch(error => {
          console.error(error);
        });
    
    
    navigator.mediaDevices.enumerateDevices().then(gotDevices);

    //capture d'ecran
    let canvas = document.getElementById('canvas');
    let photo = document.getElementById('photo');
    
    // video.addEventListener('click',()=>{
    //   canvas.width = video.videoWidth;
    //   canvas.height = video.videoHeight;
    //   canvas.getContext("2d").drawImage(video,0,0);
    //   photo.src = canvas.toDataURL("image/png");
    //   photo.style.display = 'none';
    // });

    //prend 1 photo tous les 1 secondes
    video.addEventListener('play', () => {
      setInterval(() => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        photo.src = canvas.toDataURL("image/png");
        sendURI(canvas.toDataURL("image/png"));
        photo.style.display = 'none';
      }, 1000);
    });
    

    let btn = document.getElementById("son_texte");
    console.log(btn);
    btn.addEventListener("click", () => {
      say();
    });

  }
  if (num == 2) {
    
    content.innerHTML = '';
    //fin de changement de langue -------------------
    if(localStorage.getItem("langue")=="fr"){
      content.innerHTML = parametrefr;
    }else{
      content.innerHTML = parametreen;
    }
    var content_item = document.querySelectorAll(".content_item_param");
    content_item.forEach((item,i) => {
      item.addEventListener('click' , ()=>{
        console.log(i);
        if(i==1){
          console.log("langue en cours : "+localStorage.getItem("langue"));
          content.innerHTML = '';
          if(localStorage.getItem("langue")=="fr"){
            content.innerHTML = selectLangagefr;

          }else if(localStorage.getItem("langue")=="en"){
            content.innerHTML = selectLangageen;
          }
          var langueSelect = document.getElementById('langueSelect');
          console.log(content);
          if(content.innerHTML!=""){
            langueSelect.addEventListener('input', ()=>{
              changerLangue(langueSelect);
              console.log("boutton");
            })
            console.log("mandeha ve ty");
          }
          else{
            console.log("tsy misy bouton ony");
          }
        }
        if (i==2) {
          content.innerHTML = '';
          content.innerHTML = apropos;
        }
      })
      
    });
    //fin de changement de langue -------------------
    
    
    // son --------------------------
    // const volumeIcon = document.getElementById('volume_icon');
    // volumeIcon.addEventListener('click', function() {
    //   if (volumeIcon.classList.contains('fa-volume-up')) {
    //     volumeIcon.classList.remove('fa-volume-up');
    //     volumeIcon.classList.add('fa-volume-mute');
       
    //   } else {
    //     volumeIcon.classList.remove('fa-volume-mute');
    //     volumeIcon.classList.remove('volume-mute');
    //     volumeIcon.classList.add('fa-volume-up');
    //   }
    // });
    //fin son ----------------------
    
    //mode nuit -------------------
    var check = document.querySelector(".check");
    if(localStorage.getItem("theme") != null)
    {
        idTheme = localStorage.getItem("theme")
    } 
    if(check !=null){
        check.addEventListener("click",()=>{
            if (check.checked) {
              modeNuit();
            }else{
              modeJour();
            }
        })
    }
    if(idTheme==1){
        modeNuit()
        if(check!=null)
        {
            check.checked = true
        }
    }else{
      modeJour();
    } 
    // fin mode nuit ----------------
    
    if (typeof currentStream !== 'undefined') {
      stopMediaTracks(currentStream);
    }
  }
  if(num == 3){
    content.innerHTML = '';
    if(localStorage.getItem("langue")=="fr"){
      content.innerHTML = aide;
    }else{
      content.innerHTML = help;
    }    
    var content_item = document.querySelectorAll(".content_item_param");
    content_item.forEach((item,i) => {
      item.addEventListener('click' , ()=>{
        if(i==0){
          if(localStorage.getItem("langue")=="fr"){
            content.innerHTML = tutofr;

          }else if(localStorage.getItem("langue")=="en"){
            content.innerHTML = tutoen;
          }
        }
      });
    });
    // document.getElementById("didacticiel").addEventListener("click", () => {
    //   
    // });
    if (typeof currentStream !== 'undefined') {
      stopMediaTracks(currentStream);
    }
  }
}
function getActive(tab) {
  let res = 0;
  for (let i = 0; i < tab.length; i++) {
     if(tab[i].classList.contains("active")){
      res = i;
     }
  }
  return res;
}
function getClignote(tab) {
  let res = null;
  for (let i = 0; i < tab.length; i++) {
     if(tab[i].classList.contains("clignoter")){
      res = i;
     }
  }
  return res;
}

function frame() {
  var height = window.innerHeight;
  var body = document.querySelector("body");
  body.style.height = height+"px";
}

function stopMediaTracks(stream) {
  stream.getTracks().forEach(track => {
    track.stop();
  });
}

function gotDevices(mediaDevices) {
  select.innerHTML = '';
  select.appendChild(document.createElement('option'));
  let count = 1;
  mediaDevices.forEach(mediaDevice => {
    if (mediaDevice.kind === 'videoinput') {
      const option = document.createElement('option');
      option.value = mediaDevice.deviceId;
      const label = mediaDevice.label || `Camera ${count++}`;
      const textNode = document.createTextNode(label);
      // console.log(textNode);
      option.appendChild(textNode);
      select.appendChild(option);
    }
  });
}

//Ito no mametaka ilay class css ao anatin'ilay body ho lasa nuit de ilay ray mmivadika jour
function modeNuit() 
{
    if(body.classList.contains("lightmode"))
    localStorage.setItem("theme",1)
    {
        console.log("Misy lightMode ehhhh")
        body.classList.remove("lightmode")
    }
    body.classList.add("nightmode")
}
function modeJour() 
{
    if(body.classList.contains("nightmode"))
    localStorage.setItem("theme",0)
    {
        console.log("Misy nightMode ehhhh")
        body.classList.remove("nightmode")
    }
    body.classList.add("lightmode")
}

function changerLangue(langueSelect) {
  var nouvelleLangue = langueSelect.value;
  var elementsTexte = document.querySelectorAll('[data-lang]');
  
  elementsTexte.forEach(function(element) {
    var langue = element.getAttribute('data-lang');
    if (langue==nouvelleLangue) {
      element.removeAttribute('style');
      localStorage.setItem("langue",nouvelleLangue);
    } else {
      element.style.display = 'none'; 
    }
  });
}
function clignoterTexte() {
  var tspan = document.querySelector("#II tspan");
  if (tspan) {
    tspan.classList.add("clignoter");
  }
}

// function say() {
//   var utterance = new SpeechSynthesisUtterance();
//   let setted = false;
//   let paused = false;
//   // tst mety le paused anleh API io fa manaova variable local (var) higerena anleh pause
//   document.body.addEventListener("click", () => {
//     utterance.text = "Hello World";
//     if (setted == false) {
//       speechSynthesis.onvoiceschanged = () => {
//         speechSynthesis.getVoices().forEach((voice, index) => {
//           console.log(voice.name);
//           if (index == 1) {
//             utterance.voice = voice;
//           }
//         });
//         speechSynthesis.speak(utterance);
//         speechSynthesis.resume();
//         setted = true;
//       };
//     } else {
//       utterance.text = "In else function";
//       speechSynthesis.speak(utterance);
//       speechSynthesis.pause();
//       paused = true;
//       if (paused) {
//         console.log("Paussed");
//         setTimeout(() => {
//           console.log("Resumed");
//           speechSynthesis.resume();
//         }, 3000);
//       }
//     }
//   });
// }
var isPlaying = false;
function say() {
  var utterance = new SpeechSynthesisUtterance();
 

  speechSynthesis.resume();
    if (!isPlaying) {
      utterance.text = "Hello Sergio est beaugosse ozy Loann";
      speechSynthesis.speak(utterance);
      isPlaying = true;
    } else {
      if (speechSynthesis.speaking) {
        speechSynthesis.pause();
      } else {
        speechSynthesis.resume();
      }
    }
 

  utterance.addEventListener("end", () => {
    isPlaying = false;
  });
}

function getTheBoy() {
  let xhr;
  try {
    xhr = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e2) {
      try {
        xhr = new XMLHttpRequest();
      } catch (e3) {
        xhr = false;
      }
    }
  }
  return xhr;
}
/**
 *
 * @param {*} file
 * @param {Array} pics
 */
async function sendURI(URI) {
  let xhr = getTheBoy();
  let formData = new FormData();
  formData.append("urlFile", URI);
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var retour = xhr.responseText;
          console.log(retour);
          if (retour.status == "error") {
            reject(retour.detail);
          } else {
            resolve(retour);
          }
        } else {
          console.log(xhr.status);
        }
      }
    };
    xhr.addEventListener("error", function (event) {
      alert("Oups! Quelque chose s'est mal passé lors de la publication .");
    });
    console.log("tafa upload")
    xhr.open("POST", `/upload`, true);
    xhr.send(formData);
  });
}









