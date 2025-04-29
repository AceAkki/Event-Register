document.addEventListener("DOMContentLoaded", () => {
    
  (async function() {
    const data = {
      labels: [
        'Industry Professionals',
        'Academic Community',
        'Entrepreneurs & Innovators'
      ],
      datasets: [{
        data: [45, 30, 25],
        backgroundColor: [
          '#474e93',
          '#7e5cad',
          '#a294f9'
        ],
        hoverOffset: 4
      }]
    };
  
    new Chart(
      document.getElementById('who-chart'),
      {
        type: 'pie',
        data: data,
      }
    );
  })();
})