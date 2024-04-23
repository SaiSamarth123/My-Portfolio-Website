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
function showProjects(projects) {
  let projectsContainer = document.querySelector(".work .box-container");
  let projectsHTML = "";
  projects.forEach((project) => {
    // Join categories to create a class string
    const categoryClasses = project.category
      .join(" ")
      .toLowerCase()
      .replace(/, /g, " ");

    projectsHTML += `
        <div class="grid-item ${categoryClasses}">
        <div class="box tilt" style="width: 380px; margin: 1rem">
          <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="${project.name}" /> 
          <div class="content">
            <div class="tag">
              <h3>${project.name}</h3>
            </div>
            <div class="desc">
              <p>${project.desc}</p>
              <div class="btns">
                <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                <a href="${project.links.code}" class="btn" target="_blank"><i class="fas fa-code"></i> Code</a>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  });
  projectsContainer.innerHTML = projectsHTML;

  // Isotope needs to reinitialize after content update
  var $grid = $(".box-container").isotope({
    itemSelector: ".grid-item",
    layoutMode: "fitRows",
  });

  // Refresh Isotope layout after new projects are loaded
  $grid.isotope("reloadItems").isotope();

  // Filter items when filter button is clicked
  $(".filter-btn").on("click", function () {
    var filterValue = $(this).attr("data-filter");
    $grid.isotope({ filter: filterValue });
  });
}

// Fetch and display projects on page load
document.addEventListener("DOMContentLoaded", function () {
  getProjects().then((data) => showProjects(data));
});

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
