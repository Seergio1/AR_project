// (() => {
//     // La largeur et la hauteur de la photo capturée. On utilisera
//     // une largeur fixe et on calculera la hauteur pour correspondre
//     // aux proportions du flux vidéo d'entrée.
  
//     const width = 320; // On met à l'échelle la photo pour avoir cette largeur
//     let height = 0;    // On calcule cette valeur ensuite selon le flux d'entrée
  
//     // |streaming| indique si le flux vidéo est en cours
//     // Lorsqu'on commence, ce n'est pas le cas (false).
  
//     let streaming = false;
  
//     // On référence les éléments HTML qu'il faudra configurer ou contrôler.
//     // Ils seront définis lors de la fonction startup().
  
//     let video = null;
//     let canvas = null;
//     let photo = null;
//     let startbutton = null;
  
//     function showViewLiveResultButton() {
//       if (window.self !== window.top) {
//         // On s'assure que si notre document est dans une iframe,
//         // on invite la personne à ouvrir l'exemple dans un onglet
//         // ou une fenêtre séparée. Sinon, le navigateur n'envoie
//         // pas la demande d'accès à la caméra.
//         document.querySelector(".contentarea").remove();
//         const button = document.createElement("button");
//         button.textContent = "Voir le résultat de l'exemple dont le code est présenté avant";
//         document.body.append(button);
//         button.addEventListener("click", () => window.open(location.href));
//         return true;
//       }
//       return false;
//     }
  
//     function startup() {
//       if (showViewLiveResultButton()) {
//         return;
//       }
//       video = document.getElementById("video");
//       canvas = document.getElementById("canvas");
//       photo = document.getElementById("photo");
//       startbutton = document.getElementById("startbutton");
  
//       navigator.mediaDevices
//         .getUserMedia({ video: true, audio: false })
//         .then((stream) => {
//           video.srcObject = stream;
//           video.play();
//         })
//         .catch((err) => {
//           console.error(`Une erreur est survenue : ${err}`);
//         });
  
//       video.addEventListener(
//         "canplay",
//         (ev) => {
//           if (!streaming) {
//             height = video.videoHeight / (video.videoWidth / width);
  
//             // Firefox a un bug où la hauteur ne peut pas être lue
//             // à partir de la vidéo. On prend des précautions.
  
//             if (isNaN(height)) {
//               height = width / (4 / 3);
//             }
  
//             video.setAttribute("width", width);
//             video.setAttribute("height", height);
//             canvas.setAttribute("width", width);
//             canvas.setAttribute("height", height);
//             streaming = true;
//           }
//         },
//         false
//       );
  
//       startbutton.addEventListener(
//         "click",
//         (ev) => {
//           takepicture();
//           ev.preventDefault();
//         },
//         false
//       );
  
//       clearphoto();
//     }
  
//     // On remplit le cadre de la photo pour indiquer l'absence
//     // d'image capturée.
  
//     function clearphoto() {
//       const context = canvas.getContext("2d");
//       context.fillStyle = "#AAA";
//       context.fillRect(0, 0, canvas.width, canvas.height);
  
//       const data = canvas.toDataURL("image/png");
//       photo.setAttribute("src", data);
//     }
  
//     // On capture une photo en récupérant le contenu courant de la
//     // vidéo, qu'on dessine dans un canevas puis qu'on convertit
//     // en une URL de données contenant l'image au format PNG.
//     // En utilisant un canevas en dehors de l'écran, on peut
//     // modifier sa taille et/ou appliquer d'autres modifications
//     // avant de l'afficher à l'écran.
  
//     function takepicture() {
//       const context = canvas.getContext("2d");
//       if (width && height) {
//         canvas.width = width;
//         canvas.height = height;
//         context.drawImage(video, 0, 0, width, height);
  
//         const data = canvas.toDataURL("image/png");
//         photo.setAttribute("src", data);
//       } else {
//         clearphoto();
//       }
//     }
  
//     // On met en place un gestionnaire d'évènement pour exécuter
//     // le code lorsque le chargement du document est terminé.
//     window.addEventListener("load", startup, false);
//   })();
var button = document.getElementById('scann');
var map = document.getElementById('map');
var content = document.querySelector('.content');
var video;
var select;
var currentStream;

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
  let scann_content = `
  <div class="controls">
        <select id="select">
          <option></option>
        </select>
      </div>
  <video id="video" autoplay playsinline></video>
  `;
  let parametre = `
  <div class="box_header">
    <h2 class="titre">Paramètre</h2>
  </div>
  <div class="box_content_param">
    <div class="content_item_param">
      <div class="box_toggle">
        <div class="toggle_item"></div>
      </div>
      <div class="text_param">Mode nuit</div>
    </div>
    <div class="content_item_param">
      <i class="fas fa-volume-up"></i>
      <div class="text_param">Son</div>
    </div>
    <div class="content_item_param">
      <i class="fas fa-globe"></i>
      <div class="text_param">Langue</div>
    </div>
    <div class="content_item_param">
      <i class="fas fa-info"></i>
      <div class="text_param">À propos</div>
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
  if(num == 0){
    content.innerHTML = '';
    stopMediaTracks(currentStream);
  }
  if(num == 1){
    content.innerHTML = '';
    content.innerHTML = scann_content;
    select = document.getElementById('select');
    video = document.getElementById('video');
    
      if (typeof currentStream !== 'undefined') {
        stopMediaTracks(currentStream);
      }
      const videoConstraints = {};
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
  }
  if (num == 2) {
    content.innerHTML = '';
    content.innerHTML = parametre;
    stopMediaTracks(currentStream);
  }
  if(num == 3){
    content.innerHTML = '';
    content.innerHTML = aide;
    stopMediaTracks(currentStream);
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





