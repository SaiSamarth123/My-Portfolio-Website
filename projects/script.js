$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });

  $(window).on("scroll load", function () {
    $("#menu").removeClass("fa-times");
    $(".navbar").removeClass("nav-toggle");

    if (window.scrollY > 60) {
      document.querySelector("#scroll-top").classList.add("active");
    } else {
      document.querySelector("#scroll-top").classList.remove("active");
    }
  });
});

const switchElement = document.querySelector(".switch");
switchElement.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    document.title = "Projects | Portfolio Sai Samarth";
    $("#favicon").attr("href", "assets/images/portfolio.png");
  } else {
    document.title = "See you soon explorer";
    $("#favicon").attr("href", "assets/images/exp.png");
  }
});

// fetch projects start
function getProjects() {
  return fetch("./projects/projects.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

// function showProjects(projects) {
//   let projectsContainer = document.querySelector(".work .box-container");
//   let projectsHTML = "";
//   projects.forEach((project) => {
//     projectsHTML += `
//         <div class="grid-item ${project.category}">
//         <div class="box tilt" style="width: 380px; margin: 1rem">
//       <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
//       <div class="content">
//         <div class="tag">
//         <h3>${project.name}</h3>
//         </div>
//         <div class="desc">
//           <p>${project.desc}</p>
//           <div class="btns">
//           <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
//             <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>`;
//   });
//   projectsContainer.innerHTML = projectsHTML;

//   // vanilla tilt.js
//   // VanillaTilt.init(document.querySelectorAll(".tilt"), {
//   //     max: 20,
//   // });
//   // // vanilla tilt.js
//   //             <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>

//   // /* ===== SCROLL REVEAL ANIMATION ===== */
//   // const srtop = ScrollReveal({
//   //     origin: 'bottom',
//   //     distance: '80px',
//   //     duration: 1000,
//   //     reset: true
//   // });

//   // /* SCROLL PROJECTS */
//   // srtop.reveal('.work .box', { interval: 200 });

//   // isotope filter products
//   var $grid = $(".box-container").isotope({
//     itemSelector: ".grid-item",
//     layoutMode: "fitRows",
//     masonry: {
//       columnWidth: 200,
//     },
//   });

//   // filter items on button click
//   $(".button-group").on("click", "button", function () {
//     $(".button-group").find(".is-checked").removeClass("is-checked");
//     $(this).addClass("is-checked");
//     var filterValue = $(this).attr("data-filter");
//     $grid.isotope({ filter: filterValue });
//   });
// }

function showProjects(projects) {
  let projectsContainer = document.querySelector(".work .box-container");
  let projectsHTML = "";
  let uniqueProjects = new Set(); // Set to store unique project names

  projects.forEach((project) => {
    if (!uniqueProjects.has(project.name)) {
      uniqueProjects.add(project.name);

      let categories = Array.isArray(project.category)
        ? project.category
        : [project.category];

      let projectCategories = categories.filter(
        (category, index) => categories.indexOf(category) === index
      );

      projectCategories.forEach((category) => {
        projectsHTML += `
          <div class="grid-item ${category}">
            <div class="box tilt" style="width: 380px; margin: 1rem">
              <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
              <div class="content">
                <div class="tag">
                  <h3>${project.name}</h3>
                </div>
                <div class="desc">
                  <p>${project.desc}</p>
                  <div class="btns">
                    <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                    <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
      });
    }
  });

  projectsContainer.innerHTML = projectsHTML;

  // isotope filter products
  var $grid = $(".box-container").isotope({
    itemSelector: ".grid-item",
    layoutMode: "fitRows",
    masonry: {
      columnWidth: 100,
    },
  });

  // filter items on button click
  $(".button-group").on("click", "button", function () {
    $(".button-group").find(".is-checked").removeClass("is-checked");
    $(this).addClass("is-checked");
    var filterValue = $(this).attr("data-filter");

    $grid.isotope({
      filter: function () {
        if (filterValue === "*") {
          return true; // Show all projects when "All Projects" filter is selected
        } else {
          return $(this).is(filterValue) || $(this).hasClass(filterValue);
        }
      },
    });
  });
}

getProjects().then((data) => {
  showProjects(data);
});
// fetch projects end

// disable developer mode
document.onkeydown = function (e) {
  if (e.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }
};
