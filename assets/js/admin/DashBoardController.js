  /* Dashbroad */
  var CurrentType;
  var CurrentStatus = true;
  // Render Notification

  function RenderNotification() {

      $.post("/QuizPractice/Notification", {},
          // get data 
          function(data, status) {
              if (data != "Empty") {
                  $(data).prependTo('#notify');
                  console.log(data);
                  console.warn(`Newest Data has been updated!`);
                  CurrentStatus = true;
                  RenderContributions(CurrentType);

              } else {
                  console.log("Running");

              }
          });

  }

  //WebSocket



  function RenderDashBroad(type) {
      console.log(`DashBoard ${type} has been rendered!`);
      console.log("Preious Page: DasgBoard/" + CurrentType);
      console.log("Current Page: DashBoard/" + type);
      console.log("----------------");
      CurrentType = type;

      $.post("/QuizPractice/admin/dashboard/body", {
              type: type,
          },
          // get data 
          function(data, status) {
              $("#body").html(`
            <div class="d-flex justify-content-center">
               <div class="spinner-border" role="status">
               <span class="visually-hidden">Loading...</span>
               </div>
               <div class="spinner-border" role="status">
               <span class="visually-hidden">Loading...</span>
               </div>
               <div class="spinner-border" role="status">
               <span class="visually-hidden">Loading...</span>
               </div>
           </div>
         `);
              changeStatus = true;
              if (data != "") {
                  $("#body").html(data);
              }

          });
  }

  function RenderContributions(type) {
      $.post("/QuizPractice/admin/dashboard/contributions", {
              type: type,
          },
          // get data 
          function(data, status) {
              $("#contributions").html(data);
              setTimeout(() => {
                  CurrentStatus = false;
              }, 1500);
          });
  }


  function RenderSubjectList() {

      $.post('/QuizPractice/views/admin/subjects/list.jsp', {}, function(data, status) {
          console.log(data);
          $('#body').html(data);
      });
  }


  function RenderChart(type, locate, time) {
      console.warn("------------------");
      console.log("Current locate: " + locate);
      console.log("Selected time: " + time);
      const ctx = document.getElementById('' + locate).getContext('2d');
      const myChart = new Chart(ctx, {
          data: {
              labels: [],
              datasets: []
          },
          options: {
              plugins: {
                  title: {
                      display: true,
                      text: ``,
                      padding: {
                          top: 10,
                          bottom: 50
                      },

                  },
                  legend: {
                      position: 'right',
                      display: true,
                      labels: {
                          color: 'rgb(255, 99, 132)'
                      }
                  }
              },
              scales: {

              }
          }
      });




      $.post("/QuizPractice/admin/dashboard/chartData", {
              type: type,
              time: time
          },
          // get data 
          function(data, status) {
              console.log("data return:" + data);
              if (data != "[]") {

                  console.log("Data Before: ");
                  console.log(myChart.data.datasets);
                  var JSData = JSON.parse(data);
                  console.log("Data loaded:");
                  console.log(JSData);
                  var statisticData = JSData[0]
                  var year = "Year: " + statisticData.year;
                  var month = statisticData.month != 0 ? " Month: " + statisticData.month : "";
                  var week = statisticData.week != 0 ? " Week: " + statisticData.week : "";
                  var day = statisticData.day != 0 ? " Day: " + statisticData.day : "";
                  var time = year + month + week + day;
                  console.log("Chart data at ");
                  console.log(time);
                  console.log("Chart status: " + status);
                  myChart.options.plugins.title.text = `Statistic Contribution of ${time}`
                  var ouput = [];
                  for (var i in statisticData) {
                      if (i.includes("total")) {
                          myChart.data.labels.push(i);
                          ouput.push(statisticData[i]);
                      }
                  }
                  myChart.data.datasets.push({
                      type: 'bar',
                      label: 'Bar Dataset',
                      data: ouput,
                      fill: false,
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                      borderColor: '#48cae4',
                  }, {
                      type: 'line',
                      label: 'Line Dataset',
                      data: ouput,
                      fill: false,
                      borderColor: '#48cae4',
                  });
                  myChart.update();
                  console.log("Data After: ");
                  console.log(myChart.data.datasets);
                  return;
              } else {
                  console.error("Chart: Data Empty!");
              }
              setTimeout(() => {

                  CurrentStatus = false;
              }, 1200);

          });


  }

  function RenderUserList() {

      $.post('/QuizPractice/views/admin/users/list.jsp', {}, function(data, status) {

          $('#body').html(data);
      });
  }

  function RenderLoginHistory() {
      $.post('/QuizPractice/views/admin/users/loginhistory.jsp', {}, function(data, status) {

          $('#body').html(data);
      });
  }
  /* Notify */