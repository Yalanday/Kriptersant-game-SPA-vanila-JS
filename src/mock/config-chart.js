export const configChart = {
  type: 'line',
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7],
    datasets: [{
      data: [500, 114, 106, 3500, 107, 111, 2000],
      label: "ДурКоин",
      borderColor: "#3e95cd",
      fill: false
    },
      {
      data: [282, 350, 411, 502, 635, 809, 947],
      label: "БыкКоин",
      borderColor: "#8e5ea2",
      fill: false
    }, {
      data: [168, 170, 178, 190, 203, 276, 408],
      label: "Грязная бумажка",
      borderColor: "#3cba9f",
      fill: false
    }, {
      data: [40, 20, 10, 16, 24, 38, 74],
      label: "Чёрная жижа",
      borderColor: "white",
      fill: false
    }, {
      data: [6, 3, 2, 2, 7, 26, 82],
      label: "Рыжуха",
      borderColor: "gold",
      fill: false
    }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Курс крыптобумажек за неделю'
    },
    legend: {
      onHover: function (e) {
        e.target.style.cursor = 'pointer';
      }
    },
    hover: {
      onHover: function (e) {
        let point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      }
    }
  }
}
