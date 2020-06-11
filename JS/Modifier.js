// TODO:: Core Logic of Chrome Extension [Modifying New Tab] :-

const controller = () =>
{
  // ! Global Variables :-> 

  let userData = JSON.parse(window.localStorage.getItem("userData"));
  let task_data = JSON.parse(window.localStorage.getItem("task_data"));
  let user_settings = JSON.parse(window.localStorage.getItem("user_settings"));
  let fav_sites = JSON.parse(window.localStorage.getItem("fav_sites"));

  let defaultArgument = 0;

  let backgroundImage = JSON.parse(window.localStorage.getItem("backgroundImage"));

  // ? ============================================================================================================================
 
  // ! Setup Extension Function Here :->

  const setupExtension = () =>
  {
    const setupCenterUI = function ()
    {
      let userData = [];
      let user_btn = document.querySelector(".userData");
    
      document.querySelector(".display").classList.remove("hide");
      document.querySelector(".greet").classList.add("hide");
      document.querySelector(".add-text").addEventListener("click", () =>
      {
        if (user_btn.value)
        {
          userData.push(user_btn.value);

          // ! Storing Data into Local :->
          window.localStorage.setItem("userData", JSON.stringify(userData));

          // ! Clear Input Field :->
          user_btn.value = "";

          // ! Bring Focus Back to the Field :->
          user_btn.focus();
        }
        else
          user_btn.focus();
      });
    };

    const setupTaskUI = function (arg) {
      window.localStorage.setItem("task_data", "[]");
    };

    const setupfavSiteUI = function () {
      window.localStorage.setItem("fav_sites", "[]");
    };

    const userSettings = () =>
    {
      defaultArgument = 1;
      let userSettings = [];
      
      userSettings.push(defaultArgument);
      
      document.querySelector(".greet-me").classList.remove("hide");
      document.querySelector(".greet").classList.add("hide");
      
      let user_btn = document.querySelector(".user_settings");
      document.querySelector(".greet-me-complete").addEventListener("click", () =>
      {
        if (user_btn)
        {
          userSettings.push(user_btn.value);
          window.localStorage.setItem("user_settings",JSON.stringify(userSettings));
          
          // console.log(userSettings);

          // ! Clear Input Field :->
          user_btn.value = "";

          // ! Bring Focus Back to the Field :->
          user_btn.focus();
        }
        else
          user_btn.focus();
      });
    };

    // ! Reload Page after Setup is Completed :->

    document.querySelector(".setup-complete").addEventListener("click", () => {
      window.location.reload();
    });

    document.getElementById("complete").addEventListener("click", () => {
      window.location.reload();
    });

    return {
      setupCenterUI,
      setupTaskUI,
      userSettings,
      setupfavSiteUI
    };
  };

  // ? =======================================================================================================================
  
  // ! Manage centerUI Functions here :->

  const centerUI = ( function () 
  {
    const displayTime = (timeElement) =>
    {
      timeElement.textContent = new Date().toTimeString().substring(0, 5);
      
      function curTime()
      {
        let time = new Date().toTimeString();
        timeElement.textContent = new Date().toTimeString().substring(0, 5);
      }
      
      setInterval(curTime, 1000);
    };

    const hideGreet = () =>
    {
      document.querySelector(".just-greet").classList.toggle("hide");
      document.querySelector(".stop-greet").classList.toggle("hide");
    };

    const revertChanges = () =>
    {
      window.localStorage.removeItem("user_settings");
      window.location.reload();
    };

    const revertBackground = () =>
    {
      window.localStorage.removeItem("backgroundImage");
      window.location.reload();
    };

    const greet = (name) =>
    {
      let greet = document.querySelector(".greet");
    
      setInterval( () => 
      {
        let time = new Date().getHours();
      
        if (time >= 0 && time < 12) greet.innerHTML = "Good Morning, " + name;
      
        else if (time >= 12 && time < 16)
          greet.innerHTML = "Good Afternoon, " + name;
      
        else
          greet.innerHTML = "Good Evening, " + name;
      }, 100);
    };

    return {
      displayTime,
      typingEffect,
      greet,
      hideGreet,
      revertChanges,
      revertBackground
    };
  })();

  // ? =============================================================================================================================
  
  // ! Manage taskUI here :->

  const taskUI = ( function () 
  {  
    const toggleTaskbar = () =>
    {
      document.querySelector(".tasks").addEventListener("click", function ()
      {
        document.querySelector(".tasks-list").classList.toggle("hide");
        document.querySelector(".tasks").classList.toggle("toggle-position");
      });
    };

    const addTasks = () =>
    {
      document.querySelector(".add").addEventListener("click", function ()
      {
        if (document.querySelector(".text").value)
        {
          task_data.push(document.querySelector(".text").value);

          // ! Clear Input Field :->
          document.querySelector(".text").value = "";

          // ! Display Result Output Function :->
          outputUI();

          // ! Bring Focus Back to Input :->
          document.querySelector(".text").focus();
        }
        else
          document.querySelector(".text").focus();
      });
    };

    function outputUI()
    {
      let text_submit = "";
    
      window.localStorage.setItem("task_data", JSON.stringify(task_data));

      for (let i = 0; i < task_data.length; ++i) {
        text_submit += `<div class="list" id="task-${i}">${task_data[i]}<i class="material-icons del-icon">cancel</i></div>`;
      }

      document.querySelector(".task-list").innerHTML = text_submit;
    }

    function deleteTask()
    {
      let selectedTask = document.querySelector(".task-list");
    
      selectedTask.addEventListener("click", function (event)
      {
        let deleteID = event.target.parentNode.id;
      
        if (deleteID)
        {
          // ! Split the Id to Get the Index Number :->

          let ID = deleteID.split("-")[1];

          // ! Remove the Task from task_data Array :->

          task_data.splice(Number(ID), 1);

          // ! Update UI :->

          outputUI();
        }

      });
    }

    return {
      outputUI,
      toggleTaskbar,
      addTasks,
      deleteTask
    };
  })();

  // ? ==========================================================================================================================
  
  // ! Favorite Site Functionality here :->

  const favSiteUI = ( function () 
  {
    const addSiteData = () =>
    {
      document.getElementById("submit").addEventListener("click", function ()
      {
        let siteURL = document.querySelector(".fav-site-url");
        let siteTitle = document.querySelector(".fav-site-title");
      
        if (siteURL.value && siteTitle.value)
        {
          let tempObj = new Object();
          tempObj["siteURL"] = siteURL.value;
          tempObj["siteTitle"] = siteTitle.value;
          fav_sites.push(tempObj);

          // ! Clear Input field :->

          siteURL.value = "";
          siteTitle.value = "";
          
          // ! Display Result Output function :->
          outputsiteUI();

          // ! Bring Focus Back to Input :->
          siteURL.focus();
        }

        else
          siteURL.focus();
      });
    };

    const outputsiteUI = () =>
    {
      let text_submit = "";
    
      window.localStorage.setItem("fav_sites", JSON.stringify(fav_sites));
    
      for (let i = 0; i < fav_sites.length; ++i)
      {
        text_submit += `<div class="tile">
			                	<div class="flex-box">
				                  <a href=${fav_sites[i]["siteURL"]}>
				                  ${fav_sites[i]["siteTitle"].length > 22
                          ? fav_sites[i]["siteTitle"].substring(0, 22) + '...' : fav_sites[i]["siteTitle"]}
				                  </a>
				                </div>
				                <i id="site-${i}" class="material-icons del">cancel</i></div>`;
      }

      document.querySelector(".tiles").innerHTML = text_submit;
    }

    function deletefavSite()
    {
      let selectedSite = document.querySelector(".tiles");

      selectedSite.addEventListener("click", function (event)
      {
        let deleteID = event.target.id;
      
        if (deleteID)
        {
          // console.log(deleteID);
         
          // ! Split the Id to get the Index Number :->

          let ID = deleteID.split("-")[1];
          // console.log(ID);

          // ! Remove the Site from fav_sites Array :->
          fav_sites.splice(Number(ID), 1);

          // ! Update UI :->
          outputsiteUI();
        }
      });
    }

    return {
      addSiteData,
      outputsiteUI,
      deletefavSite
    }
  })();

  // ? ============================================================================================================================
  
  // ! AJAX Call to Unsplash here for Changing Background :->

  const changeBackground = function ()
  {
    document.querySelector(".change-background").addEventListener("click", background);

    function background()
    {
      const xhr = new XMLHttpRequest();
      const url = "https://api.unsplash.com/photos/random/?client_id=24514248bf7adefbe5d86d02567c34f6394c4eb6b92028540cda035d3071ef1e";
      
      xhr.open("GET", url, true);

      xhr.setRequestHeader("Content-type", "application/json");
      
      document.getElementById('gif').classList.remove('hide');

      xhr.onreadystatechange = (event) =>
      {
        document.getElementById('gif').classList.add('hide');
        // console.log(typeof xhr.responseText);
        
        let response = xhr.responseText;
        // console.log(response);
        
        let responseObj = JSON.parse(response);
        // console.log(responseObj);
        
        let url = responseObj.links.html;
        // console.log(url);
        
        backgroundImage = `url(${url}/download)`;
        window.localStorage.setItem("backgroundImage", JSON.stringify(new Array(backgroundImage)));
        document.body.style.backgroundImage = backgroundImage;

        event.preventDefault();
      };

      xhr.send();
    }
  };
  
  // ? ==============================================================================================================================
  
  // ! Manage UIexec Function Execution here :->

  const UIexec = ( function ()
  {
    // ! Background Image Setup :->

    if (backgroundImage) {
      document.body.style.backgroundImage = backgroundImage;
    }

    // ! Output Time :->
    centerUI.displayTime(document.querySelector(".time"));

    // ! Calling setupExtension only if It was not Setup Earlier :->

    if (!window.localStorage.getItem("userData"))
    {
      setupExtension().setupCenterUI();
      setupExtension().setupTaskUI();
      setupExtension().setupfavSiteUI();
    }

    else
    {
      if (user_settings)
      {
        centerUI.greet(user_settings[1]);
      
        // ! Now hide "Just Greet Me" Button and Show "Stop Greeting Me" Button :->
        centerUI.hideGreet();
      
        // ! Setting up an Event Listener to Revert Changes :->
        document.querySelector(".stop-greet").addEventListener("click", centerUI.revertChanges);
      }
      
      else
      {
        // ! Output the userData :->
        centerUI.typingEffect(document.querySelector(".greet"), { userData: userData });
      }

      // ! Run taskUI Function Only if Setup is Completed :->

      const runtaskUI = (function ()
      {
        taskUI.toggleTaskbar();
        taskUI.addTasks();
        taskUI.deleteTask();
        taskUI.outputUI();
      })();

      // ! Change background Call here to Setup Event Listener :->
      changeBackground();

      // ! Initial Event Listeners :->

      const eventListeners = ( function () 
      {
        // ! Event listener to Access Setup Manually :->

        document.querySelector(".change-setup").addEventListener("click", setupExtension().setupCenterUI);
        
        // ! Event Listener to access Greet Menu :->
        document.querySelector(".just-greet").addEventListener("click", setupExtension().userSettings);
        
        // ! Event listener to Revert Background Image to Default :->
        document.querySelector(".default-background").addEventListener("click", centerUI.revertBackground);
      })();

      // ! Run favoriteSiteUI function :->

      const runfavSiteUI = ( function () 
      {
        favSiteUI.addSiteData();
        favSiteUI.outputsiteUI();
        favSiteUI.deletefavSite();
      })();
    }
  })();
};

window.onload = controller;