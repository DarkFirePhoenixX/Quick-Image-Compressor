async function compressImage(blobImg, percent) {
    let bitmap = await createImageBitmap(blobImg);
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    ctx.drawImage(bitmap, 0, 0);
    let dataUrl = canvas.toDataURL("image/jpeg", percent/100);
    return dataUrl;
  }
  

    document.querySelector('.compress-btn').addEventListener('click', async() => {
    document.querySelector('.error_message').innerHTML = ""
    document.querySelector('.success_message').innerHTML = ""
    document.querySelector('.blink_me').innerHTML = ""
    document.querySelectorAll('.with_scroll').forEach(element => {
      element.scrollTo(0, 0);
    });
    let img = document.getElementById('upload').files[0];
   if(img == null || img.type != "image/png" && img.type != "image/jpeg"){
      document.querySelector('.error_message').innerHTML = "Upload an image first!"
    }
    else{
      
    document.querySelector('.blink_me').innerHTML = "Compressing ..."
    
    let imgCompressed = await compressImage(img, 30) // set to 75%
    let compSize = atob(imgCompressed.split(",")[1]).length;
    function dataURItoBlob(dataURI)
{
    var byteString;

    if(dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    var ia = new Uint8Array(byteString.length);
    for(var i = 0; i < byteString.length; i++)
    {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
}

var dataURI = imgCompressed;

var blob = dataURItoBlob(dataURI);
var objectURL = URL.createObjectURL(blob);

    document.querySelector('.blink_me').innerHTML = ""
    let downloadHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${img.name} • Ready</span>
                                <span class="size">${formatBytes(parseFloat(compSize.toLocaleString().replace(/,/g, "")))}<a href="${objectURL}" download=${img.name} style='text-decoration: none; cursor: url("resources/hand.png"), auto;' class='text-success ms-3'>Click to download</a></span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
                          document.querySelector('.ready-to-download-area').insertAdjacentHTML("afterbegin", downloadHTML);
                          document.querySelector('.success_message').innerHTML = "Compression finished!"
                          if(document.querySelector('.uploadedImage') != null)
  {  document.querySelector('.uploadedImage').remove();
  document.getElementById('upload').value = ""}

  }});

  function formatBytes(a,b=2){if(!+a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return`${parseFloat((a/Math.pow(1024,d)).toFixed(c))} ${["Bytes","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"][d]}`}
  document.querySelector("form").addEventListener("click", () =>{
   document.querySelector(".file-input").click();
  
});

document.getElementById('upload').addEventListener('change',function(){
  let imgType = document.getElementById('upload').files[0];
  if(imgType.type != "image/png" && imgType.type != "image/jpeg"){
    document.querySelector('.error_message').innerHTML = "Error. Only png and jpeg files are accepted!"
  }
  else{
  let img = document.getElementById('upload').files[0];
  if(document.querySelector('.uploadedImage') != null)
  {  document.querySelector('.uploadedImage').remove();}
  let uploadedHTML = `<li class="row uploadedImage">
  <div class="content upload">
    <i class="fas fa-file-alt"></i>
    <div class="details">
      <span class="name">${img.name} • Uploaded</span>
      <span class="size">${formatBytes(parseFloat(img.size.toLocaleString().replace(/,/g, "")))}</span>
    </div>
  </div>
  <i class="fas fa-check"></i>
</li>`;
document.querySelector('.uploaded-area').insertAdjacentHTML("afterbegin", uploadedHTML);
}
})