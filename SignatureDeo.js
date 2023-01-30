// Nav bar trans

$(document).ready(function(){
  $(window).scroll(function(){
    if(this.scrollY > 20){
     $(`.navbar`).addClass(`sticky`);
    }
    else{
     $(`.navbar`).removeClass(`sticky`);
    }
  })

  // Toggle menu/script
  $(`.menu-btn`).click(function(){
    $(`.navbar .menu`).toggleClass("active");
    $(`.menu-btn i`).toggleClass("active");
  })
});


// Search

const clearInput = () => {
    const input = document.getElementsByTagName("input")[0];
    input.value = "";
  }
  
  const clearBtn = document.getElementById("clear-btn");
  clearBtn.addEventListener("click", clearInput);