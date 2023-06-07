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
  <canvas id="canvas"> </canvas>
  <img id="photo">
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
      const videoConstraints = {
        video:{
          width:{
            min:1280,
            ideal:1920,
            max:2560,
          },
          height:{
            min:720,
            ideal:1080,
            max:1440,
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
    video.addEventListener('click',()=>{
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video,0,0);
      photo.src = canvas.toDataURL("image/png");
      photo.style.display = 'none';
    });

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






