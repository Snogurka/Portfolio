// on click on an image within myProjects, hide the about me text, add a carousel class to the projects container, which shrinks the project images and moves them up; 
function showProjectDetails(tgt) {

  // exit, if a click is inside myProjects but not on an image
  if(tgt.tagName.toUpperCase() != "IMG") return;

  // find and display the about section
  const aboutProject = document.getElementById("aboutProject");
    
  // if this function is activated by clicking on a project from the start page..
  if (tgt.parentElement.parentElement.id == "myProjects") {
    // hide the "about me" text
    document.getElementById("aboutMe").style.display = "none";

    // change myProjects id to carousel, which triggers a change in section's dimensions, and place it above main section
    const allProjects = tgt.parentElement.parentElement;
    allProjects.id = "carousel";
    document.body.insertBefore(allProjects, document.getElementsByTagName("main")[0]);

    // add projectChoice id (used for formatting) to the project image in the carousel
    tgt.id = "projectChoice";

    // display the about section
    aboutProject.style.display = "block";
  } 
  // .. else, if this function is activated by changing from one viewed project detail section to another, id "projectChoice" should already be assigned to an image, and needs to be reassigned
  else {
    document.getElementById("projectChoice").removeAttribute("id");
    // add an id to the clicked image
    tgt.id = "projectChoice";
    // remove the about project article so that it can be re-added - for the unrolling effect
    aboutProject.removeChild(aboutProject.getElementsByTagName("article")[0]);
  }

  // make sure the message to user doesn't stay on 
  const msg = document.getElementsByClassName("message")[0];
  if (msg) msg.style.display = "none";

  // extract the chosen project's name from the clicked image's source (tgt.source)
  const projectName = tgt.src.substring(tgt.src.lastIndexOf('/')+1).replace(".png","");

  // find the large project picture element
  const projPic = document.getElementById("pic");
  // if it exists, remove click listener from project photo
  if (projPic.getAttribute('listener')){
    projPic.removeEventListener("click", displayMsg);
  }

  //if a project has a source, set the link to its location,  ...
  if (tgt.parentElement.getElementsByTagName("FIGCAPTION")[0].children.length) {
    //add a link to the project location
    projPic.parentElement.setAttribute("href", tgt.parentElement.getElementsByTagName("FIGCAPTION")[0].children[0].getAttribute("href"));
  }
  //...otherwise display a helpful messsage over the photo
  else {
    projPic.parentElement.removeAttribute("href");
    // aboutProject.children[0].addEventListener("click", (txt) => displayMsg(aboutProject.children[0], "This app is no longer available for sale on iTunes."));
    projPic.parentElement.addEventListener("click", displayMsg);
  }

  // // set the photo source and lessened opacity
  // projPic.setAttribute("src", tgt.src);
  projPic.style.opacity = "0.8";

  // update the title H2 text of the project shown, capitalizing the first letter of each word in the title
  let ttl = "";
  projectName.split("_").forEach(x => ttl += x.replace(x.charAt(0), " " + x.charAt(0).toUpperCase()));
  aboutProject.getElementsByTagName("H2")[0].innerText = ttl.trimStart();

  //create the "about project" article element
  var articleAbout = document.createElement("article");
  // place the article before the photo - for mobile or after the photo - for desktop
  if (window.matchMedia("only screen and (max-width: 480px)").matches){
    aboutProject.insertBefore(articleAbout, projPic.parentNode);
    // set the photo source 
    projPic.setAttribute("src", tgt.src);
  } else {
    // set the photo source 
    projPic.setAttribute("src", tgt.src);
    aboutProject.appendChild(articleAbout);
  }

  //remove any children from the about article
  for (let i = 0, len = articleAbout.childElementCount; i < len; i++) {
    articleAbout.removeChild(articleAbout.children[0]);
  }

  fetch('../assets/descr.json').then((res) => {
    return res.json();
  }). then((myObj) => {
    if (projectName.toString().slice(0,6) === "garden") {
      const p = document.createElement("p");
      p.innerText = myObj["gardenPre"];
      articleAbout.appendChild(p);
    }
    const par = document.createElement("p");
    par.innerText = myObj[projectName];
    articleAbout.appendChild(par);
  });

  //todo: add shadow light - white light from small project photo in carousel to the large on, displayed with details
  // createShadow(tgt);
}



//the functions displays a temp message within an elt using text supplied
function displayMsg() {
// function displayMsg(elt, txt) {
  const txt = "This app is no longer available for sale on iTunes.";
  // replace elt (for arrow function), otherwise - this
  const msg = document.createElement("div");
  msg.className = "message";
  msg.innerText = txt;
  this.appendChild(msg);
  window.setTimeout(() => {
    this.removeChild(msg);
  }, 10000);
}

// close project details, tgt is the close button of project detail;
function closeProjectDetails(tgt) {

  // display the about me section again
  document.getElementById("aboutMe").style.display = "block";

  // locate aboutProject section and remove the added article from it
  const aboutProject = document.getElementById("aboutProject");
  aboutProject.removeChild(aboutProject.getElementsByTagName("article")[0]);
  aboutProject.style.display = "none";

  // change carousel id back to myProjects and move the element back to main
  const carousel = document.getElementById("carousel");
  carousel.id = "myProjects";
  document.getElementById("aboutProject").parentNode.insertBefore(carousel, document.getElementById("aboutProject"));
  // remove the projectChoice id from the last selected/viewed project image (small)
  document.getElementById("projectChoice").removeAttribute("id");
}

// create a shadow from a small icon to the large picture in the about section
function createShadow(tgt) {
  /* x, y, blur-radius length(0+, size and lightness of shadow), spread-radius (grow/shrink), color */
  let xOffset = 3, yOffset = 3;
  tgt.style.boxShadow = `
  -3px 3px 5px -1px RGBA(223, 207, 190, 1),
  -6px 6px 5px -1px RGBA(223, 207, 190, 1),
  -10px 9px 5px -1px RGBA(223, 207, 190, 1),
  -30px 11px 5px 2px RGBA(223, 207, 190, 1),
  -40px 20px 5px 2px RGBA(223, 207, 190, 1),
  -50px 30px 5px 2px RGBA(223, 207, 190, 0.9),
  -70px 40px 5px 2px RGBA(223, 207, 190, 0.8),
  -90px 50px 5px 2px RGBA(223, 207, 190, 0.7),
  -350px 110px 5px 2px RGBA(223, 207, 190, 0.6)`;
}