let postEditForm = document.getElementById("postEditForm");
postEditForm.addEventListener('submit', function(event){
  //find length of uploaded images
  let imageUploads = document.getElementById("imageUpload").files.length;
  //find total number of existing images
  let existingImgs = document.querySelectorAll(".imageDeleteCheckbox").length;
  //find total number of images to be deleted
  let imgDeletions = document.querySelectorAll(".imageDeleteCheckbox:checked").length;

  let totalImgsToSubmit = existingImgs - imgDeletions + imageUploads;
  if (totalImgsToSubmit > 4) {
    event.preventDefault();
    let removalAmount = totalImgsToSubmit -4;
    alert(`You need to remove at least ${removalAmount} image${removalAmount ===1 ? '': 's'}`)
  }
})