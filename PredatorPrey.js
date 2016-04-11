 google.charts.load('current', {'packages':['corechart', 'line']});
    google.charts.setOnLoadCallback(drawChart);

        
        function dR(a,R,F){ //Change in prey over time
//            var result = a*R - (1/12)*R*F;
            var b = (1/12);
            var h = 50;
            var result = h + R*(a - b*F)
            return result;
        }
      
        function dF(d,R, F){ // Change in predator over time
//            var result = d*F + (1/120)*R*F
            var p = (1/120);
            var result = -F*(d - p*R);
            return result;
        }
        
    function drawChart() {

      var button = document.getElementById('change-chart');
      var chartDiv = document.getElementById('chart_div');
        
        
      var data1 = new google.visualization.DataTable();
      data1.addColumn('number', 'Time');
      data1.addColumn('number', 'Prey');
      data1.addColumn('number', 'Predator');
        
//        var data2 = new google.visualization.DataTable();
//      data2.addColumn('number', 'Time');
//      data2.addColumn('number', 'Predator');
        
         var R = Number(document.getElementById('parameter1').value); //Initial Rabbit Pop -- Global
        var F = Number(document.getElementById('parameter2').value); // Initial population of Foxes -- Global
     
        var t = 0;
        var step = .01; // Change in time
        var time = 20/step; //set time variable
         
        var a = Number(document.getElementById('growth-rate').value); //growth rate of rabbits
//        var b = (1/12); //constant - refers to number of fox-rabbit interaction -> rabbit is eaten
        var d = Number(document.getElementById('death-rate').value);//death-rate coefficient of foxes
//        var g = (1/120);//constant - benefit to fox population when rabbit is eaten
           
        d = -1*d;
        
          
         //Plot Initial populations:
        data1.addRows([[t, R, F]]);
        t+= step;
        
     for(i = 1; i < time; i++){
      data1.addRows([
        [t, R + (dR(a,R,F)*step), F + (dF(d,R,F)*step)]
      ]);
        
         R = R + (dR(a,R,F)*step); //Set new pop of Rabbits
         F = F + (dF(d,R,F)*step); //Set new pop of Foxes
           t+=step;
    }

 
      var linearOptions = {
        title: 'Prey vs. Time',
        legend: 'Time',
        pointSize: 1,
        width: 900,
        height: 500,
        hAxis: {
          gridlines: {
            count: -1
          }
        },
        vAxis: {
            scaleType: 'Prey',
          ticks: [ 0, 100, 200]
        }
      };

      var mirrorLogOptions = {
        title: 'Predator vs. Time',
        legend: 'Time',
        pointSize: 1,
        width: 900,
        height: 500,
        hAxis: {
          gridlines: {
            count: -1
          }
        },
        vAxis: {
          scaleType: 'Predator',
          ticks: [ 0, 100, 200, 300, 400, 500]
        }
      };

      function drawLinearChart() {
        var linearChart = new google.visualization.LineChart(chartDiv);
        linearChart.draw(data1, linearOptions);
        button.innerText = 'Change to Predator';
        button.onclick = drawMirrorLogChart;
      }

      function drawMirrorLogChart() {
        var mirrorLogChart = new google.visualization.LineChart(chartDiv);
        mirrorLogChart.draw(data1, mirrorLogOptions);
        button.innerText = 'Change to Prey';
        button.onclick = drawLinearChart;
      }

      drawMirrorLogChart();
    }